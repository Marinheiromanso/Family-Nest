'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, Input } from '@/components/ui';
import { signUp, signInWithGoogle } from '@/lib/firebase/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    const { user, error } = await signUp(email, password, name);

    if (error) {
      setError('Erro ao criar conta. Tente novamente.');
      setIsLoading(false);
      return;
    }

    router.push('/create-nest');
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);

    const { user, error } = await signInWithGoogle();

    if (error) {
      setError('Erro ao entrar com Google');
      setIsLoading(false);
      return;
    }

    router.push('/create-nest');
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-orange/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-orange/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="p-4 safe-area-top">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-main hover:bg-accent-sand transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-4 relative z-10 overflow-y-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark rounded-full flex items-center justify-center shadow-button">
              <span className="material-symbols-outlined text-white text-3xl">
                nest_multi_room
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-main text-center mb-2 font-display">
            Criar Conta
          </h1>
          <p className="text-text-muted text-center mb-6">
            Junte-se ao Family Nest e organize sua família
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome"
              type="text"
              placeholder="Seu nome"
              leftIcon="person"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              leftIcon="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 6 caracteres"
              leftIcon="lock"
              rightIcon={showPassword ? 'visibility_off' : 'visibility'}
              onRightIconClick={() => setShowPassword(!showPassword)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirmar Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite a senha novamente"
              leftIcon="lock"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-accent-care text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Criar Conta
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-input-border" />
            <span className="text-text-muted text-sm">ou continue com</span>
            <div className="flex-1 h-px bg-input-border" />
          </div>

          {/* Social login */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex-1 h-14 bg-surface-light border border-input-border rounded-full flex items-center justify-center gap-2 hover:bg-accent-sand transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium text-text-main">Google</span>
            </button>

            <button
              type="button"
              className="flex-1 h-14 bg-black rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <span className="font-medium text-white">Apple</span>
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-text-muted text-center mt-6">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/terms" className="text-primary-orange hover:underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link href="/privacy" className="text-primary-orange hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="p-6 text-center safe-area-bottom">
        <p className="text-text-muted text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary-orange font-medium hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
