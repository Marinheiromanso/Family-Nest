'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Family, Member, Mission, Notification } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

interface FamilyState {
  family: Family | null;
  members: Member[];
  missions: Mission[];
  notifications: Notification[];
  setFamily: (family: Family | null) => void;
  setMembers: (members: Member[]) => void;
  addMember: (member: Member) => void;
  updateMember: (id: string, data: Partial<Member>) => void;
  removeMember: (id: string) => void;
  setMissions: (missions: Mission[]) => void;
  addMission: (mission: Mission) => void;
  updateMission: (id: string, data: Partial<Mission>) => void;
  removeMission: (id: string) => void;
  deleteMission: (id: string) => void;
  completeMission: (id: string, completedBy: string) => void;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  reset: () => void;
}

export const useFamilyStore = create<FamilyState>()((set) => ({
  family: null,
  members: [],
  missions: [],
  notifications: [],
  setFamily: (family) => set({ family }),
  setMembers: (members) => set({ members }),
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  updateMember: (id, data) =>
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, ...data } : m)),
    })),
  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    })),
  setMissions: (missions) => set({ missions }),
  addMission: (mission) => set((state) => ({ missions: [mission, ...state.missions] })),
  updateMission: (id, data) =>
    set((state) => ({
      missions: state.missions.map((m) => (m.id === id ? { ...m, ...data } : m)),
    })),
  removeMission: (id) =>
    set((state) => ({
      missions: state.missions.filter((m) => m.id !== id),
    })),
  deleteMission: (id) =>
    set((state) => ({
      missions: state.missions.filter((m) => m.id !== id),
    })),
  completeMission: (id, completedBy) =>
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id
          ? { ...m, status: 'completed' as const, completedBy, completedAt: { toDate: () => new Date() } as any }
          : m
      ),
    })),
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  reset: () =>
    set({
      family: null,
      members: [],
      missions: [],
      notifications: [],
    }),
}));

interface UIState {
  isSidebarOpen: boolean;
  activeTab: string;
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: false,
  activeTab: 'home',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
