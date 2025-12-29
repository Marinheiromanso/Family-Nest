'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-primary-orange/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Nest Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-48 h-48">
            {/* Nest background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/20 to-primary-lime/20 rounded-full" />
            
            {/* Decorative rings */}
            <div className="absolute inset-2 border-2 border-dashed border-primary-green/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-6 border-2 border-dotted border-primary-orange/30 rounded-full" />
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-green to-primary-green/80 rounded-full flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-5xl">
                  nest_multi_room
                </span>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 right-4"
            >
              <span className="material-symbols-outlined text-primary-orange text-2xl">favorite</span>
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-4 -left-2"
            >
              <span className="material-symbols-outlined text-primary-lime text-2xl">star</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-text-main mb-3 font-display">
            Family Nest
          </h1>
          <p className="text-text-muted text-lg max-w-xs mx-auto">
            Organize as tarefas da casa em família de forma divertida e colaborativa
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 mb-12"
        >
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="material-symbols-outlined text-primary-green text-lg">check_circle</span>
            Missões diárias
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="material-symbols-outlined text-primary-orange text-lg">emoji_events</span>
            Recompensas
          </div>
        </motion.div>

        {/* Page indicators */}
        <div className="flex gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary-orange" />
          <span className="w-2 h-2 rounded-full bg-accent-sand" />
          <span className="w-2 h-2 rounded-full bg-accent-sand" />
        </div>
      </div>

      {/* Bottom actions */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-6 space-y-4 safe-area-bottom"
      >
        <Link href="/register" className="block">
          <Button className="w-full" size="lg">
            <span className="material-symbols-outlined mr-2">add</span>
            Criar Meu Ninho
          </Button>
        </Link>
        
        <p className="text-center text-text-muted text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary-orange font-medium hover:underline">
            Entrar
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
