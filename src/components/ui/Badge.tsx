'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'xp';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-accent-sand text-text-main',
    success: 'bg-primary-green/20 text-primary-green',
    warning: 'bg-accent-attention/20 text-accent-attention',
    danger: 'bg-accent-care/20 text-accent-care',
    info: 'bg-member-blue/20 text-member-blue',
    xp: 'bg-primary-lime/20 text-primary-lime',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface XPBadgeProps {
  xp: number;
  showIcon?: boolean;
  className?: string;
}

export function XPBadge({ xp, showIcon = true, className }: XPBadgeProps) {
  return (
    <Badge variant="xp" className={cn('gap-1', className)}>
      {showIcon && (
        <span className="material-symbols-outlined text-sm" style={{ fontSize: '14px' }}>
          bolt
        </span>
      )}
      +{xp} XP
    </Badge>
  );
}

interface StatusBadgeProps {
  status: 'calm' | 'busy' | 'urgent';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    calm: {
      label: 'Ninho Calmo',
      icon: 'spa',
      variant: 'success' as const,
    },
    busy: {
      label: 'Ninho Ativo',
      icon: 'bolt',
      variant: 'warning' as const,
    },
    urgent: {
      label: 'Ninho Agitado',
      icon: 'warning',
      variant: 'danger' as const,
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size="md" className={cn('gap-1', className)}>
      <span className="material-symbols-outlined text-sm" style={{ fontSize: '16px' }}>
        {config.icon}
      </span>
      {config.label}
    </Badge>
  );
}
