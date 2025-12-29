'use client';

import { motion } from 'framer-motion';
import {
  Header,
  Card,
  CardContent,
  Avatar,
  Badge,
  StatusBadge,
  XPBadge,
  LevelProgress,
  BottomNav,
} from '@/components/ui';
import { useFamily } from '@/hooks';
import { calculateLevel, formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { family, members, missions, pendingMissions, completedMissions } = useFamily();

  const { level, currentXP, nextLevelXP } = family ? calculateLevel(family.xp) : { level: 1, currentXP: 0, nextLevelXP: 500 };

  // Calculate weekly activity (mock data for now)
  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const weeklyData = weekDays.map((day, i) => ({
    day,
    value: Math.floor(Math.random() * 100),
    isToday: i === new Date().getDay() - 1,
  }));

  // Recent missions
  const recentMissions = completedMissions.slice(0, 5);

  // Motivational quotes
  const quotes = [
    'Uma família unida conquista qualquer desafio! 🌟',
    'Cada pequena tarefa é um passo para um lar mais feliz! 🏠',
    'Juntos somos mais fortes! 💪',
    'A organização é a chave para a harmonia familiar! 🔑',
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-background-light page-container">
      <Header title="Dashboard" showMenu showNotifications />

      <main className="px-4 pb-24">
        {/* Status Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6 bg-gradient-to-br from-primary-green/10 to-primary-lime/10" variant="elevated">
            <CardContent className="text-center py-6">
              <div className="w-16 h-16 bg-primary-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-primary-green">
                  spa
                </span>
              </div>
              <StatusBadge status={family?.status || 'calm'} className="mb-2" />
              <h2 className="text-xl font-bold text-text-main mb-1">
                {family?.status === 'calm'
                  ? 'Tudo em ordem!'
                  : family?.status === 'busy'
                  ? 'Ninho ativo hoje!'
                  : 'Muitas tarefas pendentes!'}
              </h2>
              <p className="text-sm text-text-muted">
                {pendingMissions.length} missões pendentes • {completedMissions.length} concluídas
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Level Progress */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-orange to-primary-lime rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-white">
                    emoji_events
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-main">Nível da Família</h3>
                  <p className="text-sm text-text-muted">
                    Continue completando missões para evoluir!
                  </p>
                </div>
              </div>
              <LevelProgress currentXP={currentXP} maxXP={nextLevelXP} level={level} />
            </CardContent>
          </Card>
        </motion.section>

        {/* Weekly Activity */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-main">Atividade Semanal</h2>
            <Badge variant="success">+{family?.xp || 0} XP</Badge>
          </div>
          <Card>
            <CardContent>
              <div className="flex items-end justify-between h-32">
                {weeklyData.map((data, index) => (
                  <div key={data.day} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 rounded-t-lg transition-all ${
                        data.isToday
                          ? 'bg-primary-orange'
                          : 'bg-accent-sand'
                      }`}
                      style={{ height: `${Math.max(data.value, 10)}%` }}
                    />
                    <span
                      className={`text-xs ${
                        data.isToday ? 'text-primary-orange font-medium' : 'text-text-muted'
                      }`}
                    >
                      {data.day}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Recent Missions */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold text-text-main mb-4">Missões Recentes</h2>
          <Card>
            <CardContent className="divide-y divide-accent-sand/50">
              {recentMissions.length === 0 ? (
                <p className="text-center text-text-muted py-6">
                  Nenhuma missão concluída ainda
                </p>
              ) : (
                recentMissions.map((mission) => {
                  const completedBy = members.find((m) => m.id === mission.completedBy);
                  return (
                    <div key={mission.id} className="flex items-center gap-3 py-3">
                      <Avatar
                        src={completedBy?.photoURL}
                        fallback={completedBy?.name || '?'}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text-main truncate">{mission.title}</p>
                        <p className="text-xs text-text-muted">
                          por {completedBy?.name || 'Membro'}
                        </p>
                      </div>
                      <XPBadge xp={mission.xpReward} showIcon={false} />
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </motion.section>

        {/* Motivational Quote */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-member-purple/20 to-member-blue/20">
            <CardContent className="text-center py-6">
              <span className="material-symbols-outlined text-3xl text-member-purple mb-2">
                format_quote
              </span>
              <p className="text-text-main font-medium italic">
                &ldquo;{randomQuote}&rdquo;
              </p>
              <p className="text-xs text-text-muted mt-2">Pensamento do Ninho</p>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}
