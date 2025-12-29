'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, Card, CardContent, Button, Badge } from '@/components/ui';

const plans = [
  {
    id: 'free',
    name: 'Básico',
    price: 'Grátis',
    period: '',
    features: [
      'Até 4 membros',
      'Missões ilimitadas',
      'Histórico de 30 dias',
      'Notificações básicas',
    ],
    limitations: [
      'Sem relatórios avançados',
      'Sem backup na nuvem',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R$ 9,90',
    period: '/mês',
    popular: true,
    features: [
      'Membros ilimitados',
      'Missões ilimitadas',
      'Histórico completo',
      'Relatórios avançados',
      'Backup na nuvem',
      'Suporte prioritário',
      'Temas personalizados',
      'Sem anúncios',
    ],
  },
  {
    id: 'annual',
    name: 'Premium Anual',
    price: 'R$ 89,90',
    period: '/ano',
    discount: '25% OFF',
    features: [
      'Todos os benefícios Premium',
      'Economia de R$ 28,90',
      'Acesso antecipado a novidades',
    ],
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [isProcessing, setIsProcessing] = useState(false);
  const currentPlan = 'free'; // Simulated current plan

  const handleSubscribe = async (planId: string) => {
    if (planId === currentPlan) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    // Would redirect to payment gateway
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Header title="Assinatura" showBack />

      <main className="px-4 pb-8 space-y-6">
        {/* Current Plan Banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary-green to-primary-green/80">
            <CardContent className="text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Plano Atual</p>
                  <p className="text-xl font-bold">Básico</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">
                    workspace_premium
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plans */}
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
          >
            <Card 
              className={`relative overflow-hidden cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-primary-green' 
                  : 'hover:shadow-lg'
              } ${plan.id === currentPlan ? 'bg-gray-50' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-orange text-white text-xs px-3 py-1 rounded-bl-xl font-medium">
                  Popular
                </div>
              )}
              {plan.discount && (
                <div className="absolute top-0 right-0 bg-accent-progress text-white text-xs px-3 py-1 rounded-bl-xl font-medium">
                  {plan.discount}
                </div>
              )}
              
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-text-main text-lg">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary-orange">{plan.price}</span>
                      {plan.period && (
                        <span className="text-sm text-text-muted">{plan.period}</span>
                      )}
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? 'bg-primary-green border-primary-green'
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.id && (
                      <span className="material-symbols-outlined text-white text-sm">check</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-accent-progress text-lg">
                        check_circle
                      </span>
                      <span className="text-text-main">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations?.map((limitation) => (
                    <div key={limitation} className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-text-muted text-lg">
                        cancel
                      </span>
                      <span className="text-text-muted">{limitation}</span>
                    </div>
                  ))}
                </div>

                {plan.id === currentPlan && (
                  <Badge variant="default" className="mt-4">
                    Plano Atual
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Subscribe Button */}
        {selectedPlan !== currentPlan && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              className="w-full"
              onClick={() => handleSubscribe(selectedPlan)}
              isLoading={isProcessing}
            >
              Assinar {plans.find(p => p.id === selectedPlan)?.name}
            </Button>
          </motion.div>
        )}

        {/* Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="bg-gray-50">
            <CardContent className="text-center">
              <span className="material-symbols-outlined text-2xl text-text-muted mb-2">
                info
              </span>
              <p className="text-xs text-text-muted">
                Cancele a qualquer momento. Seus dados permanecem seguros mesmo 
                após o cancelamento.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Link */}
        <div className="text-center">
          <Link 
            href="/faq" 
            className="text-sm text-primary-green hover:underline"
          >
            Dúvidas sobre assinatura?
          </Link>
        </div>
      </main>
    </div>
  );
}
