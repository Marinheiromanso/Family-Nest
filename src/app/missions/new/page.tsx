'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';
import { Button, LoadingScreen } from '@/components/ui';
import { useAuth, useFamily } from '@/hooks';
import { createMission } from '@/lib/firebase/firestore';
import { CATEGORIES, MissionCategory } from '@/types';

export default function TestNewMissionPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { family } = useFamily();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MissionCategory>('limpeza');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState('');

  const handleCategoryClick = (catId: MissionCategory) => {
    console.log('Categoria clicada:', catId);
    setDebug(`Categoria: ${catId}`);
    setCategory(catId);
  };

  const handleSubmit = async () => {
    console.log('Submit clicado!');
    setDebug('Submit clicado!');
    
    if (!title.trim()) {
      setError('Por favor, dê um nome à missão');
      return;
    }

    if (!family || !user) {
      setError(`Erro: family=${!!family}, user=${!!user}`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { id, error: createError } = await createMission(family.id, {
        title: title.trim(),
        category,
        icon: CATEGORIES.find((c) => c.id === category)?.icon || 'task_alt',
        xpReward: 50,
        frequency: 'once',
        assignmentType: 'open',
        assignedTo: [],
        dueDate: Timestamp.fromDate(new Date()),
        createdBy: user.uid,
      });

      if (createError) {
        setError(`Erro ao criar: ${createError}`);
        setIsLoading(false);
        return;
      }

      setDebug(`Missão criada com ID: ${id}`);
      router.push('/missions');
    } catch (err: any) {
      setError(`Exceção: ${err.message}`);
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <LoadingScreen message="Carregando..." />;
  }

  if (!user) {
    return <div className="p-4">Usuário não logado</div>;
  }

  if (!family) {
    return <div className="p-4">Família não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Teste Nova Missão</h1>
      
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <p>User: {user.displayName || user.email}</p>
        <p>Family: {family.name}</p>
        <p>Debug: {debug}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Nome da Missão</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg"
          placeholder="Digite o nome..."
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Categoria (clique para testar)</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                category === cat.id
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        {isLoading ? 'Salvando...' : 'SALVAR MISSÃO (Clique aqui)'}
      </button>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
