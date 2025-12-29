'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <span
        className={cn(
          'material-symbols-outlined animate-spin text-primary-orange',
          sizes[size]
        )}
      >
        progress_activity
      </span>
    </div>
  );
}

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Carregando...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-background-light flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center animate-pulse">
        <span className="material-symbols-outlined text-4xl text-primary-green">
          nest_multi_room
        </span>
      </div>
      <LoadingSpinner size="md" />
      <p className="text-text-muted text-sm">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}>
      <div className="w-20 h-20 rounded-full bg-accent-sand flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-4xl text-text-muted">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-text-main mb-2">{title}</h3>
      {description && (
        <p className="text-text-muted text-sm mb-4 max-w-xs">{description}</p>
      )}
      {action}
    </div>
  );
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export function Toast({ message, type = 'info', isVisible }: ToastProps) {
  const typeConfig = {
    success: {
      icon: 'check_circle',
      bg: 'bg-primary-green',
    },
    error: {
      icon: 'error',
      bg: 'bg-accent-care',
    },
    info: {
      icon: 'info',
      bg: 'bg-member-blue',
    },
  };

  const config = typeConfig[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-4 right-4 z-50"
        >
          <div className={cn('flex items-center gap-3 px-4 py-3 rounded-2xl text-white', config.bg)}>
            <span className="material-symbols-outlined">{config.icon}</span>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
