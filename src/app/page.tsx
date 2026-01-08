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
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
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

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-sm space-y-4 px-6"
        >
          <Link href="/register" className="block">
            <Button className="w-full" size="lg" variant="primary">
              <span className="material-symbols-outlined mr-2">person_add</span>
              Novo Cadastro
            </Button>
          </Link>

          <Link href="/login" className="block">
            <Button className="w-full" size="lg" variant="outline">
              <span className="material-symbols-outlined mr-2">login</span>
              Login
            </Button>
          </Link>

          <Link href="/create-nest" className="block">
            <Button className="w-full" size="lg" variant="secondary">
              <span className="material-symbols-outlined mr-2">add</span>
              Criar Meu Ninho
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
