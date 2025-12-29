# Family Nest 🪺

Um aplicativo móvel para ajudar famílias a organizarem as tarefas domésticas de forma colaborativa e divertida.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Firebase** - Backend (Auth, Firestore, Storage)
- **Framer Motion** - Animações
- **Zustand** - Gerenciamento de estado
- **PWA** - Progressive Web App para mobile

## 📱 Funcionalidades

- ✅ Sistema de login/cadastro com email e redes sociais
- ✅ Criação e gerenciamento de "Ninhos" (famílias)
- ✅ Missões/Tarefas com sistema de XP
- ✅ Perfis dos membros da família
- ✅ Dashboard de atividades
- ✅ Sistema de gamificação com níveis
- ✅ Notificações inteligentes
- ✅ Histórico de missões
- ✅ Evolução do ninho

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Adicione suas credenciais do Firebase no `.env.local`

5. Execute o projeto:
```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Páginas de autenticação
│   ├── (main)/            # Páginas principais do app
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizáveis
│   └── features/         # Componentes de features
├── lib/                   # Utilitários e configurações
│   ├── firebase/         # Configuração Firebase
│   └── utils/            # Funções utilitárias
├── hooks/                 # Custom hooks
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── styles/               # Estilos globais
```

## 🎨 Design System

- **Cores**: Paleta quente com verde sage, laranja e tons terrosos
- **Tipografia**: Spline Sans, Plus Jakarta Sans, Noto Sans
- **Ícones**: Material Symbols Outlined
- **Border Radius**: Sistema de bordas arredondadas (2xl a 6xl)

## 📄 Licença

Este projeto está sob a licença MIT.
