'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarGroup } from './Avatar';
import { useFamilyStore } from '@/store';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'transparent';
}

export function Header({
  title,
  showBack = false,
  showNotifications = false,
  showMenu = false,
  rightAction,
  className,
  variant = 'default',
}: HeaderProps) {
  const router = useRouter();
  const { notifications, family, members } = useFamilyStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 px-4 py-3 safe-area-top',
        variant === 'default' && 'bg-background-light/80 backdrop-blur-xl',
        variant === 'transparent' && 'bg-transparent',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-main hover:bg-accent-sand transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          {showMenu && (
            <button className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-main hover:bg-accent-sand transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}
          {title && (
            <h1 className="text-xl font-semibold text-text-main">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          {rightAction}
          {showNotifications && (
            <Link
              href="/notifications"
              className="relative w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-main hover:bg-accent-sand transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-care text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-soft">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

interface HomeHeaderProps {
  familyName: string;
  members: Array<{ src?: string | null; fallback?: string }>;
}

export function HomeHeader({ familyName, members }: HomeHeaderProps) {
  const { notifications } = useFamilyStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 px-4 py-3 bg-background-light/80 backdrop-blur-xl safe-area-top">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-green">
              nest_multi_room
            </span>
          </div>
          <div>
            <p className="text-xs text-text-muted">Bem-vindo ao</p>
            <h1 className="text-lg font-semibold text-text-main">{familyName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AvatarGroup avatars={members} max={3} size="sm" />
          <Link
            href="/notifications"
            className="relative w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-main hover:bg-accent-sand transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-care text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-soft">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
