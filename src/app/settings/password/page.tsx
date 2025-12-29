'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Header, Card, CardContent, Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsChanging(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError('Erro ao alterar senha. Verifique a senha atual.');
    } finally {
      setIsChanging(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background-light">
        <Header title="Alterar Senha" showBack />
        
        <main className="px-4 py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-20 h-20 bg-accent-progress/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-accent-progress">
                    check_circle
                  </span>
                </div>
                <h2 className="text-xl font-bold text-text-main mb-2">
                  Senha Alterada!
                </h2>
                <p className="text-text-muted mb-6">
                  Sua senha foi alterada com sucesso.
                </p>
                <Button onClick={() => router.push('/settings')}>
                  Voltar às Configurações
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Alterar Senha" showBack />

      <main className="px-4 pb-8 space-y-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">
                    Senha Atual
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords ? 'text' : 'password'}
                      placeholder="Digite sua senha atual"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">
                    Nova Senha
                  </label>
                  <Input
                    type={showPasswords ? 'text' : 'password'}
                    placeholder="Digite a nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Mínimo de 6 caracteres
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">
                    Confirmar Nova Senha
                  </label>
                  <Input
                    type={showPasswords ? 'text' : 'password'}
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="text-sm text-primary-green hover:underline"
                >
                  {showPasswords ? 'Ocultar senhas' : 'Mostrar senhas'}
                </button>

                {error && (
                  <div className="p-3 bg-red-50 rounded-xl">
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isChanging}
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                  Alterar Senha
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-primary-green/5 border border-primary-green/10">
            <CardContent>
              <h3 className="font-medium text-text-main mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-green">
                  security
                </span>
                Dicas de Segurança
              </h3>
              <ul className="space-y-1 text-xs text-text-muted">
                <li>• Use uma combinação de letras, números e símbolos</li>
                <li>• Evite usar informações pessoais óbvias</li>
                <li>• Não reutilize senhas de outros serviços</li>
                <li>• Altere sua senha periodicamente</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
