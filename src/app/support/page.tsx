'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header, Card, CardContent, Button, Input } from '@/components/ui';

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background-light">
        <Header title="Contato e Suporte" showBack />
        
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
                  Mensagem Enviada!
                </h2>
                <p className="text-text-muted mb-6">
                  Recebemos sua mensagem e retornaremos em breve.
                </p>
                <Button onClick={() => setSubmitted(false)}>
                  Enviar Nova Mensagem
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
      <Header title="Contato e Suporte" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* Contact Options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">
            Canais de Atendimento
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="text-center py-4">
                <div className="w-12 h-12 bg-primary-green/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-primary-green">
                    email
                  </span>
                </div>
                <p className="text-sm font-medium text-text-main">E-mail</p>
                <p className="text-xs text-text-muted">suporte@familynest.app</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="text-center py-4">
                <div className="w-12 h-12 bg-accent-attention/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-accent-attention">
                    chat
                  </span>
                </div>
                <p className="text-sm font-medium text-text-main">Chat</p>
                <p className="text-xs text-text-muted">Seg-Sex, 9h-18h</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">
            Envie sua Mensagem
          </h2>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Assunto
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green text-text-main"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida Geral</option>
                    <option value="bug">Reportar Problema</option>
                    <option value="sugestao">Sugestão de Melhoria</option>
                    <option value="assinatura">Assinatura Premium</option>
                    <option value="conta">Problemas com a Conta</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Mensagem
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva sua dúvida ou problema..."
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green text-text-main placeholder:text-text-muted resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isSubmitting}
                  disabled={!subject || !message}
                >
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Response Time */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-primary-green/5 border border-primary-green/10">
            <CardContent className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-green">
                schedule
              </span>
              <div>
                <p className="text-sm font-medium text-text-main">
                  Tempo de Resposta
                </p>
                <p className="text-xs text-text-muted">
                  Respondemos em até 24 horas úteis. Para questões urgentes, 
                  utilize o chat durante o horário comercial.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
