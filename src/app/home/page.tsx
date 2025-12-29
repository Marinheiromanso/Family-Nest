'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  HomeHeader,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  Badge,
  StatusBadge,
  XPBadge,
  LevelProgress,
  BottomNav,
  Button,
  EmptyState,
  LoadingScreen,
} from '@/components/ui';
import { useAuth, useFamily } from '@/hooks';
import { calculateLevel } from '@/lib/utils';
import { CATEGORIES } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { family, members, pendingMissions } = useFamily();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // Se o usuário está logado mas não tem família, redireciona para criar
    if (!authLoading && user && !family) {
      router.push('/create-nest');
    }
  }, [user, family, authLoading, router]);

  if (authLoading) {
    return <LoadingScreen message="Carregando seu ninho..." />;
  }

  if (!user) {
    return <LoadingScreen message="Redirecionando..." />;
  }

  if (!family) {
    return <LoadingScreen message="Preparando seu ninho..." />;
  }

  const { level, currentXP, nextLevelXP } = calculateLevel(family.xp);
  const energyPercentage = Math.round((currentXP / nextLevelXP) * 100);

  const memberAvatars = members.map((m) => ({
    src: m.photoURL,
    fallback: m.name,
  }));

  return (
    <div className="min-h-screen bg-background-light page-container">
      <HomeHeader familyName={family.name} members={memberAvatars} />

      <main className="px-4 pb-24">
        {/* Nest Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="relative overflow-hidden mb-6" variant="elevated">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
            
            <CardContent className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                {/* Nest visualization */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-green/20 to-primary-lime/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary-green">
                      nest_multi_room
                    </span>
                  </div>
                  {/* Energy indicator */}
                  <div className="absolute -bottom-1 -right-1 bg-surface-light rounded-full px-2 py-0.5 shadow-sm border border-accent-sand">
                    <span className="text-xs font-medium text-primary-lime flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">bolt</span>
                      {energyPercentage}%
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <StatusBadge status={family.status} className="mb-2" />
                  <h2 className="text-xl font-bold text-text-main mb-1">{family.name}</h2>
                  <LevelProgress
                    currentXP={currentXP}
                    maxXP={nextLevelXP}
                    level={level}
                  />
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex items-center justify-between pt-4 border-t border-accent-sand/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-muted">group</span>
                  <span className="text-sm text-text-muted">
                    {members.length} {members.length === 1 ? 'membro' : 'membros'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-attention">pending</span>
                  <span className="text-sm text-text-muted">
                    {pendingMissions.length} {pendingMissions.length === 1 ? 'missão pendente' : 'missões pendentes'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Missions */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-main">Missões do Dia</h2>
            <Link
              href="/missions"
              className="text-sm text-primary-orange font-medium hover:underline flex items-center gap-1"
            >
              Ver todas
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </Link>
          </div>

          {pendingMissions.length === 0 ? (
            <EmptyState
              icon="check_circle"
              title="Tudo em dia!"
              description="Não há missões pendentes. Aproveite o momento de paz no ninho."
              action={
                <Link href="/missions/new">
                  <Button variant="outline" size="sm">
                    <span className="material-symbols-outlined mr-1 text-lg">add</span>
                    Nova Missão
                  </Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {pendingMissions.slice(0, 4).map((mission, index) => {
                const category = CATEGORIES.find((c) => c.id === mission.category);
                const assignedMembers = members.filter((m) =>
                  mission.assignedTo.includes(m.id)
                );

                return (
                  <motion.div
                    key={mission.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <MissionCard
                      mission={mission}
                      category={category}
                      assignedMembers={assignedMembers}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold text-text-main mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionCard
              href="/family"
              icon="diversity_3"
              label="Família"
              color="#8FBAD6"
            />
            <QuickActionCard
              href="/dashboard"
              icon="monitoring"
              label="Dashboard"
              color="#8CB89F"
            />
            <QuickActionCard
              href="/evolution"
              icon="emoji_events"
              label="Evolução"
              color="#E0A458"
            />
            <QuickActionCard
              href="/history"
              icon="history"
              label="Histórico"
              color="#C9B6D1"
            />
          </div>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}

// Mission Card Component
function MissionCard({
  mission,
  category,
  assignedMembers,
}: {
  mission: any;
  category: any;
  assignedMembers: any[];
}) {
  return (
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
            <h3 className="font-medium text-text-main truncate">{mission.title}</h3>
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
            {mission.dueTime && (
              <span className="text-xs text-text-muted flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {mission.dueTime}
              </span>
            )}
          </div>
        </div>

        {/* Complete button */}
        <button className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all duration-200 active:scale-95">
          <span className="material-symbols-outlined">check</span>
        </button>
      </CardContent>
    </Card>
  );
}

// Quick Action Card Component
function QuickActionCard({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: string;
  label: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <Card className="card-hover h-24 flex items-center justify-center">
        <CardContent className="text-center">
          <div
            className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ color }}
            >
              {icon}
            </span>
          </div>
          <span className="text-sm font-medium text-text-main">{label}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
