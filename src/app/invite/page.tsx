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

  const shareOnWhatsApp = () => {
    const message = `Olá! 🏡 Convido você para entrar no nosso ninho "${family?.name || 'Meu Ninho'}" no Family Nest! 🐦\n\nO Family Nest é um app para organizar as tarefas da casa em família de forma divertida e colaborativa.\n\nClique no link para entrar: https://familynest.app/join/${family?.id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  onClick={copyInviteLink}
                >
                  <span className="material-symbols-outlined text-xl">content_copy</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                  onClick={shareOnWhatsApp}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
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
                  <span className="material-symbols-outlined text-xl">share</span>
                </Button>
              </div>
              <div className="mt-3 flex gap-2 text-xs text-text-muted justify-center">
                <span>Copiar</span>
                <span>•</span>
                <span className="text-green-600">WhatsApp</span>
                <span>•</span>
                <span>Mais</span>
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
