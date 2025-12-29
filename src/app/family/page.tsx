'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Header,
  Card,
  CardContent,
  Avatar,
  Badge,
  LevelProgress,
  BottomNav,
  Button,
  EmptyState,
} from '@/components/ui';
import { useFamily } from '@/hooks';
import { getRoleDisplayName, getRoleBadgeColor, calculateLevel } from '@/lib/utils';

export default function FamilyPage() {
  const { family, members, missions } = useFamily();
  const [copied, setCopied] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  const getMemberStats = (memberId: string) => {
    const memberMissions = missions.filter(
      (m) => m.completedBy === memberId || m.assignedTo.includes(memberId)
    );
    const completed = memberMissions.filter((m) => m.status === 'completed').length;
    return { completed };
  };

  const handleCopyCode = async () => {
    if (family?.inviteCode) {
      try {
        await navigator.clipboard.writeText(family.inviteCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback para navegadores que não suportam clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = family.inviteCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const getInviteMessage = () => {
    if (!family) return '';
    return `🏠 Você foi convidado para o ninho "${family.name}" no Family Nest!

🎯 Organize tarefas da casa em família de forma divertida e colaborativa.

📲 Para entrar:
1. Baixe o app Family Nest
2. Crie sua conta ou faça login
3. Use o código de convite:

🔑 ${family.inviteCode}

Vamos juntos deixar nosso lar mais organizado! 🌿`;
  };

  const handleShareInvite = async () => {
    const message = getInviteMessage();
    
    // Tenta usar Web Share API (funciona em mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Convite para ${family?.name}`,
          text: message,
        });
        return;
      } catch (err) {
        // Usuário cancelou ou erro - continua para copiar
      }
    }
    
    // Fallback: copia a mensagem
    try {
      await navigator.clipboard.writeText(message);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = message;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background-light page-container">
      <Header title="Família" showMenu showNotifications />

      <main className="px-4 pb-24">
        {/* Family Info Card */}
        {family && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6" variant="elevated">
              <CardContent className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-green/20 to-primary-lime/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary-green">
                    nest_multi_room
                  </span>
                </div>
                <h2 className="text-xl font-bold text-text-main mb-1">{family.name}</h2>
                <p className="text-sm text-text-muted mb-4">
                  {members.length} {members.length === 1 ? 'membro' : 'membros'}
                </p>
                <LevelProgress
                  currentXP={family.xp % 500}
                  maxXP={500}
                  level={Math.floor(family.xp / 500) + 1}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Members Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-main">Membros</h2>
            <Link href="/family/add">
              <Button variant="ghost" size="sm">
                <span className="material-symbols-outlined mr-1 text-lg">add</span>
                Adicionar
              </Button>
            </Link>
          </div>

          {members.length === 0 ? (
            <EmptyState
              icon="group_add"
              title="Nenhum membro ainda"
              description="Adicione membros da família para começar a organizar as tarefas juntos."
              action={
                <Link href="/family/add">
                  <Button size="sm">
                    <span className="material-symbols-outlined mr-1 text-lg">add</span>
                    Adicionar Membro
                  </Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {members.map((member, index) => {
                const stats = getMemberStats(member.id);
                const { level, currentXP, nextLevelXP } = calculateLevel(member.xp);

                return (
                  <motion.div
                    key={member.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={`/family/${member.id}`}>
                      <Card className="card-hover">
                        <CardContent>
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <Avatar
                              src={member.photoURL}
                              fallback={member.name}
                              size="lg"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-text-main truncate">
                                  {member.name}
                                </h3>
                                <Badge
                                  className={getRoleBadgeColor(member.role)}
                                  size="sm"
                                >
                                  {getRoleDisplayName(member.role)}
                                </Badge>
                              </div>

                              <LevelProgress
                                currentXP={currentXP}
                                maxXP={nextLevelXP}
                                level={level}
                                className="mb-3"
                              />

                              <div className="flex items-center gap-4 text-sm text-text-muted">
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-lg text-primary-green">
                                    check_circle
                                  </span>
                                  {stats.completed} missões
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-lg text-primary-lime">
                                    bolt
                                  </span>
                                  {member.xp} XP
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <span className="material-symbols-outlined text-text-muted">
                              chevron_right
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Invite Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-primary-orange/10 to-accent-attention/10 border border-primary-orange/20">
            <CardContent className="text-center py-6">
              <div className="w-14 h-14 bg-primary-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary-orange">
                  share
                </span>
              </div>
              <h3 className="font-semibold text-text-main mb-2">
                Convide sua família
              </h3>
              <p className="text-sm text-text-muted mb-4">
                Compartilhe o código do ninho para que outros membros possam participar.
              </p>
              {family?.inviteCode && (
                <div className="bg-white/50 rounded-xl px-4 py-2 mb-4 inline-block">
                  <span className="text-2xl font-bold tracking-widest text-primary-orange font-mono">
                    {family.inviteCode}
                  </span>
                </div>
              )}
              <div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyCode}
                  className={copied ? 'bg-primary-green text-white border-primary-green' : ''}
                >
                  <span className="material-symbols-outlined mr-1 text-lg">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  {copied ? 'Copiado!' : 'Copiar Código'}
                </Button>
              </div>
              
              {/* Botão de compartilhar convite completo */}
              <div className="mt-4 pt-4 border-t border-primary-orange/20">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleShareInvite}
                  className={copiedInvite ? 'bg-primary-green' : ''}
                >
                  <span className="material-symbols-outlined mr-1 text-lg">
                    {copiedInvite ? 'check' : 'share'}
                  </span>
                  {copiedInvite ? 'Convite Copiado!' : 'Compartilhar Convite'}
                </Button>
                <p className="text-xs text-text-muted mt-2">
                  Envia mensagem completa com instruções
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}
