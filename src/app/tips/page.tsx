'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header, Card, CardContent, Button } from '@/components/ui';

const tips = [
  {
    icon: '🎯',
    title: 'Divida as missões igualmente',
    description: 'Use a atribuição automática para distribuir tarefas de forma justa entre todos os membros.',
  },
  {
    icon: '⏰',
    title: 'Configure lembretes',
    description: 'Ative notificações para que ninguém esqueça suas missões do dia.',
  },
  {
    icon: '🏆',
    title: 'Celebre as conquistas',
    description: 'Quando o ninho subir de nível, recompensem a família com algo especial!',
  },
  {
    icon: '📅',
    title: 'Use missões recorrentes',
    description: 'Para tarefas que se repetem, configure frequência diária, semanal ou mensal.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Inclua todos',
    description: 'Mesmo as crianças podem participar com missões adequadas para sua idade.',
  },
  {
    icon: '📊',
    title: 'Acompanhe o progresso',
    description: 'Use o Dashboard para ver quem está contribuindo e identificar gargalos.',
  },
  {
    icon: '🔄',
    title: 'Revezem as tarefas',
    description: 'Alterne quem faz cada tarefa para que todos aprendam e ninguém fique sobrecarregado.',
  },
  {
    icon: '💬',
    title: 'Conversem em família',
    description: 'Use o app como ferramenta de comunicação sobre a organização da casa.',
  },
];

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Dicas de Uso" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* Intro */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary-green/10 to-primary-orange/10">
            <CardContent className="text-center py-6">
              <span className="text-4xl mb-3 block">💡</span>
              <h2 className="font-bold text-text-main text-lg mb-2">
                Aproveite ao máximo o Family Nest
              </h2>
              <p className="text-sm text-text-muted">
                Confira nossas dicas para uma organização familiar mais eficiente e divertida.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips Grid */}
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <Card>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{tip.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-main mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="space-y-3"
        >
          <Card className="bg-primary-orange/10 border border-primary-orange/20">
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-main">Precisa de mais ajuda?</h3>
                <p className="text-sm text-text-muted">Confira nossas perguntas frequentes</p>
              </div>
              <Link href="/faq">
                <Button variant="outline" size="sm">
                  Ver FAQ
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-accent-attention/10 border border-accent-attention/20">
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-main">Sugestões de missões</h3>
                <p className="text-sm text-text-muted">Não sabe por onde começar?</p>
              </div>
              <Link href="/suggestions">
                <Button variant="outline" size="sm">
                  Ver sugestões
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share App */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card>
            <CardContent className="text-center py-6">
              <span className="material-symbols-outlined text-3xl text-primary-green mb-2">
                share
              </span>
              <h3 className="font-semibold text-text-main mb-2">
                Gostou do Family Nest?
              </h3>
              <p className="text-sm text-text-muted mb-4">
                Compartilhe com outras famílias!
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Family Nest',
                      text: 'Organize as tarefas da sua família de forma colaborativa e divertida!',
                      url: 'https://familynest.app',
                    });
                  }
                }}
              >
                Compartilhar App
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
