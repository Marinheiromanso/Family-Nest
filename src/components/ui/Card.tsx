'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
}

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-surface-light shadow-soft dark:bg-surface-dark dark:shadow-none',
    elevated: 'bg-surface-light shadow-card dark:bg-surface-dark dark:shadow-none',
    outlined: 'bg-surface-light border border-input-border dark:bg-surface-dark dark:border-text-muted/20',
  };

  return (
    <div
      className={cn(
        'rounded-4xl p-5 transition-all duration-200',
        variants[variant],
        onClick && 'cursor-pointer hover:shadow-elevated active:scale-[0.99]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-semibold text-text-main dark:text-white', className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
