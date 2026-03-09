# 🔍 AUDIT DO PROJETO - O que manter, o que deletar

## 📊 Status Atual

Você tem **TWO SECTIONS** no projeto que precisam ser alinhadas:

### ✅ LANDING PAGE (ATIVA)
- Status: **FUNCIONAL E COMPLETA**
- Localização: `src/pages/index.tsx`
- Componentes: 32 components (todos da landing)
- Serve: `http://localhost:3000/`

### ✅ MEMBROS (NOVA - CRIADA AGORA)
- Status: **ESTRUTURA PRONTA, NÃO TESTADA**
- Localização: `src/pages/auth/*`, `src/pages/dashboard/*`, `src/pages/admin/*`
- Serve: `http://localhost:3000/auth/signin`, `/dashboard/*`, `/admin`

---

## 🗑️ DOCUMENTAÇÃO ANTIGA (DELETAR)

| Arquivo | Motivo | Ação |
|---------|--------|------|
| `DEVELOPMENT.md` | Genérico, desatualizado | ❌ DELETAR |
| `FILE_INDEX.md` | Lista desatualizada | ❌ DELETAR |
| `PROJECT_SUMMARY.md` | Antigo, redundante | ❌ DELETAR |
| `QUICKSTART.md` | Minimal, substituído | ❌ DELETAR |
| `RODAR_AGORA.md` | Outdated instructions | ❌ DELETAR |
| `SETUP_LOCAL.md` | Com Docker (não está usando) | ❌ DELETAR |
| `SETUP_LOCAL_NO_DOCKER.md` | Antigo, ineficaz | ❌ DELETAR |

**Total a deletar**: 7 arquivos

---

## ✅ DOCUMENTAÇÃO A MANTER

| Arquivo | Propósito | Status |
|---------|-----------|--------|
| `CLAUDE.md` | Instruções do projeto | ✅ MANTER (ref principal) |
| `DEPLOYMENT.md` | Deploy em produção | ✅ MANTER (Vercel, AWS, Railway) |
| `designer_manual.md` | Design completo (1190 linhas!) | ✅ MANTER (bible do design) |
| `README.md` | Overview geral | ✅ MANTER (resumo) |
| `MEMBERS_AREA.md` | Docs da área de membros (NOVO) | ✅ MANTER |
| `SETUP_TESTING.md` | Como testar tudo (NOVO) | ✅ MANTER |

---

## 🏗️ ESTRUTURA DE ARQUIVOS

### ✅ `src/pages/` - ESTÁ CORRETO

```
src/pages/
├── index.tsx                    ✅ LANDING PAGE (mantém tudo)
├── _app.tsx                     ✅ App wrapper
├── _document.tsx                ✅ HTML document
├── auth/
│   ├── signin.tsx              ✅ NOVO - Login
│   └── signup.tsx              ✅ NOVO - Registro
├── dashboard/
│   ├── index.tsx               ✅ NOVO - Dashboard alunos
│   ├── profile.tsx             ✅ NOVO - Perfil aluno
│   └── course/
│       └── [courseId].tsx      ✅ NOVO - Visualizador
└── admin/
    └── index.tsx               ✅ NOVO - Painel admin
```

---

## 🎯 COMPONENTES - STATUS

### Landing Page Components (32 total)
**Status**: ✅ Todos em uso
```
src/components/
├── HeroSection.tsx             ✅ Landing
├── AuthoritySection.tsx         ✅ Landing
├── RealitySection.tsx           ✅ Landing
├── TwoPathsSection.tsx          ✅ Landing
├── OpportunitySection.tsx       ✅ Landing
├── EndoStartSection.tsx         ✅ Landing
├── StructureSection.tsx         ✅ Landing
├── DifferentialsSection.tsx     ✅ Landing
├── InstructorsSection.tsx       ✅ Landing
├── TargetAudienceSection.tsx    ✅ Landing
├── FAQSection.tsx               ✅ Landing
├── ScarcitySection.tsx          ✅ Landing
├── CtaFinalSection.tsx          ✅ Landing
├── Header.tsx                   ✅ Landing
├── Footer.tsx                   ✅ Landing
├── FloatingWhatsApp.tsx         ✅ Landing
│
├── AboutEndoStartSection.tsx    ❓ Verificar uso
├── BenefitsSection.tsx          ❓ Verificar uso
├── CoursesShowcase.tsx          ❓ Verificar uso
├── CurriculumSection.tsx        ❓ Verificar uso
├── EnrollmentSection.tsx        ❓ Verificar uso
├── HowItWorksSection.tsx        ❓ Verificar uso
├── WhyEndoscopySection.tsx      ❓ Verificar uso
├── TwoTypesSection.tsx          ❓ Verificar uso
├── Testimonials.tsx             ❓ Verificar uso
├── FAQ.tsx                      ❓ Duplicado? (tem FAQSection.tsx)
├── ROICalculator.tsx            ✅ Está no index.tsx?
├── CustomCursor.tsx             ✅ Em _app.tsx
├── ParticleNetwork.tsx          ❓ Verificar uso
│
└── ui/
    ├── CountUp.tsx              ❓ Verificar uso
    ├── MagneticWrapper.tsx       ✅ Usado em Header
    └── SplitText.tsx             ❓ Verificar uso
```

---

## 🪝 HOOKS - STATUS

| Hook | Criado | Uso | Status |
|------|--------|-----|--------|
| `useAuth.ts` | NOVO | Proteção de rotas (membros) | ✅ NOVO |
| `useParallax.ts` | Antigo | Landing (parallax) | ❓ Verificar |
| `useScrollReveal.ts` | Antigo | Landing (reveal) | ❓ Verificar |

---

## 🛠️ UTILS - STATUS

| Arquivo | Uso | Status |
|---------|-----|--------|
| `analytics.ts` | Meta Pixel, GTM | ✅ MANTER |
| `constants.ts` | Dados gerais | ✅ MANTER |
| `formatting.ts` | Formatação de dados | ✅ MANTER |
| `seo.ts` | Meta tags | ✅ MANTER |
| `whatsapp.ts` | Links WhatsApp | ✅ MANTER |

---

## 📦 PACKAGE.JSON - VERIFICAR

**Frontend dependencies**:
- `next` ✅
- `react` ✅
- `framer-motion` ✅
- `tailwindcss` ✅
- `lucide-react` ✅
- `clsx` ✅

**Possíveis adições futuras** (NÃO instalar agora):
- `react-pdf` - Para visualizar PDFs
- `axios` - HTTP client (opcional)

---

## 🔌 BACKEND

**Status**: Existe em `/backend`
**Rodando em**: `http://localhost:3001`
**Banco**: SQLite (`dev.db`)
**Seed**: Criada com 1 Admin + 1 Student

**Estrutura**:
```
backend/
├── src/
│   ├── auth/       ✅ Login, Register, OAuth
│   ├── courses/    ✅ Cursos
│   ├── students/   ✅ Perfil aluno
│   ├── content/    ✅ PDFs, Downloads
│   ├── admin/      ✅ Gerenciar alunos
│   ├── analytics/  ✅ Eventos
│   └── common/     ✅ Middleware, JWT
├── prisma/
│   ├── schema.prisma  ✅ Banco de dados
│   └── seed.ts        ✅ Dados de teste
└── .env            ✅ Variáveis (criar)
```

---

## ⚙️ CONFIGURAÇÃO

### `tailwind.config.js` ✅ CORRETO
- Cores brand definidas
- Custom animations
- Responsive breakpoints

### `next.config.js` ✅ PRECISA VERIFICAR
- Image optimization
- Build settings

### `.eslintrc.json` ✅ Básico

---

## 🚨 PROBLEMAS IDENTIFICADOS

### 1. **Ambiguidade de componentes**
```
❓ FAQ.tsx vs FAQSection.tsx
   → Qual está sendo usado?
   → Um provavelmente é duplicado
```

### 2. **Componentes não verificados**
```
❓ AboutEndoStartSection
❓ BenefitsSection
❓ CoursesShowcase
❓ CurriculumSection
❓ EnrollmentSection
❓ HowItWorksSection
❓ WhyEndoscopySection
❓ TwoTypesSection
❓ Testimonials
❓ ParticleNetwork
   → Estão sendo importados em index.tsx?
   → Se não, deletar
```

### 3. **Documentação redundante**
```
❌ 7 arquivos .md antigos conflitando com novos
   → Causa confusão sobre qual seguir
```

### 4. **Separação Landing vs Membros**
```
Landing page: ✅ Componentes separados, clean
Membros:      ✅ Páginas separadas, clean
Compartilhado: Header.tsx, Footer.tsx, estilos (OK)
```

---

## 🧹 PLANO DE LIMPEZA

### Fase 1: Deletar Documentação Antiga (5 min)
```bash
rm DEVELOPMENT.md
rm FILE_INDEX.md
rm PROJECT_SUMMARY.md
rm QUICKSTART.md
rm RODAR_AGORA.md
rm SETUP_LOCAL.md
rm SETUP_LOCAL_NO_DOCKER.md
```

### Fase 2: Verificar Componentes (10 min)
1. Abrir `src/pages/index.tsx`
2. Ver todos os imports
3. Deletar componentes NÃO importados
4. Consolidar FAQ (manter só 1)

### Fase 3: Validar Hooks (5 min)
1. Verificar se `useParallax` e `useScrollReveal` estão em uso
2. Se não, deletar

### Fase 4: Teste Completo (15 min)
1. Terminal 1: Backend
2. Terminal 2: Frontend
3. Testar: Landing → Login → Dashboard → Admin

---

## 📋 CHECKLIST PÓS-LIMPEZA

### Frontend
- [ ] Deletar 7 arquivos .md antigos
- [ ] Validar componentes não usados
- [ ] Consolidar FAQ (1 arquivo só)
- [ ] Testar landing page completa
- [ ] Testar login aluno
- [ ] Testar admin panel

### Backend
- [ ] .env configurado
- [ ] Seed rodou com sucesso
- [ ] API respondendo em :3001

### Documentação
- [ ] CLAUDE.md (ref principal)
- [ ] MEMBERS_AREA.md (novos features)
- [ ] SETUP_TESTING.md (como testar)
- [ ] DEPLOYMENT.md (produção)
- [ ] designer_manual.md (design)
- [ ] README.md (overview)

---

## ✅ RESULTADO FINAL

### Estrutura Limpa:
```
projeto/
├── .md files (6)
│   ├── CLAUDE.md
│   ├── DEPLOYMENT.md
│   ├── MEMBERS_AREA.md
│   ├── SETUP_TESTING.md
│   ├── designer_manual.md
│   └── README.md
│
├── src/pages/
│   ├── index.tsx (Landing)
│   ├── auth/* (Membros)
│   ├── dashboard/* (Membros)
│   ├── admin/* (Membros)
│   └── _app.tsx, _document.tsx
│
├── src/components/
│   └── (32 componentes landing + hooks)
│
└── backend/
    └── (API completa)
```

### Sem:
- ❌ 7 .md antigos
- ❌ Componentes não usados
- ❌ Duplicatas (FAQ)
- ❌ Confusão de versões

---

**Quer que eu execute a limpeza? Vou deletar os 7 .md antigos e consolidar tudo.**
