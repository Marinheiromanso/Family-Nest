'use client';

import { motion } from 'framer-motion';
import { Header, Card, CardContent } from '@/components/ui';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Sobre o App" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* App Logo and Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-6"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary-green to-primary-green/80 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-5xl">🪺</span>
          </div>
          <h1 className="text-2xl font-bold text-text-main">Family Nest</h1>
          <p className="text-text-muted">Versão 1.0.0</p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent>
              <h2 className="font-semibold text-text-main mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-orange">
                  rocket_launch
                </span>
                Nossa Missão
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Acreditamos que um lar organizado é responsabilidade de todos. 
                O Family Nest nasceu para transformar a organização doméstica em 
                uma experiência colaborativa e divertida, onde cada membro da família 
                contribui e é reconhecido por suas ações.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card>
            <CardContent>
              <h2 className="font-semibold text-text-main mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-attention">
                  stars
                </span>
                Recursos Principais
              </h2>
              <ul className="space-y-3">
                {[
                  { icon: 'task_alt', text: 'Criação de missões personalizadas' },
                  { icon: 'group', text: 'Perfis para toda a família' },
                  { icon: 'emoji_events', text: 'Sistema de XP e níveis' },
                  { icon: 'notifications', text: 'Lembretes inteligentes' },
                  { icon: 'insights', text: 'Dashboard de atividades' },
                  { icon: 'history', text: 'Histórico completo de missões' },
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-text-muted">
                    <span className="material-symbols-outlined text-primary-green text-lg">
                      {feature.icon}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent>
              <h2 className="font-semibold text-text-main mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-progress">
                  favorite
                </span>
                Feito com Carinho
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Desenvolvido com ❤️ para famílias que acreditam na colaboração. 
                Se você gostou do app, considere nos avaliar na loja de aplicativos!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="bg-gray-50">
            <CardContent>
              <h2 className="font-semibold text-text-main mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-text-muted">
                  code
                </span>
                Tecnologias
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Framer Motion'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white rounded-full text-xs font-medium text-text-muted border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex justify-center gap-6 text-sm text-text-muted py-4"
        >
          <a href="/terms" className="hover:text-primary-green transition-colors">
            Termos de Uso
          </a>
          <span>•</span>
          <a href="/privacy" className="hover:text-primary-green transition-colors">
            Privacidade
          </a>
        </motion.div>
      </main>
    </div>
  );
}
