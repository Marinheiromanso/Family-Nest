'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Header,
  Card,
  CardContent,
  Input,
  Avatar,
  Badge,
  XPBadge,
  Chip,
  ChipGroup,
  EmptyState,
} from '@/components/ui';
import { useFamily } from '@/hooks';
import { CATEGORIES } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';

export default function HistoryPage() {
  const { missions, members } = useFamily();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const completedMissions = missions.filter((m) => m.status === 'completed');

  const filteredMissions = completedMissions.filter((mission) => {
    const matchesSearch = mission.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || mission.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Group by date
  const groupedMissions = filteredMissions.reduce((groups, mission) => {
    const date = mission.completedAt?.toDate();
    const dateKey = date ? formatDate(date) : 'Outras';
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(mission);
    return groups;
  }, {} as Record<string, typeof filteredMissions>);

  // Calculate monthly stats
  const thisMonth = new Date();
  thisMonth.setDate(1);
  const monthlyMissions = completedMissions.filter((m) => {
    const completedAt = m.completedAt?.toDate();
    return completedAt && completedAt >= thisMonth;
  });
  const monthlyXP = monthlyMissions.reduce((sum, m) => sum + m.xpReward, 0);

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Histórico" showBack />

      <main className="px-4 pb-8">
        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Input
            placeholder="Buscar missões..."
            leftIcon="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6 overflow-x-auto hide-scrollbar -mx-4 px-4"
        >
          <div className="flex gap-2 w-max">
            <Chip
              selected={categoryFilter === null}
              onClick={() => setCategoryFilter(null)}
            >
              Todos
            </Chip>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <Chip
                key={cat.id}
                selected={categoryFilter === cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                icon={cat.icon}
              >
                {cat.name}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* Mission List */}
        <AnimatePresence mode="popLayout">
          {Object.keys(groupedMissions).length === 0 ? (
            <EmptyState
              icon="history"
              title="Nenhuma missão concluída"
              description={search ? 'Nenhuma missão encontrada com esse termo.' : 'Complete missões para ver o histórico aqui.'}
            />
          ) : (
            Object.entries(groupedMissions).map(([dateKey, missionList], groupIndex) => (
              <motion.section
                key={dateKey}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
                className="mb-6"
              >
                <h3 className="text-sm font-medium text-text-muted mb-3 px-1">
                  {dateKey.toUpperCase()}
                </h3>
                <div className="space-y-3">
                  {missionList.map((mission) => {
                    const category = CATEGORIES.find((c) => c.id === mission.category);
                    const completedBy = members.find((m) => m.id === mission.completedBy);
                    const completedAt = mission.completedAt?.toDate();

                    return (
                      <Card key={mission.id} className="card-hover">
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
                              {category?.icon || 'check_circle'}
                            </span>
                          </div>

                          {/* Mission info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-text-main truncate">
                                {mission.title}
                              </h4>
                              <XPBadge xp={mission.xpReward} showIcon={false} />
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar
                                src={completedBy?.photoURL}
                                fallback={completedBy?.name || '?'}
                                size="xs"
                              />
                              <span className="text-xs text-text-muted">
                                {completedBy?.name || 'Membro'}
                              </span>
                              {completedAt && (
                                <>
                                  <span className="text-xs text-text-muted">•</span>
                                  <span className="text-xs text-text-muted">
                                    {formatTime(completedAt)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Assignment badge */}
                          {mission.assignmentType === 'shared' && (
                            <Badge variant="info" size="sm">
                              Cooperativa
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.section>
            ))
          )}
        </AnimatePresence>

        {/* Monthly Summary */}
        {completedMissions.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-primary-green/10 to-primary-lime/10">
              <CardContent className="text-center py-6">
                <h3 className="text-sm font-medium text-text-muted mb-4">
                  RESUMO DO MÊS
                </h3>
                <div className="flex justify-center gap-8">
                  <div>
                    <p className="text-3xl font-bold text-primary-green">
                      {monthlyMissions.length}
                    </p>
                    <p className="text-xs text-text-muted">Missões</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary-lime">
                      {monthlyXP}
                    </p>
                    <p className="text-xs text-text-muted">XP Ganhos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
