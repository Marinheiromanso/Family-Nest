'use client';

import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  filled?: boolean;
  className?: string;
}

export function Icon({ name, size = 'md', filled = false, className }: IconProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <span
      className={cn('material-symbols-outlined', sizes[size], className)}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  );
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  filled?: boolean;
}

export function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  filled = false,
  className,
  ...props
}: IconButtonProps) {
  const variants = {
    default: 'bg-surface-light text-text-main hover:bg-accent-sand',
    primary: 'bg-primary-orange text-white hover:bg-primary-orange-dark',
    ghost: 'bg-transparent text-text-main hover:bg-accent-sand/50',
  };

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <button
      className={cn(
        'rounded-full flex items-center justify-center transition-all duration-200 active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span
        className={cn('material-symbols-outlined', iconSizes[size])}
        style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
      >
        {icon}
      </span>
    </button>
  );
}

interface CategoryIconProps {
  icon: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CategoryIcon({ icon, color = '#8CB89F', size = 'md', className }: CategoryIconProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  };

  return (
    <div
      className={cn(
        'rounded-2xl flex items-center justify-center',
        sizes[size],
        className
      )}
      style={{ backgroundColor: `${color}20` }}
    >
      <span
        className="material-symbols-outlined"
        style={{ color }}
      >
        {icon}
      </span>
    </div>
  );
}
