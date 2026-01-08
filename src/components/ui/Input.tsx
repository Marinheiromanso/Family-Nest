'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, onRightIconClick, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-main dark:text-white mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full h-14 bg-input-bg border border-input-border rounded-full',
              'text-text-main placeholder:text-text-muted',
              'dark:bg-surface-dark dark:border-text-muted/20 dark:text-white dark:placeholder-text-muted',
              'focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent',
              'transition-all duration-200',
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              !leftIcon && 'pl-5',
              !rightIcon && 'pr-5',
              error && 'border-accent-care focus:ring-accent-care',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted hover:text-text-main transition-colors"
            >
              {rightIcon}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-accent-care">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
