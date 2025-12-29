import { Timestamp } from 'firebase/firestore';

// User type
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  familyId?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Family/Nest type
export interface Family {
  id: string;
  name: string;
  ownerId: string;
  memberIds: string[];
  photoURL?: string | null;
  inviteCode: string; // Código único de convite para a família
  level: number;
  xp: number;
  status: 'calm' | 'busy' | 'urgent';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Member type
export interface Member {
  id: string;
  familyId: string;
  userId?: string; // If linked to a user account
  name: string;
  role: MemberRole;
  avatar: string; // Avatar identifier or URL
  photoURL?: string | null;
  color?: string; // Profile color
  level: number;
  xp: number;
  xpContributed?: number; // Total XP contributed to family
  completedMissions: number;
  missionsCompleted?: number; // Alias for completedMissions
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type MemberRole = 'pai' | 'mae' | 'filho' | 'filha' | 'avo' | 'pet' | 'outro';

// Mission/Task type
export interface Mission {
  id: string;
  familyId: string;
  title: string;
  description?: string;
  category: MissionCategory;
  icon: string;
  xpReward: number;
  frequency: MissionFrequency;
  assignedTo: string[]; // Member IDs
  assignmentType: 'specific' | 'shared' | 'open';
  status: MissionStatus;
  dueDate?: Timestamp;
  dueTime?: string;
  completedAt?: Timestamp;
  completedBy?: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type MissionCategory = 
  | 'limpeza'
  | 'culinaria'
  | 'jardim'
  | 'pets'
  | 'organizacao'
  | 'compras'
  | 'manutencao'
  | 'cuidados'
  | 'outros';

export type MissionFrequency = 'once' | 'daily' | 'weekly' | 'monthly';

export type MissionStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

// Notification type
export interface Notification {
  id: string;
  familyId: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: string;
  actionType?: 'mission' | 'suggestion' | 'achievement' | 'reminder';
  actionId?: string;
  read: boolean;
  createdAt: Timestamp;
}

export type NotificationType = 'alert' | 'suggestion' | 'completion' | 'reminder' | 'achievement';

// Achievement type
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: Timestamp;
}

// Nest Evolution Stage type
export interface NestStage {
  level: number;
  name: string;
  description: string;
  image: string;
  requiredXP: number;
  rewards: string[];
}

// Category with icon mapping
export interface CategoryInfo {
  id: MissionCategory;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'limpeza', name: 'Limpeza', icon: 'local_laundry_service', color: '#8CB89F' },
  { id: 'culinaria', name: 'Culinária', icon: 'skillet', color: '#E0A458' },
  { id: 'jardim', name: 'Jardim', icon: 'potted_plant', color: '#80e619' },
  { id: 'pets', name: 'Pets', icon: 'pets', color: '#E8CC9F' },
  { id: 'organizacao', name: 'Organização', icon: 'inventory_2', color: '#8FBAD6' },
  { id: 'compras', name: 'Compras', icon: 'shopping_cart', color: '#C9B6D1' },
  { id: 'manutencao', name: 'Manutenção', icon: 'handyman', color: '#9a6c4c' },
  { id: 'cuidados', name: 'Cuidados', icon: 'favorite', color: '#EA7A7A' },
  { id: 'outros', name: 'Outros', icon: 'more_horiz', color: '#948D83' },
];

// Avatar options
export interface AvatarOption {
  id: string;
  name: string;
  image: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'bird-blue', name: 'Pássaro Azul', image: '/avatars/bird-blue.png' },
  { id: 'bird-yellow', name: 'Pássaro Amarelo', image: '/avatars/bird-yellow.png' },
  { id: 'owl', name: 'Coruja', image: '/avatars/owl.png' },
  { id: 'egg', name: 'Ovinho', image: '/avatars/egg.png' },
  { id: 'chick', name: 'Pintinho', image: '/avatars/chick.png' },
  { id: 'parrot', name: 'Papagaio', image: '/avatars/parrot.png' },
];

// Role options
export interface RoleOption {
  value: MemberRole;
  label: string;
  icon: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
  { value: 'pai', label: 'Pai', icon: '👨' },
  { value: 'mae', label: 'Mãe', icon: '👩' },
  { value: 'filho', label: 'Filho', icon: '👦' },
  { value: 'filha', label: 'Filha', icon: '👧' },
  { value: 'avo', label: 'Avó/Avô', icon: '🧓' },
  { value: 'pet', label: 'Pet', icon: '🐕' },
  { value: 'outro', label: 'Outro', icon: '👤' },
];
