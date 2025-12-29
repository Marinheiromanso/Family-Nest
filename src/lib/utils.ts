import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}

export function calculateLevel(xp: number): { level: number; currentXP: number; nextLevelXP: number } {
  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentXP = xp % xpPerLevel;
  const nextLevelXP = xpPerLevel;
  
  return { level, currentXP, nextLevelXP };
}

export function getProgressPercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((current / total) * 100, 100);
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  if (days < 7) return `${days} dias atrás`;
  
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getNestStatus(pendingMissions: number): 'calm' | 'busy' | 'urgent' {
  if (pendingMissions === 0) return 'calm';
  if (pendingMissions <= 3) return 'busy';
  return 'urgent';
}

export function getNestStatusText(status: 'calm' | 'busy' | 'urgent'): string {
  const statusMap = {
    calm: 'Ninho Calmo',
    busy: 'Ninho Ativo',
    urgent: 'Ninho Agitado',
  };
  return statusMap[status];
}

export function getNestStatusColor(status: 'calm' | 'busy' | 'urgent'): string {
  const colorMap = {
    calm: 'bg-primary-green',
    busy: 'bg-accent-attention',
    urgent: 'bg-accent-care',
  };
  return colorMap[status];
}

export function getRoleDisplayName(role: string): string {
  const roleMap: Record<string, string> = {
    pai: 'Pai',
    mae: 'Mãe',
    filho: 'Filho',
    filha: 'Filha',
    avo: 'Avó/Avô',
    pet: 'Pet',
    outro: 'Membro',
  };
  return roleMap[role] || 'Membro';
}

export function getRoleBadgeColor(role: string): string {
  const colorMap: Record<string, string> = {
    pai: 'bg-member-blue',
    mae: 'bg-member-purple',
    filho: 'bg-member-green',
    filha: 'bg-member-orange',
    avo: 'bg-accent-sand',
    pet: 'bg-primary-lime',
    outro: 'bg-text-muted',
  };
  return colorMap[role] || 'bg-text-muted';
}
