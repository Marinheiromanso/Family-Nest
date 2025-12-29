'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useFamily } from '@/hooks';
import { CATEGORIES } from '@/types';

type FilterType = 'all' | 'pending' | 'completed';

export default function MissionsPage() {
  const { missions, members } = useFamily();
  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredMissions = missions.filter((mission) => {
    if (filter === 'pending' && mission.status !== 'pending') return false;
    if (filter === 'completed' && mission.status !== 'completed') return false;
    if (categoryFilter && mission.category !== categoryFilter) return false;
    return true;
  });

  const pendingCount = missions.filter((m) => m.status === 'pending').length;
  const completedCount = missions.filter((m) => m.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background-light page-container">
      <Header title="Missões" showMenu showNotifications />

      <main className="px-4 pb-24">
        {/* Stats */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-accent-attention/10 rounded-3xl p-4 text-center">
            <span className="text-2xl font-bold text-accent-attention">{pendingCount}</span>
            <p className="text-xs text-text-muted mt-1">Pendentes</p>
          </div>
          <div className="flex-1 bg-primary-green/10 rounded-3xl p-4 text-center">
            <span className="text-2xl font-bold text-primary-green">{completedCount}</span>
            <p className="text-xs text-text-muted mt-1">Concluídas</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ChipGroup>
            <Chip
              selected={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              Todas
            </Chip>
            <Chip
              selected={filter === 'pending'}
              onClick={() => setFilter('pending')}
              icon="pending"
            >
              Pendentes
            </Chip>
            <Chip
              selected={filter === 'completed'}
              onClick={() => setFilter('completed')}
              icon="check_circle"
            >
              Concluídas
            </Chip>
          </ChipGroup>
        </div>

        {/* Category filter */}
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
            {CATEGORIES.map((cat) => (
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

                          {/* Status indicator */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              mission.status === 'completed'
                                ? 'bg-primary-green text-white'
                                : 'bg-accent-sand text-text-muted'
                            }`}
                          >
                            <span className="material-symbols-outlined">
                              {mission.status === 'completed' ? 'check' : 'chevron_right'}
                            </span>
                          </div>
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

      <BottomNav />
    </div>
  );
}
