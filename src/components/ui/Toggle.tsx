'use client';

import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, disabled = false, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2',
        checked ? 'bg-primary-orange' : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked && 'translate-x-5'
        )}
      />
    </button>
  );
}

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: string;
  className?: string;
}

export function Chip({ children, selected = false, onClick, icon, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 h-10 px-4 rounded-full font-medium text-sm transition-all duration-200',
        selected
          ? 'bg-primary-orange text-white'
          : 'bg-surface-light text-text-main border border-input-border hover:bg-accent-sand',
        className
      )}
    >
      {icon && (
        <span className="material-symbols-outlined text-lg">{icon}</span>
      )}
      {children}
    </button>
  );
}

interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ChipGroup({ children, className }: ChipGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {children}
    </div>
  );
}
