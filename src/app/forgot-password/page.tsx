'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Input } from '@/components/ui';
import { resetPassword } from '@/lib/firebase/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError('Email não encontrado. Verifique e tente novamente.');
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background-light flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-primary-green/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary-green">
              mark_email_read
            </span>
          </div>
          <h1 className="text-2xl font-bold text-text-main mb-2">Email enviado!</h1>
          <p className="text-text-muted mb-8 max-w-xs">
            Enviamos um link para recuperar sua senha para {email}
          </p>
          <Link href="/login">
            <Button variant="secondary">Voltar para o login</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Header */}
      <header className="p-4 safe-area-top">
        <Link
          href="/login"
          className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-main hover:bg-accent-sand transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 bg-accent-attention/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-accent-attention">
              lock_reset
            </span>
          </div>

          <h1 className="text-3xl font-bold text-text-main text-center mb-2 font-display">
            Recuperar Senha
          </h1>
          <p className="text-text-muted text-center mb-8">
            Digite seu email e enviaremos um link para redefinir sua senha.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              leftIcon="mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
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
              Enviar Link
            </Button>
          </form>

          <p className="text-center text-text-muted text-sm mt-8">
            Lembrou a senha?{' '}
            <Link href="/login" className="text-primary-orange font-medium hover:underline">
              Fazer login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
