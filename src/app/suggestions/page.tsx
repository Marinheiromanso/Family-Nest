'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Header, Card, CardContent, Button, Input } from '@/components/ui';
import { useFamilyStore } from '@/store';
import { CATEGORIES, MissionCategory } from '@/types';

const suggestedMissions: { title: string; category: MissionCategory; xp: number }[] = [
  { title: 'Lavar a louça', category: 'limpeza', xp: 25 },
  { title: 'Passar aspirador', category: 'limpeza', xp: 25 },
  { title: 'Limpar o banheiro', category: 'limpeza', xp: 50 },
  { title: 'Fazer as camas', category: 'limpeza', xp: 10 },
  { title: 'Preparar o jantar', category: 'culinaria', xp: 50 },
  { title: 'Preparar o almoço', category: 'culinaria', xp: 50 },
  { title: 'Preparar o café da manhã', category: 'culinaria', xp: 25 },
  { title: 'Levar o lixo', category: 'outros', xp: 10 },
  { title: 'Regar as plantas', category: 'jardim', xp: 10 },
  { title: 'Passear com o pet', category: 'pets', xp: 25 },
  { title: 'Fazer compras', category: 'compras', xp: 50 },
  { title: 'Lavar a roupa', category: 'organizacao', xp: 25 },
  { title: 'Passar a roupa', category: 'organizacao', xp: 25 },
  { title: 'Organizar o quarto', category: 'organizacao', xp: 25 },
  { title: 'Lavar o carro', category: 'manutencao', xp: 50 },
];

export default function MissionSuggestionsPage() {
  const router = useRouter();
  const { addMission, family, members } = useFamilyStore();
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuggestions = suggestedMissions.filter(
    mission => mission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSuggestion = (title: string) => {
    setSelectedSuggestions(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleAddSelected = async () => {
    if (!family?.id || selectedSuggestions.length === 0) return;
    
    setIsAdding(true);
    
    try {
      for (const title of selectedSuggestions) {
        const suggestion = suggestedMissions.find(s => s.title === title);
        if (suggestion) {
          addMission({
            id: `temp-${Date.now()}-${Math.random()}`,
            title: suggestion.title,
            description: '',
            category: suggestion.category,
            icon: 'task_alt',
            frequency: 'once',
            xpReward: suggestion.xp,
            assignedTo: [],
            assignmentType: 'open',
            familyId: family.id,
            status: 'pending',
            createdBy: 'user',
            createdAt: { toDate: () => new Date() } as any,
            updatedAt: { toDate: () => new Date() } as any,
          });
        }
      }
      router.push('/missions');
    } catch (error) {
      console.error('Error adding missions:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const groupedSuggestions = filteredSuggestions.reduce((acc, mission) => {
    if (!acc[mission.category]) {
      acc[mission.category] = [];
    }
    acc[mission.category].push(mission);
    return acc;
  }, {} as Record<string, typeof suggestedMissions>);

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Sugestões de Missões" showBack />

      <main className="px-4 pb-24 space-y-6">
        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            placeholder="Buscar sugestões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Selection Counter */}
        {selectedSuggestions.length > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Card className="bg-primary-green/10 border border-primary-green/20">
              <CardContent className="py-3 flex items-center justify-between">
                <span className="text-sm text-text-main">
                  <span className="font-bold text-primary-green">{selectedSuggestions.length}</span> missão(ões) selecionada(s)
                </span>
                <button
                  onClick={() => setSelectedSuggestions([])}
                  className="text-sm text-primary-green hover:underline"
                >
                  Limpar
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Suggestions by Category */}
        {Object.entries(groupedSuggestions).map(([categoryId, missions], groupIndex) => {
          const category = CATEGORIES.find(c => c.id === categoryId);
          
          return (
            <motion.div
              key={categoryId}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + groupIndex * 0.05 }}
            >
              <h2 className="text-sm font-medium text-text-muted mb-3 flex items-center gap-2">
                <span>{category?.icon}</span>
                {category?.name || categoryId}
              </h2>
              <div className="space-y-2">
                {missions.map((mission) => {
                  const isSelected = selectedSuggestions.includes(mission.title);
                  
                  return (
                    <Card
                      key={mission.title}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'ring-2 ring-primary-green bg-primary-green/5'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSuggestion(mission.title)}
                    >
                      <CardContent className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-primary-green border-primary-green'
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <span className="material-symbols-outlined text-white text-sm">
                                check
                              </span>
                            )}
                          </div>
                          <span className="font-medium text-text-main">
                            {mission.title}
                          </span>
                        </div>
                        <span 
                          className="text-sm font-bold"
                          style={{ color: category?.color }}
                        >
                          +{mission.xp} XP
                        </span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Custom Mission Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card
            className="cursor-pointer hover:bg-gray-50 border-dashed border-2"
            onClick={() => router.push('/missions/new')}
          >
            <CardContent className="py-4 text-center">
              <span className="material-symbols-outlined text-primary-green text-2xl mb-2">
                add_circle
              </span>
              <p className="text-sm font-medium text-text-main">
                Criar missão personalizada
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Fixed Bottom Button */}
      {selectedSuggestions.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light border-t border-gray-100">
          <Button
            className="w-full"
            onClick={handleAddSelected}
            isLoading={isAdding}
          >
            Adicionar {selectedSuggestions.length} Missão(ões)
          </Button>
        </div>
      )}
    </div>
  );
}
