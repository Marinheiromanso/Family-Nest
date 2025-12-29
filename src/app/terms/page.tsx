'use client';

import { motion } from 'framer-motion';
import { Header, Card, CardContent } from '@/components/ui';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Termos e Privacidade" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* Last Update */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-2"
        >
          <p className="text-xs text-text-muted">
            Última atualização: Janeiro de 2025
          </p>
        </motion.div>

        {/* Terms of Use */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent>
              <h2 className="font-semibold text-text-main mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-green">
                  description
                </span>
                Termos de Uso
              </h2>
              <div className="space-y-3 text-sm text-text-muted leading-relaxed">
                <p>
                  Ao utilizar o Family Nest, você concorda com estes termos. 
                  O aplicativo destina-se ao uso pessoal e familiar para 
                  organização de tarefas domésticas.
                </p>
                <p>
                  <strong className="text-text-main">Uso Adequado:</strong> Você 
                  concorda em usar o aplicativo de forma responsável, não 
                  compartilhando conteúdo ofensivo ou inapropriado através das 
                  funcionalidades de comunicação.
                </p>
                <p>
                  <strong className="text-text-main">Conta:</strong> Você é 
                  responsável por manter a segurança de sua conta e senha. 
                  Recomendamos não compartilhar suas credenciais.
                </p>
                <p>
                  <strong className="text-text-main">Conteúdo:</strong> Todo 
                  conteúdo criado (missões, perfis, etc.) é de sua 
                  responsabilidade. Reservamo-nos o direito de remover conteúdo 
                  que viole nossos termos.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Policy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent>
              <h2 className="font-semibold text-text-main mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-orange">
                  shield
                </span>
                Política de Privacidade
              </h2>
              <div className="space-y-3 text-sm text-text-muted leading-relaxed">
                <p>
                  Respeitamos sua privacidade. Esta política descreve como 
                  coletamos, usamos e protegemos suas informações.
                </p>
                <p>
                  <strong className="text-text-main">Dados Coletados:</strong> 
                  Coletamos informações que você fornece diretamente (nome, 
                  e-mail, dados da família) e dados de uso do aplicativo.
                </p>
                <p>
                  <strong className="text-text-main">Uso dos Dados:</strong> 
                  Utilizamos seus dados para fornecer e melhorar o serviço, 
                  enviar notificações relevantes e personalizar sua experiência.
                </p>
                <p>
                  <strong className="text-text-main">Compartilhamento:</strong> 
                  Não vendemos seus dados. Compartilhamos apenas com 
                  provedores de serviço essenciais (Firebase/Google) para 
                  operação do aplicativo.
                </p>
                <p>
                  <strong className="text-text-main">Segurança:</strong> 
                  Empregamos medidas de segurança padrão da indústria para 
                  proteger suas informações.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Rights */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent>
              <h2 className="font-semibold text-text-main mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-attention">
                  verified_user
                </span>
                Seus Direitos
              </h2>
              <div className="space-y-3 text-sm text-text-muted leading-relaxed">
                <p>
                  De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem 
                  direito a:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar consentimento a qualquer momento</li>
                  <li>Portabilidade de dados</li>
                </ul>
                <p>
                  Para exercer esses direitos, entre em contato através do 
                  suporte do aplicativo.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-primary-green/5 border border-primary-green/10">
            <CardContent className="text-center">
              <span className="material-symbols-outlined text-2xl text-primary-green mb-2">
                help_outline
              </span>
              <p className="text-sm text-text-muted">
                Dúvidas sobre nossos termos ou privacidade?
              </p>
              <a 
                href="/support" 
                className="text-sm font-medium text-primary-green hover:underline"
              >
                Entre em contato conosco
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
