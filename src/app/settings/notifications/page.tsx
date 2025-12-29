'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Header, Card, CardContent, Button, Toggle } from '@/components/ui';

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    missionReminders: true,
    missionCompleted: true,
    newMember: true,
    levelUp: true,
    weeklyReport: true,
    dailyDigest: false,
    sound: true,
    vibration: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    router.back();
  };

  const notificationGroups = [
    {
      title: 'Missões',
      items: [
        {
          key: 'missionReminders' as const,
          icon: 'alarm',
          label: 'Lembretes de Missões',
          description: 'Receba lembretes sobre missões pendentes',
        },
        {
          key: 'missionCompleted' as const,
          icon: 'check_circle',
          label: 'Missões Completadas',
          description: 'Quando alguém completar uma missão',
        },
      ],
    },
    {
      title: 'Família',
      items: [
        {
          key: 'newMember' as const,
          icon: 'person_add',
          label: 'Novos Membros',
          description: 'Quando alguém entrar no ninho',
        },
        {
          key: 'levelUp' as const,
          icon: 'emoji_events',
          label: 'Subiu de Nível',
          description: 'Quando o ninho subir de nível',
        },
      ],
    },
    {
      title: 'Relatórios',
      items: [
        {
          key: 'weeklyReport' as const,
          icon: 'summarize',
          label: 'Relatório Semanal',
          description: 'Resumo das atividades da semana',
        },
        {
          key: 'dailyDigest' as const,
          icon: 'today',
          label: 'Resumo Diário',
          description: 'Missões do dia às 8h',
        },
      ],
    },
    {
      title: 'Preferências',
      items: [
        {
          key: 'sound' as const,
          icon: 'volume_up',
          label: 'Som',
          description: 'Reproduzir som nas notificações',
        },
        {
          key: 'vibration' as const,
          icon: 'vibration',
          label: 'Vibração',
          description: 'Vibrar nas notificações',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Configurações de Notificações" showBack />

      <main className="px-4 pb-24 space-y-6">
        {notificationGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
          >
            <h2 className="text-sm font-medium text-text-muted mb-3">
              {group.title}
            </h2>
            <Card>
              <CardContent className="divide-y divide-gray-100">
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-text-muted">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-text-main">{item.label}</p>
                        <p className="text-xs text-text-muted">{item.description}</p>
                      </div>
                    </div>
                    <Toggle
                      checked={settings[item.key]}
                      onChange={() => handleToggle(item.key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSettings({
                  missionReminders: true,
                  missionCompleted: true,
                  newMember: true,
                  levelUp: true,
                  weeklyReport: true,
                  dailyDigest: true,
                  sound: true,
                  vibration: true,
                })}
              >
                Ativar Todas
              </Button>
              <Button
                variant="ghost"
                className="w-full text-text-muted"
                onClick={() => setSettings({
                  missionReminders: false,
                  missionCompleted: false,
                  newMember: false,
                  levelUp: false,
                  weeklyReport: false,
                  dailyDigest: false,
                  sound: false,
                  vibration: false,
                })}
              >
                Desativar Todas
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light border-t border-gray-100">
        <Button
          className="w-full"
          onClick={handleSave}
          isLoading={isSaving}
        >
          Salvar Preferências
        </Button>
      </div>
    </div>
  );
}
