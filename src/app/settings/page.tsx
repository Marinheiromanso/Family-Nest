'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Header,
  Card,
  CardContent,
  Avatar,
  Badge,
  Toggle,
  BottomNav,
  Button,
} from '@/components/ui';
import { useAuth, useFamily } from '@/hooks';
import { signOut } from '@/lib/firebase/auth';
import { calculateLevel } from '@/lib/utils';

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { family } = useFamily();

  const [missionReminders, setMissionReminders] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  // Handle dark mode toggle
  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const { level } = family ? calculateLevel(family.xp) : { level: 1 };

  return (
    <div className="min-h-screen bg-background-light page-container">
      <Header title="Ajustes" showBack />

      <main className="px-4 pb-24">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6" variant="elevated">
            <CardContent className="flex items-center gap-4">
              {family?.photoURL ? (
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 shadow-md flex-shrink-0">
                  <img
                    src={family.photoURL}
                    alt={family.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-primary-green/20 to-primary-lime/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-primary-green">
                    nest_multi_room
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h2 className="font-semibold text-text-main dark:text-white">
                  {family?.name || 'Meu Ninho'}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">Nível {level}</Badge>
                  <span className="text-sm text-text-muted">
                    {family?.xp || 0} XP
                  </span>
                </div>
              </div>
              <Link
                href="/settings/nest"
                className="w-10 h-10 rounded-full bg-accent-sand flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-text-muted">edit</span>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Family Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-1">MINHA FAMÍLIA</h3>
          <Card>
            <CardContent className="divide-y divide-accent-sand/50">
              <SettingsItem
                icon="edit"
                label="Nome do Ninho"
                value={family?.name}
                href="/settings/nest-name"
              />
              <SettingsItem
                icon="group"
                label="Gerenciar Membros"
                href="/family"
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Notifications Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-1">NOTIFICAÇÕES</h3>
          <Card>
            <CardContent className="divide-y divide-accent-sand/50">
              <SettingsToggle
                icon="notifications"
                label="Lembretes de Missões"
                description="Receba lembretes sobre missões pendentes"
                checked={missionReminders}
                onChange={setMissionReminders}
              />
              <SettingsToggle
                icon="trending_up"
                label="Atualizações de Progresso"
                description="Seja notificado sobre o progresso da família"
                checked={progressUpdates}
                onChange={setProgressUpdates}
              />
              <SettingsToggle
                icon="lightbulb"
                label="Sugestões Inteligentes"
                description="Receba sugestões personalizadas do Ninho"
                checked={smartSuggestions}
                onChange={setSmartSuggestions}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Preferences Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-1">PREFERÊNCIAS</h3>
          <Card>
            <CardContent className="divide-y divide-accent-sand/50">
              <SettingsToggle
                icon="dark_mode"
                label="Modo Escuro"
                description="Ativar tema escuro no aplicativo"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
              <SettingsItem
                icon="language"
                label="Idioma"
                value="Português (BR)"
                href="/settings/language"
              />
              <SettingsToggle
                icon="volume_up"
                label="Sons"
                description="Ativar sons de interação"
                checked={sounds}
                onChange={setSounds}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Help Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-1">AJUDA E SUPORTE</h3>
          <Card>
            <CardContent className="divide-y divide-accent-sand/50">
              <SettingsItem
                icon="help"
                label="Perguntas Frequentes"
                href="/faq"
              />
              <SettingsItem
                icon="support_agent"
                label="Contatar Suporte"
                href="/support"
              />
              <SettingsItem
                icon="description"
                label="Termos e Privacidade"
                href="/terms"
              />
              <SettingsItem
                icon="info"
                label="Sobre o App"
                href="/about"
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Logout Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            className="w-full border-accent-care text-accent-care hover:bg-accent-care hover:text-white"
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined mr-2">logout</span>
            Sair da Conta
          </Button>
        </motion.div>

        {/* App Version */}
        <p className="text-center text-xs text-text-muted">
          Family Nest v1.0.0
        </p>
      </main>

      <BottomNav />
    </div>
  );
}

// Settings Item Component
function SettingsItem({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value?: string;
  href: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-4 py-4">
      <span className="material-symbols-outlined text-text-muted">{icon}</span>
      <span className="flex-1 font-medium text-text-main">{label}</span>
      {value && <span className="text-sm text-text-muted">{value}</span>}
      <span className="material-symbols-outlined text-text-muted">chevron_right</span>
    </Link>
  );
}

// Settings Toggle Component
function SettingsToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <span className="material-symbols-outlined text-text-muted">{icon}</span>
      <div className="flex-1">
        <span className="font-medium text-text-main">{label}</span>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}
