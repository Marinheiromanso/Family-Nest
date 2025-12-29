'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Header, Card, CardContent, Button, Input, Avatar } from '@/components/ui';
import { useFamilyStore } from '@/store';
import { useAuth } from '@/hooks';
import { ROLE_OPTIONS } from '@/types';

export default function InviteMembersPage() {
  const router = useRouter();
  const { family } = useFamilyStore();
  const [email, setEmail] = useState('');
  const [invites, setInvites] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleAddInvite = () => {
    if (email && !invites.includes(email)) {
      setInvites([...invites, email]);
      setEmail('');
    }
  };

  const handleRemoveInvite = (emailToRemove: string) => {
    setInvites(invites.filter(e => e !== emailToRemove));
  };

  const handleSendInvites = async () => {
    setIsSending(true);
    // Simulate sending invites
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    setSent(true);
  };

  const copyInviteLink = () => {
    const link = `https://familynest.app/join/${family?.id}`;
    navigator.clipboard.writeText(link);
    // Could add a toast notification here
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-background-light">
        <Header title="Convidar Membros" showBack />
        
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
                    mark_email_read
                  </span>
                </div>
                <h2 className="text-xl font-bold text-text-main mb-2">
                  Convites Enviados!
                </h2>
                <p className="text-text-muted mb-6">
                  {invites.length} convite(s) enviado(s) com sucesso.
                </p>
                <div className="space-y-3">
                  <Button onClick={() => router.push('/family')}>
                    Voltar para Família
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => { setSent(false); setInvites([]); }}
                  >
                    Enviar Mais Convites
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Convidar Membros" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* Family Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary-green/10 to-primary-orange/10">
            <CardContent className="text-center py-4">
              <p className="text-sm text-text-muted">Convidando para</p>
              <h2 className="text-lg font-bold text-text-main">
                {family?.name || 'Meu Ninho'}
              </h2>
            </CardContent>
          </Card>
        </motion.div>

        {/* Email Invite */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">
            Convidar por E-mail
          </h2>
          <Card>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Digite o e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddInvite()}
                />
                <Button 
                  onClick={handleAddInvite}
                  disabled={!email}
                  className="flex-shrink-0"
                >
                  <span className="material-symbols-outlined">add</span>
                </Button>
              </div>

              {/* Invite List */}
              <AnimatePresence>
                {invites.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <p className="text-xs text-text-muted">
                      {invites.length} convite(s) pendente(s)
                    </p>
                    {invites.map((inviteEmail) => (
                      <motion.div
                        key={inviteEmail}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-green/10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-green text-sm">
                              person
                            </span>
                          </div>
                          <span className="text-sm text-text-main">{inviteEmail}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveInvite(inviteEmail)}
                          className="text-text-muted hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-sm font-medium text-text-muted mb-3">
            Ou compartilhe o link
          </h2>
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-3">
                <span className="material-symbols-outlined text-text-muted">
                  link
                </span>
                <span className="text-sm text-text-muted flex-1 truncate">
                  familynest.app/join/{family?.id?.slice(0, 8) || 'abc123'}
                </span>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={copyInviteLink}
                >
                  <span className="material-symbols-outlined mr-2">content_copy</span>
                  Copiar Link
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Junte-se ao nosso ninho!',
                        text: `Entre no ninho ${family?.name} no Family Nest`,
                        url: `https://familynest.app/join/${family?.id}`,
                      });
                    }
                  }}
                >
                  <span className="material-symbols-outlined mr-2">share</span>
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="text-center">
              <div className="w-40 h-40 bg-gray-100 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-text-muted">
                  qr_code_2
                </span>
              </div>
              <p className="text-sm text-text-muted">
                Escaneie o QR Code para entrar no ninho
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Send Button */}
        {invites.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-background-light border-t border-gray-100"
          >
            <Button
              className="w-full"
              onClick={handleSendInvites}
              isLoading={isSending}
            >
              Enviar {invites.length} Convite{invites.length > 1 ? 's' : ''}
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
