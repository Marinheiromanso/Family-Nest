'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'gradient';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const variants = {
    primary: 'bg-primary-orange',
    secondary: 'bg-primary-green',
    gradient: 'bg-gradient-to-r from-primary-orange to-primary-lime',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-accent-sand rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-text-muted">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}

interface LevelProgressProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
}

export function LevelProgress({ currentXP, maxXP, level, className }: LevelProgressProps) {
  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-main">Nível {level}</span>
        <span className="text-xs text-text-muted">{currentXP}/{maxXP} XP</span>
      </div>
      <ProgressBar value={currentXP} max={maxXP} variant="gradient" size="md" />
    </div>
  );
}
