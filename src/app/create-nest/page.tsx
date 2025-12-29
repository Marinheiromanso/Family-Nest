'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, Input, LoadingScreen } from '@/components/ui';
import { createFamily } from '@/lib/firebase/firestore';
import { useAuth } from '@/hooks';

export default function CreateNestPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [nestName, setNestName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateNest = async () => {
    if (!nestName.trim()) {
      setError('Por favor, dê um nome ao seu ninho');
      return;
    }

    if (!user) {
      setError('Você precisa estar logado');
      return;
    }

    setIsLoading(true);
    setError('');

    const { id, error } = await createFamily(
      {
        name: nestName.trim(),
      },
      user.uid
    );

    if (error) {
      setError('Erro ao criar o ninho. Tente novamente.');
      setIsLoading(false);
      return;
    }

    router.push('/home');
  };

  // Aguarda verificação de autenticação
  if (authLoading) {
    return <LoadingScreen message="Verificando..." />;
  }

  // Redireciona se não estiver logado
  if (!user) {
    router.push('/login');
    return <LoadingScreen message="Redirecionando..." />;
  }

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-primary-green/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary-lime/10 rounded-full blur-3xl" />
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-accent-sand safe-area-top">
        <motion.div
          className="h-full bg-primary-orange"
          initial={{ width: '33%' }}
          animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {step === 1 && (
            <div className="text-center">
              {/* Nest illustration */}
              <div className="mb-8">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-green/20 to-primary-lime/20 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary-green">
                      nest_multi_room
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-2 border-dashed border-primary-green/30 rounded-full"
                  />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-text-main mb-3 font-display">
                Dê um nome ao seu Ninho
              </h1>
              <p className="text-text-muted mb-8">
                Como você quer chamar a sua família?
              </p>

              <Input
                placeholder="Ex: Família Silva, Ninho Feliz..."
                value={nestName}
                onChange={(e) => {
                  setNestName(e.target.value);
                  setError('');
                }}
                leftIcon="edit"
                className="text-center"
              />

              {error && (
                <p className="text-accent-care text-sm mt-4">{error}</p>
              )}

              {/* Suggestions */}
              <div className="mt-6">
                <p className="text-xs text-text-muted mb-3">Sugestões:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Ninho da Família', 'Casa Feliz', 'Lar Doce Lar', 'Nossa Casa'].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setNestName(suggestion)}
                        className="px-3 py-1.5 bg-surface-light border border-input-border rounded-full text-sm text-text-muted hover:bg-accent-sand transition-colors"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom actions */}
      <div className="p-6 space-y-4 safe-area-bottom">
        <Button
          onClick={handleCreateNest}
          className="w-full"
          size="lg"
          variant="secondary"
          isLoading={isLoading}
          disabled={!nestName.trim()}
        >
          <span className="material-symbols-outlined mr-2">check</span>
          Criar Meu Ninho
        </Button>

        <button
          onClick={() => router.back()}
          className="w-full text-center text-text-muted text-sm hover:text-text-main transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
