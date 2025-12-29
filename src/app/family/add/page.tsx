'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, Input, Card, CardContent } from '@/components/ui';
import { addMember } from '@/lib/firebase/firestore';
import { useFamily } from '@/hooks';
import { ROLE_OPTIONS, AVATAR_OPTIONS, MemberRole } from '@/types';

export default function AddMemberPage() {
  const router = useRouter();
  const { family } = useFamily();

  const [name, setName] = useState('');
  const [role, setRole] = useState<MemberRole>('outro');
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Por favor, digite o nome do membro');
      return;
    }

    if (!family) {
      setError('Erro ao adicionar membro');
      return;
    }

    setIsLoading(true);
    setError('');

    const { id, error } = await addMember(family.id, {
      name: name.trim(),
      role,
      avatar,
    });

    if (error) {
      setError('Erro ao adicionar membro. Tente novamente.');
      setIsLoading(false);
      return;
    }

    router.push('/family');
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-3 bg-background-light/80 backdrop-blur-xl safe-area-top">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-main hover:bg-accent-sand transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h1 className="text-lg font-semibold text-text-main">Novo Membro</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 pb-8">
        {/* Name Input */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Nome do Membro</h3>
          <Input
            placeholder="Ex: João, Maria, Luna..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            leftIcon="person"
          />
          {error && (
            <p className="text-accent-care text-sm mt-2">{error}</p>
          )}
        </motion.section>

        {/* Avatar Selection */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Escolha um Avatar</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
            {AVATAR_OPTIONS.map((avatarOption) => (
              <button
                key={avatarOption.id}
                onClick={() => setAvatar(avatarOption.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                  avatar === avatarOption.id
                    ? 'bg-primary-green/10 ring-2 ring-primary-green'
                    : 'bg-surface-light'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    avatar === avatarOption.id
                      ? 'bg-primary-green/20'
                      : 'bg-accent-sand'
                  }`}
                >
                  🐦
                </div>
                <span className="text-xs text-text-muted">{avatarOption.name}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Role Selection */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Papel na Família</h3>
          <div className="grid grid-cols-2 gap-3">
            {ROLE_OPTIONS.map((roleOption) => (
              <button
                key={roleOption.value}
                onClick={() => setRole(roleOption.value)}
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                  role === roleOption.value
                    ? 'bg-primary-orange text-white'
                    : 'bg-surface-light text-text-main border border-input-border'
                }`}
              >
                <span className="text-xl">{roleOption.icon}</span>
                <span className="font-medium">{roleOption.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Preview Card */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Prévia</h3>
          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-green/20 flex items-center justify-center text-2xl">
                🐦
              </div>
              <div>
                <h4 className="font-semibold text-text-main">
                  {name || 'Nome do Membro'}
                </h4>
                <p className="text-sm text-text-muted">
                  {ROLE_OPTIONS.find((r) => r.value === role)?.label || 'Membro'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            isLoading={isLoading}
            disabled={!name.trim()}
          >
            <span className="material-symbols-outlined mr-1">add</span>
            Adicionar
          </Button>
        </div>
      </main>
    </div>
  );
}
