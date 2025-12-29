import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from './config';
import type { Family, Member, Mission, Notification } from '@/types';

// ==================== FAMILY/NEST OPERATIONS ====================

// Gera um código de convite único de 6 caracteres
function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sem I, O, 0, 1 para evitar confusão
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createFamily(data: Partial<Family>, userId: string) {
  try {
    const inviteCode = generateInviteCode();
    
    const familyRef = await addDoc(collection(db, 'families'), {
      ...data,
      ownerId: userId,
      memberIds: [userId],
      inviteCode,
      level: 1,
      xp: 0,
      status: 'calm',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Update user with family reference
    await updateDoc(doc(db, 'users', userId), {
      familyId: familyRef.id,
      updatedAt: serverTimestamp(),
    });

    return { id: familyRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getFamily(familyId: string) {
  try {
    const familyDoc = await getDoc(doc(db, 'families', familyId));
    if (familyDoc.exists()) {
      const familyData = { id: familyDoc.id, ...familyDoc.data() } as Family;
      
      // Se a família não tem código de convite, gera um
      if (!familyData.inviteCode) {
        const inviteCode = generateInviteCode();
        await updateDoc(doc(db, 'families', familyId), {
          inviteCode,
          updatedAt: serverTimestamp(),
        });
        familyData.inviteCode = inviteCode;
      }
      
      return { data: familyData, error: null };
    }
    return { data: null, error: 'Family not found' };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function updateFamily(familyId: string, data: Partial<Family>) {
  try {
    await updateDoc(doc(db, 'families', familyId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function addFamilyXP(familyId: string, xpAmount: number) {
  try {
    const familyDoc = await getDoc(doc(db, 'families', familyId));
    if (!familyDoc.exists()) throw new Error('Family not found');

    const currentXP = familyDoc.data().xp || 0;
    const currentLevel = familyDoc.data().level || 1;
    const newXP = currentXP + xpAmount;

    // Level up logic (500 XP per level)
    const xpPerLevel = 500;
    const newLevel = Math.floor(newXP / xpPerLevel) + 1;

    await updateDoc(doc(db, 'families', familyId), {
      xp: newXP,
      level: newLevel,
      updatedAt: serverTimestamp(),
    });

    return { newXP, newLevel, leveledUp: newLevel > currentLevel, error: null };
  } catch (error: any) {
    return { newXP: 0, newLevel: 0, leveledUp: false, error: error.message };
  }
}

// ==================== MEMBER OPERATIONS ====================

export async function addMember(familyId: string, data: Partial<Member>) {
  try {
    const memberRef = await addDoc(collection(db, 'families', familyId, 'members'), {
      ...data,
      familyId,
      level: 1,
      xp: 0,
      completedMissions: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: memberRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getMembers(familyId: string) {
  try {
    const membersQuery = query(
      collection(db, 'families', familyId, 'members'),
      orderBy('createdAt', 'asc')
    );
    const snapshot = await getDocs(membersQuery);
    const members = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Member[];
    return { data: members, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
}

export async function updateMember(familyId: string, memberId: string, data: Partial<Member>) {
  try {
    await updateDoc(doc(db, 'families', familyId, 'members', memberId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteMember(familyId: string, memberId: string) {
  try {
    await deleteDoc(doc(db, 'families', familyId, 'members', memberId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function addMemberXP(familyId: string, memberId: string, xpAmount: number) {
  try {
    const memberDoc = await getDoc(doc(db, 'families', familyId, 'members', memberId));
    if (!memberDoc.exists()) {
      // Se o membro não existe, apenas retorna sem erro
      return { newXP: 0, error: null };
    }

    const currentXP = memberDoc.data().xp || 0;
    const currentCompletedMissions = memberDoc.data().completedMissions || 0;
    const newXP = currentXP + xpAmount;

    await updateDoc(doc(db, 'families', familyId, 'members', memberId), {
      xp: newXP,
      completedMissions: currentCompletedMissions + 1,
      updatedAt: serverTimestamp(),
    });

    return { newXP, error: null };
  } catch (error: any) {
    return { newXP: 0, error: error.message };
  }
}

// ==================== MISSION OPERATIONS ====================

export async function createMission(familyId: string, data: Partial<Mission>) {
  try {
    const missionRef = await addDoc(collection(db, 'families', familyId, 'missions'), {
      ...data,
      familyId,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: missionRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getMissions(familyId: string, status?: string) {
  try {
    let missionsQuery;
    if (status) {
      missionsQuery = query(
        collection(db, 'families', familyId, 'missions'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      missionsQuery = query(
        collection(db, 'families', familyId, 'missions'),
        orderBy('createdAt', 'desc')
      );
    }
    const snapshot = await getDocs(missionsQuery);
    const missions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Mission[];
    return { data: missions, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
}

export async function getTodayMissions(familyId: string) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const missionsQuery = query(
      collection(db, 'families', familyId, 'missions'),
      where('dueDate', '>=', Timestamp.fromDate(today)),
      where('dueDate', '<', Timestamp.fromDate(tomorrow)),
      orderBy('dueDate', 'asc')
    );
    const snapshot = await getDocs(missionsQuery);
    const missions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Mission[];
    return { data: missions, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
}

export async function completeMission(familyId: string, missionId: string, completedBy: string) {
  try {
    const missionDoc = await getDoc(doc(db, 'families', familyId, 'missions', missionId));
    if (!missionDoc.exists()) throw new Error('Mission not found');

    const xpReward = missionDoc.data().xpReward || 50;

    await updateDoc(doc(db, 'families', familyId, 'missions', missionId), {
      status: 'completed',
      completedAt: serverTimestamp(),
      completedBy,
      updatedAt: serverTimestamp(),
    });

    // Add XP to family
    await addFamilyXP(familyId, xpReward);

    return { xpReward, error: null };
  } catch (error: any) {
    return { xpReward: 0, error: error.message };
  }
}

export async function updateMission(familyId: string, missionId: string, data: Partial<Mission>) {
  try {
    await updateDoc(doc(db, 'families', familyId, 'missions', missionId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteMission(familyId: string, missionId: string) {
  try {
    await deleteDoc(doc(db, 'families', familyId, 'missions', missionId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// ==================== NOTIFICATION OPERATIONS ====================

export async function createNotification(familyId: string, data: Partial<Notification>) {
  try {
    const notificationRef = await addDoc(collection(db, 'families', familyId, 'notifications'), {
      ...data,
      familyId,
      read: false,
      createdAt: serverTimestamp(),
    });
    return { id: notificationRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function getNotifications(familyId: string, limitCount: number = 20) {
  try {
    const notificationsQuery = query(
      collection(db, 'families', familyId, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(notificationsQuery);
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notification[];
    return { data: notifications, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
}

export async function markNotificationAsRead(familyId: string, notificationId: string) {
  try {
    await updateDoc(doc(db, 'families', familyId, 'notifications', notificationId), {
      read: true,
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}
