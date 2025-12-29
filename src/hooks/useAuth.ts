'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { useAuthStore, useFamilyStore } from '@/store';
import { getFamily, getMembers, getMissions, getNotifications } from '@/lib/firebase/firestore';
import type { User } from '@/types';

export function useAuth() {
  const { user, isLoading, setUser, setLoading } = useAuthStore();
  const { setFamily, setMembers, setMissions, setNotifications, reset } = useFamilyStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);

          // Load family data if user has a family
          if (userData.familyId) {
            const { data: familyData } = await getFamily(userData.familyId);
            if (familyData) {
              setFamily(familyData);

              // Load members, missions, and notifications
              const [membersResult, missionsResult, notificationsResult] = await Promise.all([
                getMembers(userData.familyId),
                getMissions(userData.familyId),
                getNotifications(userData.familyId),
              ]);

              setMembers(membersResult.data);
              setMissions(missionsResult.data);
              setNotifications(notificationsResult.data);
            }
          }
        } else {
          // User exists in Auth but not in Firestore
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL,
          } as User);
        }
      } else {
        setUser(null);
        reset();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setFamily, setMembers, setMissions, setNotifications, reset]);

  return { user, isLoading };
}

export function useFamily() {
  const { family, members, missions, notifications } = useFamilyStore();

  const pendingMissions = missions.filter((m) => m.status === 'pending');
  const completedMissions = missions.filter((m) => m.status === 'completed');
  const unreadNotifications = notifications.filter((n) => !n.read);

  return {
    family,
    members,
    missions,
    notifications,
    pendingMissions,
    completedMissions,
    unreadNotifications,
  };
}

export function useMember(memberId: string) {
  const { members, missions } = useFamilyStore();

  const member = members.find((m) => m.id === memberId);
  const memberMissions = missions.filter((m) => m.assignedTo.includes(memberId));
  const completedMissions = memberMissions.filter((m) => m.status === 'completed');

  return {
    member,
    missions: memberMissions,
    completedMissions,
    completedCount: completedMissions.length,
  };
}
