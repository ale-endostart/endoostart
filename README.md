# EndoStart - Landing Page

Plataforma digital para a Imersão em Endoscopia do Dr. Alessandro. Uma landing page premium com foco em conversão e ROI.

## Visão Geral

EndoStart é um ecossistema digital para captura de leads médicos de alto ticket (R$ 45k+) e entrega de conteúdo didático. Este repositório contém a landing page pública focada em conversão e educação do público.

## Stack Tecnológico

- **Frontend**: Next.js 14 + React 18
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + CSS Global
- **Hospedagem**: Vercel (recomendado)
- **Analytics**: Google Tag Manager + Meta Pixel

## Seções da Landing Page

1. **Hero Section** - Headline e CTA principal com imagem/vídeo do Dr. Alessandro
2. **ROI Calculator** - Widget interativo de cálculo de faturamento
3. **Course Showcase** - Vitrine dos 4 cursos disponíveis
4. **Curriculum** - Grade curricular técnica com módulos
5. **Testimonials** - Carrossel de depoimentos e bio do Dr. Alessandro
6. **Benefits Section** - Diferenciais e tabela comparativa
7. **FAQ** - Perguntas frequentes
8. **Footer** - Rodapé com links e botão flutuante de WhatsApp

## Setup Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e atualize com seus dados:

```bash
cp .env.example .env.local
```

Atualize os valores:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - Número do WhatsApp para contato
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - ID do Google Analytics
- Outras variáveis conforme necessário

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000

## Estrutura de Pastas

```
/c/TurboOps/Code/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ROICalculator.tsx
│   │   ├── CoursesShowcase.tsx
│   │   ├── CurriculumSection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── pages/               # Páginas Next.js
│   │   ├── index.tsx        # Página principal
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   ├── styles/              # Estilos globais
│   │   └── globals.css
│   └── utils/               # Funções utilitárias
│       ├── constants.ts     # Constantes do projeto
│       ├── whatsapp.ts      # Funções WhatsApp
│       ├── seo.ts           # SEO helpers
│       ├── analytics.ts     # Analytics tracking
│       └── formatting.ts    # Funções de formatação
├── public/                  # Arquivos estáticos (imagens, etc)
├── config/                  # Configurações do projeto
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Componentes Principais

### Header
- Navegação sticky com links internos
- CTA de WhatsApp em destaque
- Menu mobile responsivo

### HeroSection
- Headline principal "Abandone o plantão de 12h"
- Sub-headline com value proposition
- Botões de CTA (WhatsApp e "Saiba Mais")
- Placeholder para imagem/vídeo do Dr. Alessandro
- Cards com estatísticas

### ROICalculator
- Slider interativo para entrada de exames/semana
- Cálculo automático de faturamento mensal
- Comparação com salário de plantão
- Demonstração de ROI

### CoursesShowcase
- Grid de 4 cursos (Endoscopia, Colonoscopia, Balão, Terapêutica)
- Cards com descrição, módulos e duração
- CTA individual por curso
- Sumário de valor

### CurriculumSection
- Accordion com 4 módulos técnicos
- DRGE, Tumores Gástricos, Hemorragias, Afecções Anorretais
- Carga horária total: 54h
- Tópicos detalhados por módulo

### Testimonials
- Carrossel de 4 depoimentos
- Navegação com setas e dots
- Seção "Quem é o Dr. Alessandro"
- Credenciais e diferencial

### BenefitsSection
- Grid de 6 benefícios
- Tabela comparativa (EndoStart vs Residência)
- CTA de conversão

### FAQ
- 8 perguntas frequentes em accordion
- Quebra de objeções
- CTA para contato

### Footer
- Links de navegação
- Redes sociais
- Informações de contato
- Botão flutuante de WhatsApp

## Componentes Utilitários

### Constantes (`utils/constants.ts`)
- Informações de contato
- Dados dos cursos
- Configuração do ROI calculator
- Informações do Dr. Alessandro
- Templates de mensagens WhatsApp

### WhatsApp (`utils/whatsapp.ts`)
- `generateWhatsAppURL()` - Gera URL com mensagem pré-preenchida
- `openWhatsApp()` - Abre WhatsApp em nova aba
- `sendWhatsAppForCourse()` - Envia mensagem para curso específico
- `trackWhatsAppClick()` - Rastreia cliques de conversão

### Analytics (`utils/analytics.ts`)
- `trackEvent()` - Rastreia eventos genéricos
- `trackCTAClick()` - Rastreia cliques de CTA
- `trackCalculatorInteraction()` - Rastreia uso do calculador
- `trackCourseInterest()` - Rastreia interesse em cursos

### Formatting (`utils/formatting.ts`)
- `formatCurrency()` - Formata números como moeda BRL
- `formatPhoneNumber()` - Formata telefone
- `truncateText()` - Trunca textos longos
- `generateSlug()` - Gera slugs de URLs

### SEO (`utils/seo.ts`)
- `generateMetaTags()` - Gera meta tags para SEO
- `getOrganizationSchema()` - Structured data de organização
- `getCourseSchema()` - Structured data de cursos

## Design System

### Paleta de Cores
- **Primary**: Azul (Médico profissional)
  - 600: `#0284c7` (Main)
  - 700: `#0369a1` (Hover)

- **Success**: Verde (Confirmação/Check)
  - 500: `#22c55e`
  - 600: `#16a34a`

- **Neutral**: Cinza (Backgrounds/Textos)
  - 50 a 900 (Escala completa)

### Tipografia
- Font: Inter (system-ui fallback)
- H1: 3rem, 700 weight
- H2: 2.25rem, 700 weight
- H3: 1.5rem, 600 weight
- Body: 1rem, 400 weight

### Espaçamentos
- `section-padding`: `py-16 md:py-24 lg:py-32`
- `container`: Max-width 80rem com padding responsivo

### Animações
- `fade-in`: Entrada com opacidade (0.6s)
- `slide-up`: Entrada com movimento vertical (0.6s)
- `pulse`: Pulso contínuo para elementos interativos

## Responsividade

Layout **mobile-first** otimizado para médicos consultarem entre atendimentos:

- **Mobile (< 768px)**: Stack vertical, fonte menor, spacing reduzido
- **Tablet (768px - 1024px)**: Grid 2 colunas, transição de tamanhos
- **Desktop (> 1024px)**: Layout completo, animações

## WhatsApp Integration

Todos os CTAs de WhatsApp usam:
- URL pattern: `https://wa.me/{PHONE}?text={MESSAGE}`
- Mensagens pré-preenchidas por contexto
- Rastreamento de cliques para analytics

### Templates de Mensagem

```typescript
// Default
"Olá! Sou médico e gostaria de saber mais sobre a Imersão"

// Por Curso
"Olá! Sou médico e gostaria de saber mais sobre a Imersão em [Course]"

// Por Módulo
"Olá! Sou médico e gostaria de saber mais sobre o módulo [Module]"
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de dev (port 3000)

# Build
npm run build           # Compila para produção
npm run start           # Inicia servidor de produção

# Quality
npm run lint            # Executa ESLint
npm run type-check      # Verifica tipos TypeScript
```

## Performance

- **Otimizações implementadas**:
  - Next.js Image Optimization
  - Code Splitting automático
  - CSS Purging (Tailwind)
  - Font loading otimizado
  - Lazy loading de imagens

- **Meta alvo**: Google PageSpeed > 90 (Mobile)

## Analytics & Tracking

### Google Tag Manager
- Instalado via `_document.tsx`
- ID: Definir em `.env.local`

### Meta Pixel
- Preparado para integração
- ID: Definir em `.env.local`

### Eventos Rastreados
- `page_view`: Visualização de página
- `cta_click`: Cliques em CTAs
- `calculator_interaction`: Uso do calculador
- `course_interest`: Interesse em cursos
- `conversion`: Ações de conversão

## SEO

- Meta tags obrigatórias configuradas
- Structured Data (Schema.org) pronto
- Sitemap automático (Next.js)
- robots.txt configurado
- Open Graph tags para redes sociais

## Segurança

- HTTPS obrigatório
- CSP headers configurados
- XSS protection (React/Next.js built-in)
- CSRF tokens para formulários (quando implementados)

## Próximos Passos

1. **Mídia do Dr. Alessandro**
   - Substituir placeholders de imagem/vídeo
   - Otimizar mídia para web

2. **Customização de Contato**
   - Atualizar número WhatsApp
   - Configurar email de contato
   - Adicionar formulário de contato

3. **Analytics**
   - Configurar Google Tag Manager ID
   - Configurar Meta Pixel ID
   - Testar eventos de rastreamento

4. **Conteúdo**
   - Atualizar depoimentos com reais
   - Adicionar casos de sucesso reais
   - Customizar copy conforme necessário

5. **Hospedagem**
   - Deploy em Vercel
   - Configurar domínio custom
   - Setup de SSL/HTTPS

6. **Integração Backend** (Fase 2)
   - API de contatos
   - CMS para conteúdo dinâmico
   - Sistema de leads

## Desenvolvimento

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Build para Produção
```bash
npm run build
npm run start
```

## Troubleshooting

### Problema: Componentes não carregam
**Solução**: Limpe cache e reinstale dependências
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Problema: Estilos não aplicam
**Solução**: Verifique imports de CSS e configuração Tailwind
```bash
npm run lint
```

### Problema: WhatsApp não abre
**Solução**: Verifique número de telefone em `.env.local`

## Contato & Suporte

- Email: contato@endostart.com.br
- WhatsApp: Configurar em variáveis de ambiente
- Documentação: Ver CLAUDE.md para mais contexto

## License

Propriedade de EndoStart © 2024

---

**Última atualização**: Fevereiro 2024
**Versão**: 1.0.0
