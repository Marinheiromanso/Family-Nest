'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore, useFamilyStore } from '@/store';

interface NavItem {
  href: string;
  icon: string;
  label: string;
  tab: string;
}

const navItems: NavItem[] = [
  { href: '/home', icon: 'nest_multi_room', label: 'Ninho', tab: 'home' },
  { href: '/missions', icon: 'task_alt', label: 'Missões', tab: 'missions' },
  { href: '/family', icon: 'diversity_3', label: 'Família', tab: 'family' },
  { href: '/settings', icon: 'settings', label: 'Ajustes', tab: 'settings' },
];

export function BottomNav() {
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-light/80 backdrop-blur-xl border-t border-accent-sand/50 rounded-t-4xl safe-area-bottom z-50">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.slice(0, 2).map((item) => (
          <NavLink key={item.href} item={item} isActive={pathname === item.href} />
        ))}
        
        {/* FAB Button */}
        <Link
          href="/missions/new"
          className="relative -mt-8 w-14 h-14 bg-primary-orange rounded-full flex items-center justify-center shadow-button text-white hover:bg-primary-orange-dark active:scale-95 transition-all duration-200 ring-4 ring-surface-light"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </Link>

        {navItems.slice(2).map((item) => (
          <NavLink key={item.href} item={item} isActive={pathname === item.href} />
        ))}
      </div>
    </nav>
  );
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200',
        isActive ? 'text-primary-orange' : 'text-text-muted hover:text-text-main'
      )}
    >
      <span
        className={cn(
          'material-symbols-outlined text-2xl transition-all duration-200',
          isActive && 'scale-110'
        )}
        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
      >
        {item.icon}
      </span>
      <span className="text-xs font-medium">{item.label}</span>
      {isActive && (
        <span className="absolute bottom-1 w-1 h-1 bg-primary-orange rounded-full" />
      )}
    </Link>
  );
}
