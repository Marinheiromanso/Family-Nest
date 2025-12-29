'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Header, Card, CardContent, Button } from '@/components/ui';
import { useFamilyStore } from '@/store';

export default function RemoveMemberPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;
  const { members, removeMember } = useFamilyStore();
  
  const member = members.find(m => m.id === memberId);
  const [isRemoving, setIsRemoving] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleRemove = async () => {
    if (confirmText !== 'REMOVER' || !member) return;
    
    setIsRemoving(true);
    
    try {
      await removeMember(member.id);
      router.push('/family');
    } catch (error) {
      console.error('Error removing member:', error);
      setIsRemoving(false);
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-background-light">
        <Header title="Remover Membro" showBack />
        <main className="px-4 py-8 text-center">
          <p className="text-text-muted">Membro não encontrado</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Remover Membro" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* Warning Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-red-500">
                  warning
                </span>
              </div>
              <h2 className="text-xl font-bold text-text-main mb-2">
                Remover {member.name}?
              </h2>
              <p className="text-sm text-text-muted">
                Esta ação é irreversível. Todo o histórico e contribuições 
                deste membro serão removidos do ninho.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Member Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent>
              <h3 className="text-sm font-medium text-text-muted mb-3">
                Resumo do Membro
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white"
                  style={{ backgroundColor: '#8CB89F' }}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-text-main">{member.name}</p>
                  <p className="text-sm text-text-muted">{member.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-orange">
                    {member.xp || 0}
                  </p>
                  <p className="text-xs text-text-muted">XP Contribuído</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-green">
                    {member.completedMissions || 0}
                  </p>
                  <p className="text-xs text-text-muted">Missões Completadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Confirmation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent>
              <label className="block text-sm font-medium text-text-main mb-2">
                Para confirmar, digite <span className="font-bold text-red-500">REMOVER</span>
              </label>
              <input
                type="text"
                placeholder="Digite REMOVER"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-text-main placeholder:text-text-muted"
              />
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
            className="w-full bg-red-500 hover:bg-red-600"
            onClick={handleRemove}
            isLoading={isRemoving}
            disabled={confirmText !== 'REMOVER'}
          >
            Confirmar Remoção
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
