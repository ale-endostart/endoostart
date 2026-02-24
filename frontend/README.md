# EndoStart Web Frontend

Frontend para a plataforma EndoStart construído com Next.js 14, React 18 e TypeScript.

## 🚀 Início Rápido

```bash
# Install
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local com URLs e credenciais

# Development
npm run dev
# http://localhost:3000
```

## 📦 Tecnologias

- **Next.js 14**: React framework com App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **NextAuth.js 5**: Autenticação
- **Zustand**: State management
- **React Hook Form**: Forms
- **Zod**: Validation
- **Axios**: HTTP client
- **react-pdf**: PDF viewer

## 📁 Estrutura

```
src/
├── app/                 # Pages (Next.js App Router)
│   ├── page.tsx        # Landing page
│   ├── layout.tsx      # Root layout
│   ├── api/            # API routes
│   │   └── auth/[...nextauth]/route.ts
│   ├── (landing)/      # Landing group
│   └── (members)/      # Protected members area
├── components/          # React components
│   ├── landing/        # Landing page components
│   ├── members/        # Members area components
│   ├── common/         # Reusable components
│   └── auth/           # Auth components
├── hooks/              # Custom hooks
│   ├── useAuth.ts
│   └── useCourses.ts
├── lib/                # Utilities
│   ├── auth.ts         # NextAuth config
│   ├── api.ts          # API client
│   └── validators.ts   # Zod schemas
├── types/              # TypeScript types
└── styles/             # CSS global
```

## 🎨 Design

- **Color Palette**: Azul (primário) + Verde (accent) + Neutro
- **Typography**: Inter (sans) + Merriweather (serif)
- **Responsivo**: Mobile-first, otimizado para médicos em movimento
- **Animações**: Suaves e performáticas

## 🔐 Autenticação

Usa NextAuth.js com suporte a:
- Email/senha
- Google OAuth 2.0
- Sessions JWT

## 🌍 Páginas

- `/` - Landing page (hero + cursos + depoimentos)
- `/auth/signin` - Login
- `/dashboard` - Portal de membros (protegido)
- `/dashboard/[courseId]` - Detalhes do curso
- `/profile` - Perfil do aluno

## 🚀 Build & Deploy

```bash
# Build
npm run build

# Test build localmente
npm start
```

Deploy automático em Vercel quando pushar para `main`.

## 🧪 Testing

```bash
npm run test
npm run test:watch
npm run test:cov
```

## 📊 Performance

- Google Lighthouse > 90
- Code splitting automático
- Image optimization
- CSS purging com Tailwind

## 🔍 SEO

- Meta tags no layout
- Open Graph para social sharing
- Structured data (JSON-LD)
- Sitemap e robots.txt

---

Ver `../CLAUDE.md` para arquitetura completa.
