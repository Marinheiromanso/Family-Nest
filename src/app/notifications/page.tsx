'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Header,
  Card,
  CardContent,
  Chip,
  ChipGroup,
  Badge,
  EmptyState,
} from '@/components/ui';
import { useFamily } from '@/hooks';
import { markNotificationAsRead } from '@/lib/firebase/firestore';
import { formatDate, formatTime } from '@/lib/utils';

type FilterType = 'all' | 'missions' | 'suggestions' | 'alerts';

export default function NotificationsPage() {
  const { family, notifications, unreadNotifications } = useFamily();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'missions') return notification.actionType === 'mission';
    if (filter === 'suggestions') return notification.actionType === 'suggestion';
    if (filter === 'alerts') return notification.type === 'alert';
    return true;
  });

  const handleMarkAsRead = async (notificationId: string) => {
    if (family) {
      await markNotificationAsRead(family.id, notificationId);
    }
  };

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.createdAt?.toDate();
    const dateKey = date ? formatDate(date) : 'Outras';
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(notification);
    return groups;
  }, {} as Record<string, typeof filteredNotifications>);

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Notificações" showBack />

      <main className="px-4 pb-8">
        {/* Stats */}
        {unreadNotifications.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="bg-primary-orange/10 rounded-3xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-orange/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-orange">
                  notifications_active
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-main">
                  {unreadNotifications.length} {unreadNotifications.length === 1 ? 'nova notificação' : 'novas notificações'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

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
              selected={filter === 'missions'}
              onClick={() => setFilter('missions')}
              icon="task_alt"
            >
              Missões
            </Chip>
            <Chip
              selected={filter === 'suggestions'}
              onClick={() => setFilter('suggestions')}
              icon="lightbulb"
            >
              Sugestões
            </Chip>
            <Chip
              selected={filter === 'alerts'}
              onClick={() => setFilter('alerts')}
              icon="warning"
            >
              Avisos
            </Chip>
          </ChipGroup>
        </div>

        {/* Notifications List */}
        <AnimatePresence mode="popLayout">
          {Object.keys(groupedNotifications).length === 0 ? (
            <EmptyState
              icon="notifications_off"
              title="Nenhuma notificação"
              description="Quando houver novidades no ninho, você verá aqui."
            />
          ) : (
            Object.entries(groupedNotifications).map(([dateKey, notifs], groupIndex) => (
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
                  {notifs.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onRead={() => handleMarkAsRead(notification.id)}
                    />
                  ))}
                </div>
              </motion.section>
            ))
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Notification Card Component
function NotificationCard({
  notification,
  onRead,
}: {
  notification: any;
  onRead: () => void;
}) {
  const getIconConfig = () => {
    switch (notification.type) {
      case 'alert':
        return { icon: 'warning', color: 'text-accent-care', bg: 'bg-accent-care/10' };
      case 'suggestion':
        return { icon: 'lightbulb', color: 'text-primary-lime', bg: 'bg-primary-lime/10' };
      case 'completion':
        return { icon: 'check_circle', color: 'text-primary-green', bg: 'bg-primary-green/10' };
      case 'achievement':
        return { icon: 'emoji_events', color: 'text-primary-orange', bg: 'bg-primary-orange/10' };
      default:
        return { icon: 'notifications', color: 'text-member-blue', bg: 'bg-member-blue/10' };
    }
  };

  const config = getIconConfig();
  const time = notification.createdAt?.toDate();

  return (
    <Card
      className={`transition-all ${!notification.read ? 'border-l-4 border-primary-orange' : ''}`}
      onClick={onRead}
    >
      <CardContent className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
          <span className={`material-symbols-outlined ${config.color}`}>
            {notification.icon || config.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-text-main truncate">{notification.title}</h4>
            {!notification.read && (
              <span className="w-2 h-2 bg-primary-orange rounded-full" />
            )}
          </div>
          <p className="text-sm text-text-muted line-clamp-2">{notification.message}</p>
          {time && (
            <p className="text-xs text-text-muted mt-2">{formatTime(time)}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
