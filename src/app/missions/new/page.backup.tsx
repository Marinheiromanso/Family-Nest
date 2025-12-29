'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import {
  Header,
  Card,
  CardContent,
  Input,
  Button,
  Avatar,
  Badge,
  XPBadge,
  Chip,
  ChipGroup,
  Toggle,
  LoadingScreen,
} from '@/components/ui';
import { useAuth, useFamily } from '@/hooks';
import { createMission } from '@/lib/firebase/firestore';
import { CATEGORIES, MissionCategory, MissionFrequency } from '@/types';

export default function NewMissionPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { family, members } = useFamily();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MissionCategory>('limpeza');
  const [frequency, setFrequency] = useState<MissionFrequency>('once');
  const [assignmentType, setAssignmentType] = useState<'specific' | 'shared' | 'open'>('open');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [xpReward, setXpReward] = useState(50);
  const [hasDueTime, setHasDueTime] = useState(false);
  const [dueTime, setDueTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = async () => {
    console.log('handleSubmit chamado', { title, family, user });
    
    if (!title.trim()) {
      setError('Por favor, dê um nome à missão');
      return;
    }

    if (!family || !user) {
      setError('Erro ao criar missão - usuário ou família não encontrado');
      console.error('family:', family, 'user:', user);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Criando missão...', { familyId: family.id, userId: user.uid });
      
      const { id, error } = await createMission(family.id, {
        title: title.trim(),
        description: description.trim(),
        category,
        icon: CATEGORIES.find((c) => c.id === category)?.icon || 'task_alt',
        xpReward,
        frequency,
        assignmentType,
        assignedTo: assignmentType === 'open' ? [] : selectedMembers,
        dueDate: Timestamp.fromDate(new Date()),
        dueTime: hasDueTime ? dueTime : undefined,
        createdBy: user.uid,
      });

      console.log('Resultado:', { id, error });

      if (error) {
        setError('Erro ao criar missão. Tente novamente.');
        setIsLoading(false);
        return;
      }

      router.push('/missions');
    } catch (err) {
      console.error('Erro ao criar missão:', err);
      setError('Erro inesperado. Tente novamente.');
      setIsLoading(false);
    }
  };

  const selectedCategory = CATEGORIES.find((c) => c.id === category);

  // Verifica se está carregando autenticação
  if (authLoading) {
    return <LoadingScreen message="Carregando..." />;
  }

  // Verifica se usuário está logado
  if (!user) {
    router.push('/login');
    return <LoadingScreen message="Redirecionando..." />;
  }

  // Verifica se tem família
  if (!family) {
    router.push('/create-nest');
    return <LoadingScreen message="Redirecionando..." />;
  }

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
          <h1 className="text-lg font-semibold text-text-main">Nova Missão</h1>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !title.trim()}
            className="text-primary-orange font-medium disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </header>

      <main className="px-4 pb-8">
        {/* Title Input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${selectedCategory?.color || '#8CB89F'}20` }}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: selectedCategory?.color || '#8CB89F' }}
              >
                {selectedCategory?.icon || 'task_alt'}
              </span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Nome da missão"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                className="w-full text-xl font-semibold text-text-main bg-transparent border-none outline-none placeholder:text-text-muted"
              />
            </div>
            <XPBadge xp={xpReward} />
          </div>

          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-20 bg-input-bg rounded-2xl p-4 text-text-main placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary-orange"
          />

          {error && (
            <p className="text-accent-care text-sm mt-2">{error}</p>
          )}
        </motion.div>

        {/* AI Suggestion Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-primary-green/10 to-primary-lime/10 border border-primary-green/20 mb-6">
            <CardContent className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary-green">lightbulb</span>
              </div>
              <div>
                <h4 className="font-medium text-text-main mb-1">Sugestão do Ninho</h4>
                <p className="text-sm text-text-muted">
                  Baseado nas atividades da família, essa tarefa pode ser feita às 10h da manhã.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assignment Type */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Atribuir para</h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setAssignmentType('specific')}
              className={`flex-1 h-12 rounded-2xl font-medium transition-all ${
                assignmentType === 'specific'
                  ? 'bg-primary-orange text-white'
                  : 'bg-surface-light text-text-main border border-input-border'
              }`}
            >
              Específico
            </button>
            <button
              onClick={() => setAssignmentType('shared')}
              className={`flex-1 h-12 rounded-2xl font-medium transition-all ${
                assignmentType === 'shared'
                  ? 'bg-primary-orange text-white'
                  : 'bg-surface-light text-text-main border border-input-border'
              }`}
            >
              Compartilhada
            </button>
            <button
              onClick={() => setAssignmentType('open')}
              className={`flex-1 h-12 rounded-2xl font-medium transition-all ${
                assignmentType === 'open'
                  ? 'bg-primary-orange text-white'
                  : 'bg-surface-light text-text-main border border-input-border'
              }`}
            >
              Aberta
            </button>
          </div>

          {/* Member Selection */}
          {assignmentType !== 'open' && (
            <div className="flex flex-wrap gap-3">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => handleMemberToggle(member.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    selectedMembers.includes(member.id)
                      ? 'bg-primary-orange text-white ring-2 ring-primary-orange ring-offset-2'
                      : 'bg-surface-light text-text-main border border-input-border'
                  }`}
                >
                  <Avatar
                    src={member.photoURL}
                    fallback={member.name}
                    size="xs"
                    showBorder={false}
                  />
                  <span className="text-sm font-medium">{member.name}</span>
                </button>
              ))}
            </div>
          )}
        </motion.section>

        {/* Frequency */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Frequência</h3>
          <ChipGroup>
            <Chip
              selected={frequency === 'once'}
              onClick={() => setFrequency('once')}
            >
              Única
            </Chip>
            <Chip
              selected={frequency === 'daily'}
              onClick={() => setFrequency('daily')}
            >
              Diária
            </Chip>
            <Chip
              selected={frequency === 'weekly'}
              onClick={() => setFrequency('weekly')}
            >
              Semanal
            </Chip>
            <Chip
              selected={frequency === 'monthly'}
              onClick={() => setFrequency('monthly')}
            >
              Mensal
            </Chip>
          </ChipGroup>
        </motion.section>

        {/* Due Time */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text-muted">Sugerir horário</h3>
            <Toggle checked={hasDueTime} onChange={setHasDueTime} />
          </div>
          {hasDueTime && (
            <Input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              leftIcon="schedule"
            />
          )}
        </motion.section>

        {/* Category */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Categoria</h3>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  category === cat.id
                    ? 'bg-white shadow-card ring-2 ring-primary-green'
                    : 'bg-surface-light'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: cat.color }}
                  >
                    {cat.icon}
                  </span>
                </div>
                <span className="text-xs font-medium text-text-main">{cat.name}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* XP Reward */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">Recompensa XP</h3>
          <div className="flex gap-2">
            {[25, 50, 75, 100].map((xp) => (
              <button
                key={xp}
                onClick={() => setXpReward(xp)}
                className={`flex-1 h-12 rounded-2xl font-medium transition-all flex items-center justify-center gap-1 ${
                  xpReward === xp
                    ? 'bg-primary-lime text-white'
                    : 'bg-surface-light text-text-main border border-input-border'
                }`}
              >
                <span className="material-symbols-outlined text-sm">bolt</span>
                {xp}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          variant="secondary"
          isLoading={isLoading}
          disabled={!title.trim()}
        >
          <span className="material-symbols-outlined mr-2">save</span>
          Salvar no Ninho
        </Button>
      </main>
    </div>
  );
}
