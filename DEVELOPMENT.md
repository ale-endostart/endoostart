# Guia de Desenvolvimento - EndoStart

## Setup Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local

# 3. Iniciar desenvolvimento
npm run dev

# Acesso: http://localhost:3000
```

## Estrutura de Arquivos

### Pages (`src/pages/`)
- `index.tsx` - Landing page principal (integra todos os componentes)
- `_app.tsx` - App wrapper (estilos globais)
- `_document.tsx` - HTML wrapper (meta tags, fontes)

### Components (`src/components/`)
Componentes reutilizáveis e modulares:

#### 1. Header.tsx
- Navegação sticky
- Menu mobile responsivo
- Logo e branding
- CTA de WhatsApp

**Props**:
```typescript
interface HeaderProps {
  onWhatsAppClick?: () => void;
}
```

#### 2. HeroSection.tsx
- Headline principal
- Sub-headline
- CTAs primários
- Placeholder de mídia
- Estatísticas

**Props**:
```typescript
interface HeroSectionProps {
  onWhatsAppClick: () => void;
}
```

#### 3. ROICalculator.tsx
- Slider interativo (1-20 exames/semana)
- Cálculo automático
- Comparação visual
- Benefícios adicionais

**State**:
```typescript
const [examsPerWeek, setExamsPerWeek] = useState(8);
```

#### 4. CoursesShowcase.tsx
- Grid de 4 cursos
- Cards com gradientes
- Módulos inclusos
- Duração
- CTA por curso

**Data Structure**:
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  modules: string[];
  duration: string;
  color: string;
  icon: string;
}
```

#### 5. CurriculumSection.tsx
- Accordion com 4 módulos
- Tópicos detalhados
- Horas de carga
- Expansão animada

**Module Data**:
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  topics: string[];
  hours: string;
}
```

#### 6. Testimonials.tsx
- Carrossel com 4 depoimentos
- Navegação (setas + dots)
- Seção do Dr. Alessandro
- Credenciais

**Testimonial Data**:
```typescript
interface Testimonial {
  id: string;
  name: string;
  specialty: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
}
```

#### 7. BenefitsSection.tsx
- Grid de 6 benefícios
- Tabela comparativa
- CTA de conversão

**Benefit Data**:
```typescript
interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}
```

#### 8. FAQ.tsx
- Accordion com 8 FAQs
- Animação de expansão
- CTA de contato

**FAQ Data**:
```typescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
```

#### 9. Footer.tsx
- Links de navegação
- Redes sociais
- Informações de contato
- Botão flutuante de WhatsApp

## Customização

### Adicionar Novo Componente

1. Criar arquivo em `src/components/MeuComponente.tsx`:
```typescript
import React from 'react';

interface MeuComponenteProps {
  // Props aqui
}

export const MeuComponente: React.FC<MeuComponenteProps> = (props) => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Conteúdo */}
      </div>
    </section>
  );
};

export default MeuComponente;
```

2. Importar em `src/pages/index.tsx`:
```typescript
import MeuComponente from '../components/MeuComponente';

// Na estrutura da página:
<MeuComponente />
```

### Alterar Cores

1. Editar `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#0284c7', // Mudar para sua cor
    700: '#0369a1',
    // ...
  }
}
```

2. Usar classes Tailwind nos componentes:
```typescript
<div className="bg-primary-600 text-white">
```

### Adicionar Seção Nova

1. Criar componente:
```bash
touch src/components/MinhaSecao.tsx
```

2. Estrutura padrão:
```typescript
export const MinhaSecao: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
            Título <span className="gradient-text">Principal</span>
          </h2>
          <p className="text-xl text-neutral-600 mt-4">
            Descrição da seção
          </p>
        </div>

        {/* Conteúdo */}
      </div>
    </section>
  );
};
```

3. Importar e adicionar em `index.tsx`:
```typescript
import MinhaSecao from '../components/MinhaSecao';

<MinhaSecao />
```

## Integração de Mídia

### Imagens

1. **Placeholder Temporário**:
```typescript
<div className="w-full h-96 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg">
  <div className="flex items-center justify-center h-full">
    <p className="text-white">Imagem do Dr. Alessandro</p>
  </div>
</div>
```

2. **Com Next.js Image** (quando tiver URL real):
```typescript
import Image from 'next/image';

<Image
  src="/images/dr-alessandro.jpg"
  alt="Dr. Alessandro"
  width={400}
  height={500}
  priority
/>
```

### Vídeos

Para vídeo em Hero (quando tiver):
```typescript
<video autoPlay muted loop playsInline>
  <source src="/videos/dr-alessandro.mp4" type="video/mp4" />
</video>
```

## WhatsApp Integration

### Usar em Componente

```typescript
import { sendWhatsAppForCourse, trackWhatsAppClick } from '../utils/whatsapp';

<button
  onClick={() => {
    sendWhatsAppForCourse('Endoscopia');
    trackWhatsAppClick('course_cta', { course: 'Endoscopia' });
  }}
  className="btn-whatsapp"
>
  Quero Saber Mais
</button>
```

### Customizar Número

Editar `src/utils/constants.ts`:
```typescript
export const CONTACT = {
  whatsapp: '+55 11 12345-6789',
  whatsappNumber: '551112345678',
  // ...
};
```

## Analytics

### Rastrear Evento

```typescript
import { trackEvent, trackCTAClick } from '../utils/analytics';

<button
  onClick={() => {
    trackCTAClick('hero_cta', 'whatsapp');
    // Fazer ação
  }}
>
  Clique aqui
</button>
```

### Eventos Padrão

- `cta_click` - Clique em CTA
- `course_interest` - Interesse em curso
- `calculator_interaction` - Uso do calculador
- `scroll_depth` - Profundidade de scroll
- `testimonial_view` - Visualização de depoimento

## Responsividade

### Breakpoints Tailwind

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Exemplo de Layout Responsivo

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 coluna mobile, 2 tablet, 4 desktop */}
</div>
```

### Tipografia Responsiva

```typescript
<h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  {/* Tamanho varia por breakpoint */}
</h2>
```

## Animações

### Classes Disponíveis

```css
.fade-in      /* Fade com opacidade */
.slide-up     /* Entrada de baixo para cima */
.pulse-slow   /* Pulso lento contínuo */
```

### Aplicar em Componente

```typescript
<div className="animate-fadeIn">
  {/* Fade in ao carregar */}
</div>

<div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
  {/* Slide up com delay */}
</div>
```

## Performance

### Otimizações Aplicadas

1. **Code Splitting**: Next.js automático por página
2. **Lazy Loading**: Imagens do navegador
3. **CSS Purging**: Tailwind remove CSS não usado
4. **Font Loading**: Inter com `display=swap`
5. **Image Optimization**: Next.js Image component

### Checker Performance

```bash
# Build e analise
npm run build
npm run start

# Abrir em http://localhost:3000
# Usar Chrome DevTools > Lighthouse
```

## SEO Best Practices

1. **Meta Tags**: Definidas em `_document.tsx`
2. **Structured Data**: Em `utils/seo.ts`
3. **URLs Amigáveis**: IDs em seções com `id="secao"`
4. **Images Alt Text**: Sempre incluir `alt="`
5. **Links Internos**: Usar `<a href="#secao">` para scroll suave

## Debugging

### Logs no Navegador

```typescript
console.log('Debug info:', variable);
```

### React DevTools

1. Instalar extensão Chrome
2. Inspecionar componentes
3. Ver props e state

### Network Tab

1. Abrir DevTools > Network
2. Verificar requisições
3. Ver tamanho de assets

## Build & Deploy

### Build Local

```bash
npm run build
npm run start
```

### Problemas Comuns

1. **Erro de tipo TypeScript**:
```bash
npm run type-check
```

2. **Erro de linting**:
```bash
npm run lint -- --fix
```

3. **Cache**:
```bash
rm -rf .next
npm run build
```

## Variáveis de Ambiente

### Obrigatórias
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - Número WhatsApp

### Recomendadas
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - Google Analytics
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` - Google Tag Manager
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel

### Adicionar Nova

1. Definir em `.env.local`:
```
NEXT_PUBLIC_MINHA_VAR=valor
```

2. Usar no código:
```typescript
const valor = process.env.NEXT_PUBLIC_MINHA_VAR;
```

## Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Checklist Antes de Deploy

- [ ] Número WhatsApp atualizado
- [ ] Imagens/vídeo do Dr. Alessandro adicionados
- [ ] Depoimentos atualizados com reais
- [ ] Google Analytics configurado
- [ ] Meta Pixel configurado
- [ ] Domínio custom configurado
- [ ] SSL/HTTPS ativo
- [ ] Google PageSpeed > 90
- [ ] Mobile responsiveness testada
- [ ] WhatsApp cliques rastreados

## Suporte

Para dúvidas:
1. Consultar documentação no README.md
2. Verificar CLAUDE.md para contexto
3. Checar exemplos nos componentes
4. Consultar documentação das bibliotecas

---

**Versão**: 1.0.0
**Última atualização**: Fevereiro 2024
