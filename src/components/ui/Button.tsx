'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-primary-orange text-white
        hover:bg-primary-orange-dark
        focus:ring-primary-orange
        shadow-button
      `,
      secondary: `
        bg-primary-green text-white
        hover:bg-primary-green/90
        focus:ring-primary-green
        shadow-button-green
      `,
      outline: `
        border-2 border-primary-orange text-primary-orange
        hover:bg-primary-orange hover:text-white
        focus:ring-primary-orange
      `,
      ghost: `
        text-text-main
        hover:bg-accent-sand
        focus:ring-accent-sand
      `,
      danger: `
        bg-accent-care text-white
        hover:bg-accent-care/90
        focus:ring-accent-care
      `,
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-full',
      md: 'h-12 px-6 text-base rounded-full',
      lg: 'h-14 px-8 text-lg rounded-full',
      icon: 'h-12 w-12 rounded-full',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
