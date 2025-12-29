'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Header, Card, CardContent, Button, Input } from '@/components/ui';
import { useFamilyStore } from '@/store';
import { CATEGORIES, MissionCategory, MissionFrequency } from '@/types';

const frequencyOptions = [
  { value: 'once', label: 'Única', icon: '1️⃣' },
  { value: 'daily', label: 'Diária', icon: '📅' },
  { value: 'weekly', label: 'Semanal', icon: '🗓️' },
  { value: 'monthly', label: 'Mensal', icon: '📆' },
];

const xpOptions = [
  { value: 10, label: 'Fácil', color: '#8CB89F' },
  { value: 25, label: 'Médio', color: '#66a2e3' },
  { value: 50, label: 'Difícil', color: '#ee7c2b' },
  { value: 100, label: 'Épico', color: '#9b7ed9' },
];

export default function EditMissionPage() {
  const router = useRouter();
  const params = useParams();
  const missionId = params.id as string;
  const { missions, members, updateMission, deleteMission } = useFamilyStore();
  
  const mission = missions.find(m => m.id === missionId);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [xpReward, setXpReward] = useState(25);
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (mission) {
      setTitle(mission.title);
      setDescription(mission.description || '');
      setCategory(mission.category);
      setFrequency(mission.frequency);
      setXpReward(mission.xpReward);
      setAssignedTo(mission.assignedTo || []);
    }
  }, [mission]);

  const handleSave = async () => {
    if (!title.trim() || !category || !mission) return;
    
    setIsSaving(true);
    
    try {
      updateMission(mission.id, {
        title: title.trim(),
        description: description.trim(),
        category: category as MissionCategory,
        frequency: frequency as MissionFrequency,
        xpReward,
        assignedTo,
      });
      router.back();
    } catch (error) {
      console.error('Error updating mission:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!mission) return;
    
    try {
      deleteMission(mission.id);
      router.push('/missions');
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

  if (!mission) {
    return (
      <div className="min-h-screen bg-background-light">
        <Header title="Editar Missão" showBack />
        <main className="px-4 py-8 text-center">
          <p className="text-text-muted">Missão não encontrada</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Editar Missão" showBack />

      <main className="px-4 pb-24 space-y-6">
        {/* Title & Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">
                  Nome da Missão
                </label>
                <Input
                  placeholder="Ex: Lavar a louça"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">
                  Descrição (opcional)
                </label>
                <textarea
                  placeholder="Detalhes adicionais..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green text-text-main placeholder:text-text-muted resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">Categoria</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.id
                    ? 'text-white'
                    : 'bg-gray-100 text-text-muted hover:bg-gray-200'
                }`}
                style={category === cat.id ? { backgroundColor: cat.color } : {}}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Frequency */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">Frequência</h2>
          <div className="grid grid-cols-2 gap-2">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFrequency(option.value)}
                className={`p-3 rounded-xl text-center transition-all ${
                  frequency === option.value
                    ? 'bg-primary-green/10 border-2 border-primary-green'
                    : 'bg-white border-2 border-transparent'
                }`}
              >
                <span className="text-xl block mb-1">{option.icon}</span>
                <span className="text-sm font-medium text-text-main">{option.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* XP Reward */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">Recompensa de XP</h2>
          <div className="flex gap-2">
            {xpOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setXpReward(option.value)}
                className={`flex-1 p-3 rounded-xl text-center transition-all ${
                  xpReward === option.value
                    ? 'ring-2 ring-offset-2'
                    : 'bg-white'
                }`}
                style={{ 
                  backgroundColor: xpReward === option.value ? `${option.color}20` : undefined
                }}
              >
                <span 
                  className="text-lg font-bold block"
                  style={{ color: option.color }}
                >
                  {option.value}
                </span>
                <span className="text-xs text-text-muted">{option.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Assign To */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">Atribuir a</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setAssignedTo([])}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                assignedTo.length === 0
                  ? 'bg-primary-green text-white'
                  : 'bg-white text-text-muted hover:bg-gray-100'
              }`}
            >
              👥 Qualquer um
            </button>
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => setAssignedTo([member.id])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  assignedTo.includes(member.id)
                    ? 'text-white bg-primary-green'
                    : 'bg-white text-text-muted hover:bg-gray-100'
                }`}
              >
                {member.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Delete Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border border-red-100">
            <CardContent>
              {showDeleteConfirm ? (
                <div className="space-y-3">
                  <p className="text-sm text-text-main text-center">
                    Tem certeza que deseja excluir esta missão?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      onClick={handleDelete}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full text-red-500"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <span className="material-symbols-outlined mr-2">delete</span>
                  Excluir Missão
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light border-t border-gray-100">
        <Button
          className="w-full"
          onClick={handleSave}
          isLoading={isSaving}
          disabled={!title.trim() || !category}
        >
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
