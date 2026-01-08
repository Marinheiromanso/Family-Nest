'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import {
  Header,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  Badge,
  XPBadge,
  BottomNav,
  Button,
  Chip,
  ChipGroup,
  EmptyState,
} from '@/components/ui';
import { useAuth, useFamily } from '@/hooks';
import { useFamilyStore } from '@/store';
import { updateMission, addFamilyXP, addMemberXP } from '@/lib/firebase/firestore';
import { CATEGORIES } from '@/types';

type FilterType = 'pending' | 'completed' | 'bills';

export default function MissionsPage() {
  const { user } = useAuth();
  const { family, missions, members } = useFamily();
  const { updateMission: updateMissionLocal } = useFamilyStore();
  const [filter, setFilter] = useState<FilterType>('pending');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const handleQuickComplete = async (e: React.MouseEvent, missionId: string, xpReward: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!family || !user) {
      console.error('family or user is null', { family, user });
      return;
    }
    
    setCompletingId(missionId);
    
    try {
      // Update mission in Firebase
      await updateMission(family.id, missionId, {
        status: 'completed',
        completedBy: user.uid,
        completedAt: Timestamp.now(),
      });

      // Add XP to family
      await addFamilyXP(family.id, xpReward);

      // Update local state
      updateMissionLocal(missionId, {
        status: 'completed',
        completedBy: user.uid,
      });
      
      // Wait a moment to show completion animation then filter will hide it
      setTimeout(() => {
        setCompletingId(null);
      }, 500);
    } catch (error) {
      console.error('Error completing mission:', error);
      setCompletingId(null);
    }
  };

  const filteredMissions = missions.filter((mission) => {
    // Filter by type
    if (filter === 'pending' && mission.status !== 'pending') return false;
    if (filter === 'completed' && mission.status !== 'completed') return false;
    if (filter === 'bills') {
      // Show only bills (contas) category, regardless of status
      if (mission.category !== 'contas') return false;
    }
    // Apply category filter (except when in bills mode)
    if (filter !== 'bills' && categoryFilter && mission.category !== categoryFilter) return false;
    return true;
  });

  const pendingCount = missions.filter((m) => m.status === 'pending').length;
  const completedCount = missions.filter((m) => m.status === 'completed').length;
  const billsCount = missions.filter((m) => m.category === 'contas').length;

  return (
    <div className="min-h-screen bg-background-light page-container">
      <Header title="Missões" showNotifications />

      <main className="px-4 pb-24">
        {/* Main Filter Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setFilter('pending')}
            className={`rounded-3xl p-4 text-center transition-all ${
              filter === 'pending'
                ? 'bg-accent-attention text-white shadow-lg'
                : 'bg-accent-attention/10 text-accent-attention hover:bg-accent-attention/20'
            }`}
          >
            <span className="text-2xl font-bold block">{pendingCount}</span>
            <p className="text-xs mt-1">Pendentes</p>
          </button>
          
          <button
            onClick={() => setFilter('completed')}
            className={`rounded-3xl p-4 text-center transition-all ${
              filter === 'completed'
                ? 'bg-primary-green text-white shadow-lg'
                : 'bg-primary-green/10 text-primary-green hover:bg-primary-green/20'
            }`}
          >
            <span className="text-2xl font-bold block">{completedCount}</span>
            <p className="text-xs mt-1">Concluídas</p>
          </button>
          
          <button
            onClick={() => setFilter('bills')}
            className={`rounded-3xl p-4 text-center transition-all ${
              filter === 'bills'
                ? 'bg-primary-orange text-white shadow-lg'
                : 'bg-primary-orange/10 text-primary-orange hover:bg-primary-orange/20'
            }`}
          >
            <span className="material-symbols-outlined text-2xl block">receipt_long</span>
            <p className="text-xs mt-1">Contas</p>
          </button>
        </div>

        {/* Category filter - Only show when not in bills mode */}
        {filter !== 'bills' && (
          <div className="mb-6 overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-2 w-max">
              <button
                onClick={() => setCategoryFilter(null)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === null
                    ? 'bg-text-main text-white'
                    : 'bg-surface-light text-text-muted'
                }`}
              >
                Todas
              </button>
              {CATEGORIES.filter(cat => cat.id !== 'contas').map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  categoryFilter === cat.id
                    ? 'text-white'
                    : 'bg-surface-light text-text-muted'
                }`}
                style={{
                  backgroundColor: categoryFilter === cat.id ? cat.color : undefined,
                }}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
            </div>
          </div>
        )}

        {/* Mission List */}
        <AnimatePresence mode="popLayout">
          {filteredMissions.length === 0 ? (
            <EmptyState
              icon="inbox"
              title="Nenhuma missão encontrada"
              description="Crie uma nova missão para começar a organizar as tarefas da família."
              action={
                <Link href="/missions/new">
                  <Button size="sm">
                    <span className="material-symbols-outlined mr-1 text-lg">add</span>
                    Nova Missão
                  </Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {filteredMissions.map((mission, index) => {
                const category = CATEGORIES.find((c) => c.id === mission.category);
                const assignedMembers = members.filter((m) =>
                  mission.assignedTo.includes(m.id)
                );

                return (
                  <motion.div
                    key={mission.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link href={`/missions/${mission.id}`}>
                      <Card className="card-hover">
                        <CardContent className="flex items-center gap-4">
                          {/* Category icon */}
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${category?.color || '#8CB89F'}20` }}
                          >
                            <span
                              className="material-symbols-outlined text-2xl"
                              style={{ color: category?.color || '#8CB89F' }}
                            >
                              {category?.icon || 'task_alt'}
                            </span>
                          </div>

                          {/* Mission info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`font-medium truncate ${
                                  mission.status === 'completed'
                                    ? 'text-text-muted line-through'
                                    : 'text-text-main'
                                }`}
                              >
                                {mission.title}
                              </h3>
                              <XPBadge xp={mission.xpReward} showIcon={false} />
                            </div>
                            <div className="flex items-center gap-2">
                              {assignedMembers.length > 0 ? (
                                <AvatarGroup
                                  avatars={assignedMembers.map((m) => ({
                                    src: m.photoURL,
                                    fallback: m.name,
                                  }))}
                                  max={2}
                                  size="xs"
                                />
                              ) : (
                                <Badge variant="info">Aberta</Badge>
                              )}
                              {mission.frequency !== 'once' && (
                                <Badge variant="default">
                                  {mission.frequency === 'daily'
                                    ? 'Diária'
                                    : mission.frequency === 'weekly'
                                    ? 'Semanal'
                                    : 'Mensal'}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Status indicator / Complete button */}
                          {mission.status === 'completed' ? (
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-green text-white">
                              <span className="material-symbols-outlined">check</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleQuickComplete(e, mission.id, mission.xpReward)}
                              disabled={completingId === mission.id}
                              className="w-10 h-10 rounded-full flex items-center justify-center bg-accent-sand text-text-muted hover:bg-primary-green hover:text-white transition-colors disabled:opacity-50"
                              title="Marcar como concluída"
                            >
                              <span className="material-symbols-outlined">
                                {completingId === mission.id ? 'progress_activity' : 'check'}
                              </span>
                            </button>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <Link 
        href={filter === 'bills' ? '/missions/new?category=contas' : '/missions/new'}
        className="fixed right-4 bottom-24 z-10"
      >
        <button className="w-14 h-14 bg-primary-orange text-white rounded-full shadow-button flex items-center justify-center hover:bg-primary-orange-dark transition-colors">
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      </Link>

      <BottomNav />
    </div>
  );
}
