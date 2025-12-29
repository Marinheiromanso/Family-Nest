'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Header,
  Card,
  CardContent,
  Badge,
  LevelProgress,
  Button,
} from '@/components/ui';
import { useFamily } from '@/hooks';
import { calculateLevel } from '@/lib/utils';

const NEST_STAGES = [
  {
    level: 1,
    name: 'Ninho de Gravetos',
    description: 'O início de tudo. Seu ninho está sendo construído!',
    icon: '🪹',
    requiredXP: 0,
    rewards: ['Decoração básica'],
  },
  {
    level: 2,
    name: 'Ninho de Folhas',
    description: 'Seu ninho ganhou mais conforto com folhas macias.',
    icon: '🍃',
    requiredXP: 500,
    rewards: ['Novos avatares', 'Tema verde'],
  },
  {
    level: 3,
    name: 'Ninho Aconchegante',
    description: 'Um ninho quentinho e acolhedor.',
    icon: '🏠',
    requiredXP: 1000,
    rewards: ['Badges exclusivos', 'Stickers'],
  },
  {
    level: 4,
    name: 'Ninho Florido',
    description: 'Flores adornam seu ninho, trazendo alegria.',
    icon: '🌸',
    requiredXP: 2000,
    rewards: ['Tema floral', 'Novos ícones'],
  },
  {
    level: 5,
    name: 'Ninho Dourado',
    description: 'Um ninho brilhante, símbolo de união familiar!',
    icon: '✨',
    requiredXP: 3500,
    rewards: ['Tema dourado', 'Avatar especial'],
  },
  {
    level: 6,
    name: 'Ninho Celestial',
    description: 'Seu ninho alcançou as estrelas!',
    icon: '🌟',
    requiredXP: 5000,
    rewards: ['Tema celestial', 'Decorações especiais'],
  },
];

export default function EvolutionPage() {
  const { family } = useFamily();
  const { level, currentXP, nextLevelXP } = family ? calculateLevel(family.xp) : { level: 1, currentXP: 0, nextLevelXP: 500 };
  
  const currentStage = NEST_STAGES.find((s) => s.level === Math.min(level, 6)) || NEST_STAGES[0];
  const nextStage = NEST_STAGES.find((s) => s.level === Math.min(level + 1, 6));

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Evolução do Ninho" showBack />

      <main className="px-4 pb-8">
        {/* Progress Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">Progresso para o próximo nível</span>
            <span className="text-sm font-medium text-primary-orange">
              {family?.xp || 0} XP
            </span>
          </div>
          <div className="h-3 bg-accent-sand rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-orange to-primary-lime rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Current Stage Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="mb-6 overflow-hidden" variant="elevated">
            <div className="bg-gradient-to-br from-primary-green/20 to-primary-lime/20 p-6">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  {currentStage.icon}
                </motion.div>
                <Badge variant="success" className="mb-2">Nível {level}</Badge>
                <h2 className="text-2xl font-bold text-text-main mb-2">
                  {currentStage.name}
                </h2>
                <p className="text-text-muted text-sm">
                  {currentStage.description}
                </p>
              </div>
            </div>
            <CardContent>
              <h4 className="text-sm font-medium text-text-muted mb-3">
                RECOMPENSAS DESBLOQUEADAS
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentStage.rewards.map((reward) => (
                  <Badge key={reward} variant="default" size="md">
                    <span className="material-symbols-outlined text-sm mr-1">
                      check_circle
                    </span>
                    {reward}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Evolution Timeline */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-text-main mb-4">Linha do Tempo</h3>
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-4 w-max pb-4">
              {NEST_STAGES.map((stage, index) => {
                const isUnlocked = level >= stage.level;
                const isCurrent = level === stage.level;
                
                return (
                  <motion.div
                    key={stage.level}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex-shrink-0 w-40 p-4 rounded-3xl text-center transition-all ${
                      isCurrent
                        ? 'bg-primary-orange text-white shadow-button'
                        : isUnlocked
                        ? 'bg-primary-green/10 text-text-main'
                        : 'bg-accent-sand/50 text-text-muted'
                    }`}
                  >
                    <div className={`text-3xl mb-2 ${!isUnlocked && 'grayscale opacity-50'}`}>
                      {stage.icon}
                    </div>
                    <h4 className={`font-semibold text-sm mb-1 ${isCurrent ? 'text-white' : ''}`}>
                      {stage.name}
                    </h4>
                    <p className={`text-xs ${isCurrent ? 'text-white/80' : 'text-text-muted'}`}>
                      Nível {stage.level}
                    </p>
                    {!isUnlocked && (
                      <div className="mt-2 flex items-center justify-center gap-1 text-xs">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        {stage.requiredXP} XP
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Next Level Info */}
        {nextStage && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-accent-attention/10 to-primary-orange/10 border border-primary-orange/20">
              <CardContent className="text-center py-6">
                <div className="text-4xl mb-3 grayscale opacity-50">
                  {nextStage.icon}
                </div>
                <h3 className="font-semibold text-text-main mb-2">
                  Próximo: {nextStage.name}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  Faltam {nextStage.requiredXP - (family?.xp || 0)} XP para desbloquear
                </p>
                <Link href="/missions">
                  <Button size="sm">
                    <span className="material-symbols-outlined mr-1 text-lg">
                      add_task
                    </span>
                    Completar Missões
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
