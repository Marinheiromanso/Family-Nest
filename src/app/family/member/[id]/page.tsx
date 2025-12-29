'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Header, Card, CardContent, Button, Input } from '@/components/ui';
import { useFamilyStore } from '@/store';
import { ROLE_OPTIONS, MemberRole } from '@/types';

const avatarOptions = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
  '/avatars/avatar5.png',
  '/avatars/avatar6.png',
];

const colorOptions = [
  '#8CB89F',
  '#ee7c2b',
  '#66a2e3',
  '#e879a9',
  '#9b7ed9',
  '#f0c541',
];

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;
  const { members, updateMember } = useFamilyStore();
  
  const member = members.find(m => m.id === memberId);
  
  const [name, setName] = useState(member?.name || '');
  const [role, setRole] = useState<MemberRole>(member?.role || 'outro');
  const [avatar, setAvatar] = useState(member?.avatar || avatarOptions[0]);
  const [color, setColor] = useState(member?.color || colorOptions[0]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !member) return;
    
    setIsSaving(true);
    
    try {
      await updateMember(member.id, {
        name: name.trim(),
        role,
        avatar,
        color,
      });
      router.back();
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-background-light">
        <Header title="Editar Membro" showBack />
        <main className="px-4 py-8 text-center">
          <p className="text-text-muted">Membro não encontrado</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Editar Membro" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* Avatar Preview */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center py-4"
        >
          <div 
            className="w-24 h-24 rounded-full mb-3 flex items-center justify-center text-4xl"
            style={{ backgroundColor: `${color}20`, borderColor: color, borderWidth: 3 }}
          >
            {name ? name.charAt(0).toUpperCase() : '?'}
          </div>
          <p className="font-semibold text-text-main">{name || 'Nome do Membro'}</p>
          <p className="text-sm text-text-muted">{ROLE_OPTIONS.find(r => r.value === role)?.label || role}</p>
        </motion.div>

        {/* Name Input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent>
              <label className="block text-sm font-medium text-text-main mb-2">
                Nome
              </label>
              <Input
                placeholder="Nome do membro"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card>
            <CardContent>
              <label className="block text-sm font-medium text-text-main mb-3">
                Função na Família
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRole(option.value)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      role === option.value
                        ? 'bg-primary-green/10 border-2 border-primary-green'
                        : 'bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-xl mb-1 block">{option.icon}</span>
                    <span className="text-sm font-medium text-text-main">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Color Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent>
              <label className="block text-sm font-medium text-text-main mb-3">
                Cor do Perfil
              </label>
              <div className="flex gap-3 justify-center">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full transition-transform ${
                      color === c ? 'scale-110 ring-2 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* XP Info (Read Only) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="bg-gradient-to-r from-primary-orange/10 to-accent-attention/10">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Contribuição Total</p>
                  <p className="text-2xl font-bold text-primary-orange">
                    {member.xp || 0} XP
                  </p>
                </div>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-primary-orange">
                    star
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-muted mt-2">
                {member.completedMissions || 0} missões completadas
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-3 pt-4"
        >
          <Button
            className="w-full"
            onClick={handleSave}
            isLoading={isSaving}
            disabled={!name.trim()}
          >
            Salvar Alterações
          </Button>
          <Button
            variant="ghost"
            className="w-full text-red-500"
            onClick={() => router.push(`/family/member/${memberId}/remove`)}
          >
            Remover Membro
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
