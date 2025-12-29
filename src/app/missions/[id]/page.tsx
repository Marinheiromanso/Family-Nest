'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Header, Card, CardContent, Button } from '@/components/ui';
import { useFamilyStore } from '@/store';
import { CATEGORIES } from '@/types';

export default function MissionDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const missionId = params.id as string;
  const { missions, members, completeMission } = useFamilyStore();
  
  const mission = missions.find(m => m.id === missionId);
  const assignedMember = mission?.assignedTo?.length ? members.find(m => mission.assignedTo.includes(m.id)) : null;
  const category = mission ? CATEGORIES.find(c => c.id === mission.category) : null;
  
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async (completedById: string) => {
    if (!mission) return;
    
    setIsCompleting(true);
    
    try {
      completeMission(mission.id, completedById);
      router.back();
    } catch (error) {
      console.error('Error completing mission:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  if (!mission) {
    return (
      <div className="min-h-screen bg-background-light">
        <Header title="Detalhes da Missão" showBack />
        <main className="px-4 py-8 text-center">
          <p className="text-text-muted">Missão não encontrada</p>
        </main>
      </div>
    );
  }

  const frequencyLabels: Record<string, string> = {
    once: 'Única',
    daily: 'Diária',
    weekly: 'Semanal',
    monthly: 'Mensal',
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Header 
        title="Detalhes da Missão" 
        showBack 
      />

      <main className="px-4 pb-24 space-y-6">
        {/* Mission Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div 
              className="h-2"
              style={{ backgroundColor: category?.color || '#8CB89F' }}
            />
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{category?.icon}</span>
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                    >
                      {category?.name}
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-text-main">{mission.title}</h1>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-orange">+{mission.xpReward}</p>
                  <p className="text-xs text-text-muted">XP</p>
                </div>
              </div>
              
              {mission.description && (
                <p className="text-sm text-text-muted mb-4">{mission.description}</p>
              )}

              <div className="flex items-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  {frequencyLabels[mission.frequency]}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assigned To */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">Atribuída a</h2>
          <Card>
            <CardContent>
              {assignedMember ? (
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white bg-primary-green"
                  >
                    {assignedMember.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-text-main">{assignedMember.name}</p>
                    <p className="text-sm text-text-muted">{assignedMember.role}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-text-muted">groups</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-main">Qualquer membro</p>
                    <p className="text-sm text-text-muted">Disponível para todos</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission Status */}
        {mission.status === 'completed' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card className="bg-accent-progress/10 border border-accent-progress/20">
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent-progress/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent-progress text-2xl">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-main">Missão Completada!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Complete */}
        {mission.status === 'pending' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-sm font-medium text-text-muted mb-3">Quem completou?</h2>
            <Card>
              <CardContent className="space-y-3">
                {members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleComplete(member.id)}
                    disabled={isCompleting}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-primary-green"
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-text-main">{member.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-primary-green">
                      check_circle
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Fixed Bottom Button for Pending Missions */}
      {mission.status === 'pending' && assignedMember && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light border-t border-gray-100">
          <Button
            className="w-full"
            onClick={() => handleComplete(assignedMember.id)}
            isLoading={isCompleting}
          >
            <span className="material-symbols-outlined mr-2">check</span>
            Marcar como Concluída
          </Button>
        </div>
      )}
    </div>
  );
}
