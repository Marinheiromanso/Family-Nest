'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header, Card, CardContent, Button } from '@/components/ui';

const faqItems = [
  {
    question: 'O que é o Family Nest?',
    answer: 'O Family Nest é um aplicativo que ajuda famílias a organizarem as tarefas domésticas de forma colaborativa e divertida, evitando que uma única pessoa fique sobrecarregada.',
  },
  {
    question: 'Como funciona o sistema de XP?',
    answer: 'Cada missão concluída recompensa a família com pontos de experiência (XP). Acumulando XP, o ninho sobe de nível e desbloqueia novas recompensas e decorações.',
  },
  {
    question: 'Posso usar com apenas duas pessoas?',
    answer: 'Sim! O Family Nest funciona para qualquer formato de família - casais, famílias tradicionais, republicanas ou qualquer grupo que compartilhe um lar.',
  },
  {
    question: 'As missões são personalizáveis?',
    answer: 'Completamente! Você pode criar missões personalizadas, definir frequência (única, diária, semanal), atribuir a membros específicos e escolher a quantidade de XP.',
  },
  {
    question: 'Como adiciono novos membros?',
    answer: 'Vá em Família > Adicionar Membro. Você pode criar perfis para cada membro da casa, incluindo crianças e até pets!',
  },
  {
    question: 'O app funciona offline?',
    answer: 'O Family Nest tem funcionalidade básica offline. Suas alterações serão sincronizadas assim que a conexão for restabelecida.',
  },
  {
    question: 'Como excluir um membro ou ninho?',
    answer: 'Nas Configurações, você pode gerenciar membros e, se necessário, excluir o ninho. Atenção: essa ação é irreversível.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Perguntas Frequentes" showBack />

      <main className="px-4 pb-8">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardContent>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary-green text-lg">
                        help
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-main mb-2">{item.question}</h3>
                      <p className="text-sm text-text-muted">{item.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-primary-orange/10 to-accent-attention/10 border border-primary-orange/20">
            <CardContent className="text-center py-6">
              <div className="w-14 h-14 bg-primary-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary-orange">
                  support_agent
                </span>
              </div>
              <h3 className="font-semibold text-text-main mb-2">
                Não encontrou sua resposta?
              </h3>
              <p className="text-sm text-text-muted mb-4">
                Entre em contato com nossa equipe de suporte.
              </p>
              <Link href="/support">
                <Button variant="outline" size="sm">
                  Contatar Suporte
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
