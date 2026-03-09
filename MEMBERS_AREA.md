# Área de Membros - EndoStart Platform

## 📋 Visão Geral

A área de membros é uma seção protegida da plataforma onde alunos matriculados podem acessar cursos, visualizar aulas em PDF e acompanhar seu progresso.

**Status**: ✅ Implementado (sem vídeos por enquanto)

## 🎯 Funcionalidades Implementadas

### 1. **Autenticação**
- ✅ Página de Login (`/auth/signin`)
- ✅ Página de Registro (`/auth/signup`)
- ✅ Integração com Backend API
- ✅ Armazenamento de token JWT
- ✅ Logout com limpeza de dados

### 2. **Dashboard do Aluno**
- ✅ Listagem de cursos matriculados
- ✅ Exibição de progresso por curso
- ✅ Cards responsivos com animações
- ✅ Acesso rápido aos cursos

### 3. **Visualizador de Cursos**
- ✅ Estrutura de módulos e aulas
- ✅ Navegação lateral entre aulas
- ✅ Exibição de informações da aula
- ✅ Download de PDFs
- ✅ Marcação de aula como completa (skeleton)
- ✅ Sistema de anotações (skeleton)

### 4. **Perfil do Aluno**
- ✅ Visualização de dados pessoais
- ✅ Informações de CRM e contato
- ✅ Histórico de inscrição em cursos
- ✅ Opção de logout
- ✅ Link para alterar senha (skeleton)

### 5. **Painel Administrativo**
- ✅ Acesso restrito a admin (Dr. Alessandro)
- ✅ Listagem de todos os alunos
- ✅ Busca e filtragem de alunos
- ✅ Concessão/revogação de acesso
- ✅ Estatísticas de alunos
- ✅ Dashboard intuitivo

## 🗂️ Estrutura de Arquivos

```
src/
├── pages/
│   ├── auth/
│   │   ├── signin.tsx          # Login
│   │   └── signup.tsx          # Registro
│   ├── dashboard/
│   │   ├── index.tsx           # Dashboard principal
│   │   ├── profile.tsx         # Perfil do aluno
│   │   └── course/
│   │       └── [courseId].tsx  # Visualizador de curso
│   └── admin/
│       └── index.tsx           # Painel administrativo
├── hooks/
│   └── useAuth.ts              # Hook de autenticação
└── components/
    (reutilizáveis da landing page)
```

## 🎨 Identidade Visual

Toda a área de membros segue a identidade visual definida no `designer_manual.md`:

- **Cores Primárias**:
  - Azul: `#01284A` (brand-blue)
  - Ouro: `#B89A6A` (brand-gold)
  - Cinza: `#3C3C3C` / `#F3F5F8`

- **Tipografia**:
  - Títulos: Playfair Display (serif)
  - Corpo: Inter (sans-serif)

- **Componentes**:
  - Cards com hover effects
  - Botões gradientes
  - Animações suaves com Framer Motion
  - Responsividade Mobile-First

## 🔐 Sistema de Autenticação

### Flow de Login

```
1. User submits login form
   ↓
2. Frontend POST /api/auth/login (backend)
   ↓
3. Backend valida credenciais + gera JWT
   ↓
4. Frontend armazena token + user data em localStorage
   ↓
5. Redirect to /dashboard
```

### Token JWT

- **Armazenamento**: `localStorage.getItem('token')`
- **Expiração**: Configurável no backend (padrão 7 dias)
- **Uso**: Header `Authorization: Bearer <token>`

### Proteção de Rotas

```typescript
// Em cada página que precisa autenticação:
useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/auth/signin');
  }
}, [router]);
```

### Roles e Permissões

```typescript
// STUDENT - Acesso padrão
- /auth/signin ✓
- /auth/signup ✓
- /dashboard/* ✓
- /admin/* ✗

// ADMIN - Acesso total
- /auth/signin ✓
- /auth/signup ✓
- /dashboard/* ✓
- /admin/* ✓
```

## 📱 Responsividade

### Breakpoints

```css
Mobile:   < 768px
Tablet:   768px - 1024px
Desktop:  > 1024px
```

### Ajustes por Breakpoint

- **Mobile**: Stack vertical, font reduzidas, padding menor
- **Tablet**: 2-coluna grid, navegação otimizada
- **Desktop**: Layout completo, sidebar sticky

## 🔌 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo aluno
- `POST /api/auth/login` - Login

### Cursos
- `GET /api/students/courses` - Listar cursos do aluno
- `GET /api/courses/:courseId/modules` - Módulos e aulas de um curso

### Perfil
- `GET /api/students/profile` - Dados do aluno
- `PUT /api/students/profile` - Atualizar perfil

### Admin
- `GET /api/admin/students` - Listar todos os alunos
- `POST /api/admin/students/:id/grant` - Conceder acesso
- `POST /api/admin/students/:id/revoke` - Revogar acesso

## 🚀 Como Usar

### Acessar Dashboard

1. Ir para `http://localhost:3000/auth/signin`
2. Login com email e senha
3. Redirecionado para `/dashboard`

### Acessar Admin Panel

1. Login com conta de admin (role: ADMIN)
2. Ir para `http://localhost:3000/admin`
3. Gerenciar alunos

### Proteger uma Página Nova

```typescript
// pages/dashboard/minha-pagina.tsx
import { useAuth } from '@/hooks/useAuth';

export default function MinhaPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return null; // Redirect automático em useAuth

  return <div>Conteúdo protegido</div>;
}
```

## 🎬 Animações

Todas as páginas usam Framer Motion para:
- Fade-in suave ao carregar
- Slide-in de elementos
- Hover effects elegantes
- Transições de página

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Conteúdo
</motion.div>
```

## 📊 Dados Mockados

No momento, a plataforma espera dados do backend. Para desenvolvimento local:

1. **Backend rodando**: `npm run dev` em `/backend`
2. **Variáveis de ambiente**: Configurar `NEXT_PUBLIC_API_URL`
3. **Mock de dados**: Adicionar fake endpoints se necessário

## 🎨 Customização de Design

### Alterar Cores

Editar `tailwind.config.js`:

```javascript
colors: {
  brand: {
    blue: '#01284A',      // Azul primário
    gold: '#B89A6A',      // Ouro
    darkGray: '#3C3C3C',
    lightGray: '#F3F5F8',
  }
}
```

### Alterar Tipografia

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['"Playfair Display"', 'Georgia', 'serif'],
}
```

## 📝 Próximos Passos

### Fase 1 (Agora)
- ✅ Autenticação
- ✅ Dashboard
- ✅ Visualizador PDF (structure)
- ✅ Admin Panel

### Fase 2 (Próximo)
- ⏳ Implementar real PDF viewer (react-pdf)
- ⏳ Sistema de anotações
- ⏳ Marcação de aulas completas (progresso real)
- ⏳ Certificados

### Fase 3 (Futuro)
- ⏳ Integração com vídeos (Vimeo/YouTube)
- ⏳ Quizzes e avaliações
- ⏳ Comunidade/Forum
- ⏳ Sistema de certificação

## 🐛 Troubleshooting

### "Erro ao fazer login"
**Solução**: Verificar se backend está rodando em `http://localhost:3001`

### "Página em branco após login"
**Solução**: Verificar console do navegador para erros de autenticação

### "Admin panel retorna 404"
**Solução**: Verificar se usuário tem role `ADMIN` no banco de dados

### PDF não carrega
**Solução**: Será implementado em Fase 2 com react-pdf

## 📚 Referências

- **Design**: Ver `designer_manual.md` (seções específicas de Members Area)
- **Backend**: Ver documentação do Backend em `/backend`
- **Autenticação**: NextAuth v4 pattern em `src/hooks/useAuth.ts`

---

**Última atualização**: Março 2026
**Desenvolvido para**: Dr. Alessandro - EndoStart Platform
