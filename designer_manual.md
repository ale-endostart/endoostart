PRD DE DESIGN E UX | ENDOSTART
ANÁLISE ESTRATÉGICA INICIAL
Analisando a copy, o manual de marca e a hero section proposta, vejo uma oportunidade premium de criar uma experiência que comunique segurança, expertise e transformação de carreira. O tom é direto e persuasivo — exatamente o que funciona em conversão premium.

Vou estruturar um PRD detalhado e completo que eleva o padrão visual para o nível Apple/Rolex.

🎯 FILOSOFIA DE DESIGN
Conceito: "Precisão em Movimento"

A endoscopia exige precisão. Sua marca também deve respirar essa sensação de domínio técnico aliado a elegância. Design minimalista, transições suaves, espaçamento respiratório, tipografia sofisticada.

Princípios:

✅ Confiança através da clareza
✅ Premium através da subtração
✅ Conversão através da narrativa visual
✅ Movimento como educador (não distração)
📐 DOCUMENTO DE DESIGN COMPLETO
1. ARQUITETURA VISUAL & GRID
Grid System
Desktop: 12 colunas | 1440px viewport
Tablet: 8 colunas | 768px viewport
Mobile: 4 colunas | 375px viewport
Gutter: 24px (desktop) | 16px (mobile)
Margin externa: 40px (desktop) | 20px (mobile)
Espaçamento Vertical (Rhythm)
Base unit: 8px
Escala: 8, 16, 24, 32, 40, 48, 56, 64, 80, 96px
Seções: 120px (desktop) | 80px (mobile)

Aplicação: O manual da marca recomenda "área de respiro" — usaremos espaçamento generoso como elemento de design premium.

2. PALETA DE CORES (Conforme Manual)
Cores Primárias
Cor	Uso	HEX	RGB	CMYK
Azul ENDO	Institucional, headers, CTAs principais	#01284A	1, 40, 74	99, 46, 0, 71
Dourado Suave	Acentos, destaques premium	#B89A6A	184, 154, 106	0, 16, 42, 28
Branco	Base, backgrounds clean	#FFFFFF	255, 255, 255	0, 0, 0, 0
Cores Secundárias
Cor	Uso	HEX
Cinza Profissional	Textos corpo	#3C3C3C
Cinza Suave	Backgrounds secundários	#F3F5F8
Azul Claro Clínico	Ícones, divisores, dados	#4A7CA8
Aplicações Específicas por Contexto
Fundos escuros: Logo em branco, textos em branco/cinza suave
Fundos claros: Azul ENDO para tipografia forte, Dourado para acentos
CTAs: Dourado Suave sobre Azul ENDO (contraste 6.2:1 — WCAG AAA)
Hover states: Dourado + 20% mais escuro = #9A7A4A
3. TIPOGRAFIA PREMIUM
Hierarquia Tipográfica
H1 — Títulos Principais (Playfair Display)
Desktop: 56–64px | Weight: 700 (Bold)
Mobile: 36–44px | Weight: 700
Line-height: 1.2
Letter-spacing: -0.02em (tightening premium)
Uso: Hero principal, títulos de seção
Cor: Azul ENDO (#01284A) ou Branco (sobre escuro)
Exemplo: "Enquanto alguns médicos vivem de plantão…"

H2 — Subtítulos Principais (Playfair Display)
Desktop: 40–48px | Weight: 700
Mobile: 28–32px | Weight: 700
Line-height: 1.3
Uso: Subtítulos, chamadas secundárias
Cor: Azul ENDO com Dourado em palavras-chave (inline)
Técnica: Usar <span> com cor Dourado em palavras como "dominar", "procedimentos", "segurança"

H3 — Destaques (Inter — Semibold)
Desktop: 24–28px | Weight: 600
Mobile: 18–22px | Weight: 600
Line-height: 1.4
Uso: Títulos de cards, seções internas
Cor: Azul ENDO
Corpo — Texto Corrido (Inter)
Desktop: 16–18px | Weight: 400
Mobile: 14–16px | Weight: 400
Line-height: 1.6 (legibilidade premium)
Letter-spacing: 0px (natural)
Cor: Cinza Profissional (#3C3C3C)
Micro — Captions, Labels (Inter)
Desktop: 12–13px | Weight: 400
Mobile: 11–12px | Weight: 400
Line-height: 1.5
Uso: Badges, dates, secondary info
Cor: Cinza Profissional (70% opacity)
Técnicas Tipográficas Premium
Contrast Hierarchy

H1: 700 Bold + Azul ENDO (máximo contraste)
H2: 700 Bold + Dourado inline (destaque elegante)
Corpo: 400 Normal + Cinza Prof. (leitura confortável)

Espaçamento entre linhas

Títulos: 1.2 (tight, premium)
Corpo: 1.6 (respiratório, legível)
CTA: 1.4 (equilibrado)
Kerning manual (em headlines):

"Enquanto" e "alguns" → -0.01em
Palavras finais de linhas: -0.02em (tightening)
4. COMPONENTES UI
4.1 Buttons (CTAs)
Primary Button — WhatsApp
Background: Dourado Suave (#B89A6A)
Cor texto: Azul ENDO (#01284A)
Padding: 16px 32px (generoso)
Border-radius: 8px (ligeiramente arredondado, não pill)
Font: Inter | 16px | Weight 600
Icon: WhatsApp (16px, esquerda)
Shadow: 0 4px 16px rgba(184, 154, 106, 0.2)
Hover: 
  - Background: #9A7A4A (mais escuro)
  - Shadow: 0 8px 24px rgba(184, 154, 106, 0.3)
  - Transform: translateY(-2px)
Transition: all 300ms ease-out

Animação:

On hover: Slight lift (2px up)
Icon rotate slightly (5deg)
Background darkens suavemente
Secondary Button — Info
Background: transparent
Border: 2px solid Azul ENDO
Cor texto: Azul ENDO
Padding: 14px 28px
Font: Inter | 16px | Weight 600
Hover:
  - Background: Azul ENDO
  - Cor texto: Branco
  - Border: 2px solid Azul ENDO
Transition: all 300ms ease-out

Text Link
Cor: Azul ENDO
Text-decoration: none
Border-bottom: 1px solid Dourado (opacity 0.6)
Hover:
  - Border-color: Dourado (opacity 1)
  - Color: Dourado
Transition: all 200ms ease-out

4.2 Cards & Containers
Info Card (Seção "Dois tipos de médicos")
Background: Cinza Suave (#F3F5F8)
Border: none
Border-left: 4px solid Azul ENDO (ou Dourado)
Padding: 32px
Border-radius: 4px
Box-shadow: 0 2px 8px rgba(1, 40, 74, 0.08)
Transition: all 300ms ease-out

Hover state:
  - Shadow: 0 8px 16px rgba(1, 40, 74, 0.12)
  - Transform: translateX(4px)

Professor Card
Background: Branco
Border: 1px solid Cinza Suave (#F3F5F8)
Padding: 40px 32px
Border-radius: 8px
Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)

Hover:
  - Shadow: 0 12px 24px rgba(0, 0, 0, 0.1)
  - Border-color: Dourado (opacity 0.5)
  - Transform: translateY(-4px)
Transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1)

4.3 Badges & Tags
Badge de Localização
Background: Azul Claro Clínico (#4A7CA8)
Cor: Branco
Padding: 6px 12px
Font: Inter 12px | Weight 500
Border-radius: 20px (pill)
Icon: 📍 (esquerda)
Margin-bottom: 16px

Badge de Destaque (Turma presencial)
Background: Dourado Suave com opacity 0.15
Border: 1px solid Dourado Suave
Cor: Dourado Suave
Padding: 8px 14px
Font: Inter 12px | Weight 600
Border-radius: 4px

5. NAVEGAÇÃO
Header/Navbar
Layout: Fixed (sticky) ao topo
Background: Branco (95% opacity, blur backdrop)
Height: 72px
Padding: 16px 40px
Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06)

Grid:
[Logo (100px)] — [Nav Links (auto)] — [WhatsApp CTA (160px)]

Logo:
- Altura: 40px
- Símbolo + nome (versão horizontal)
- Azul ENDO

Nav Links
Font: Inter | 14px | Weight 500
Cor: Cinza Profissional (#3C3C3C)
Spacing: 32px entre items

Items:
- Início
- Quem Somos (sobre)
- Cursos (destacar "Endoscopia Digestiva")
- Depoimentos
- Contato

Hover state:
- Color: Dourado Suave
- Border-bottom: 2px solid Dourado
- Transition: 200ms ease-out

Mobile Menu
Hambúrguer (Azul ENDO)
Slide-in da direita
Background: Azul ENDO (95% opacity)
Links: Branco
Separadores: Dourado (opacity 0.3)
6. SEÇÕES — DESIGN DETALHADO
SEÇÃO 1: HERO (Premium Medical)
Layout
Height: 600px (desktop) | 700px (mobile)
Background: Azul ENDO (#01284A) com textura sutil (scanlines 2% opacity)
Gradiente overlay: Azul ENDO (0% left) → Azul ENDO 95% (right)
Conteúdo
Coluna esquerda (6 colunas):
- Headline (H1): 64px Playfair Bold
  "Enquanto alguns médicos vivem de plantão…"
  "outros começam a mudar completamente a própria carreira 
   dominando procedimentos."
  
  Cor: Branco
  Com "dominar procedimentos" em Dourado Suave

- Subheadline (Corpo 18px): 
  "A formação presencial que ensina médicos a realizarem 
   Endoscopia Digestiva Alta e Colonoscopia com segurança e técnica."
  Cor: Branco (95% opacity)
  Margin-top: 24px
  Line-height: 1.6

- Secondary text (Corpo 16px):
  "Mesmo sem experiência prévia."
  Cor: Dourado Suave
  Margin-top: 16px
  Font-weight: 500

- Location Badge: 
  📍 Goiânia — Turma presencial
  Margin-top: 24px

- CTA Button (Primary):
  💬 Falar com a equipe no WhatsApp
  Margin-top: 32px

Coluna direita (6 colunas):
- HERO IMAGE/ILLUSTRATION:
  - Sua imagem proposta (hero section verde/neon)
  - Aplicar: border-radius 12px
  - Box-shadow: 0 20px 60px rgba(184, 154, 106, 0.25)
  - Subtle animation: Float up/down 3px (3s infinite ease-in-out)

Animações
On page load:
1. Headline: Fade in + slide down (300ms ease-out, delay 100ms)
2. Subheadline: Fade in + slide down (300ms ease-out, delay 200ms)
3. Badge + Button: Fade in (400ms ease-out, delay 300ms)
4. Hero image: Fade in + scale 1.05 → 1 (600ms ease-out)

Scroll animation (parallax suave):
- Hero image: translateY(scrollDepth * 0.3)
- Opacity: Fade out ao sair da viewport

Mobile adjustments:

Stack vertical (hero image full width, abaixo)
Headline: 44px
Height: 800px
Padding: 60px 20px
SEÇÃO 2: "A Realidade que quase todo médico descobre"
Layout
Background: Branco
Max-width: 1200px | Center aligned
Padding: 120px 40px
Estrutura
Título (H2):
"A realidade que quase todo médico descobre depois de pegar o CRM"
- Font: 48px Playfair Bold
- Cor: Azul ENDO
- Margin-bottom: 60px
- Text-align: center

Subtítulo (Corpo 18px):
"Você passa anos estudando medicina."
- Cor: Cinza Profissional
- Margin-bottom: 40px

Blocos de texto:
- 5 pequenos parágrafos (16px Inter)
- Cada parágrafo com margin-bottom: 12px
- Cor: Cinza Profissional
- Line-height: 1.7

Destaque visual (bullet points):
"Provas difíceis" / "Internato" / "Madrugadas estudando"
- Usar ícones pequenos (20px) antes de cada
- Ícone: círculo com ponto (Dourado Suave)
- Inline com o texto
- Font-weight: 600

Animação
Ao scroll para dentro da viewport:
- Cada parágrafo: Fade in + slide right (200ms, staggered 100ms)
- Ícones: Scale 0.8 → 1 (300ms ease-out)

Variação premium: Usar pull quotes com fundo Cinza Suave

"Se você não trabalha… você não ganha."
- Background: Cinza Suave (#F3F5F8)
- Border-left: 4px solid Dourado
- Padding: 20px 24px
- Margin: 40px 0
- Font: 18px Inter | Weight 500 | Azul ENDO
- Line-height: 1.6

SEÇÃO 3: "Existem dois tipos de médicos"
Layout
Background: Gradiente suave Azul ENDO 5% → Cinza Suave
Padding: 120px 40px
Estrutura 2-Colunas
Coluna Esquerda (Médico de Plantão):
- Card background: Branco
- Border-left: 4px solid Azul ENDO
- Padding: 40px
- Border-radius: 8px
- Shadow: 0 4px 16px rgba(1, 40, 74, 0.08)

Título (H3):
"Médico de Plantão"
- 28px Inter Semibold | Azul ENDO
- Margin-bottom: 24px
- Flex icon: ⏰ (24px, Dourado, esquerda)

Bullets (16px Inter):
- "depende de escala"
- "troca tempo por dinheiro"
- "vive de carga horária"
- "sempre correndo entre hospitais"

Cada bullet:
- Margin-bottom: 12px
- Icon: — (Azul ENDO, esquerda)
- Cor: Cinza Profissional (80% opacity)

---

Coluna Direita (Médico que domina procedimentos):
- Card background: Cinza Suave (#F3F5F8)
- Border: 2px solid Dourado Suave
- Padding: 40px
- Border-radius: 8px
- Shadow: 0 8px 24px rgba(184, 154, 106, 0.15)

Título (H3):
"Médico que domina procedimentos"
- 28px Inter Semibold | Dourado Suave
- Margin-bottom: 24px
- Flex icon: 🎯 (24px, Dourado, esquerda)

Bullets (16px Inter):
- "pode atuar em clínicas e centros diagnósticos"
- "constrói agenda própria"
- "realiza procedimentos valorizados"
- "abre novas possibilidades na carreira"

Cada bullet:
- Margin-bottom: 12px
- Icon: ✓ (Dourado Suave, esquerda)
- Cor: Azul ENDO (90% opacity)
- Font-weight: 500

Animação
On scroll into viewport:
Coluna esquerda:
1. Fade in + slide left (300ms ease-out)
2. Border-left: Expand 0 → 4px (400ms ease-out)

Coluna direita (slight delay):
1. Fade in + slide right (300ms ease-out, delay 100ms)
2. Border: Draw effect (border-width expand)

Hover states (ambas):
- Transform: translateY(-6px)
- Shadow expansion
- Transition: 300ms ease-out

SEÇÃO 4: "Por que tantos médicos estão olhando para a endoscopia"
Layout
Background: Branco
Padding: 120px 40px
Estrutura
Título (H2):
"Por que tantos médicos estão olhando para a endoscopia"
- 48px Playfair Bold | Azul ENDO
- Margin-bottom: 60px
- Center aligned

Introdução (Corpo 18px):
"Porque existe uma realidade simples no mercado."
- Cor: Cinza Profissional
- Margin-bottom: 40px
- Font-weight: 500

Subtítulos com números:
"Hospitais precisam. Clínicas precisam. Pacientes precisam."
- Usar linha (1px) entre cada statement
- Padding: 20px 0
- Font: 20px Inter | Weight 600 | Azul ENDO
- Cor: Azul ENDO

Chamada principal (H2):
"Mas ainda existem poucos médicos que dominam o 
procedimento com segurança e técnica."
- Font: 32px Playfair Bold
- Cor: Dourado Suave
- Margin-top: 40px
- Margin-bottom: 40px

Listagem de cenários (Grid 3 colunas):
- clínicas
- hospitais
- centros diagnósticos
- consultórios especializados

Cada item:
- Icon: 24px (custom icon estilo linha, Dourado)
- Texto: 16px Inter | Azul ENDO | Semibold
- Padding: 20px
- Hover: Background Cinza Suave, scale 1.05

SEÇÃO 5: "A EndoStart"
Layout
Background: Linear gradiente Azul ENDO (left 0%) → Azul ENDO 90% (right 100%)
Overlay texture: subtle diagonal pattern
Padding: 100px 40px
Color: Branco text
Estrutura
Título (H2):
"Foi por isso que nasceu a EndoStart"
- 48px Playfair Bold | Branco
- Margin-bottom: 40px
- Center aligned

Subtítulo (H3):
"A EndoStart foi criada com um objetivo simples:"
- 28px Inter Semibold | Branco
- Margin-bottom: 20px

Chamada principal (Destacada):
"ensinar médicos a aprender Endoscopia Digestiva Alta 
e Colonoscopia com segurança e raciocínio clínico."
- Font: 32px Playfair Bold | Dourado Suave
- Line-height: 1.5
- Margin-bottom: 40px
- Padding: 24px 32px
- Background: Azul ENDO 20% mais escuro
- Border-left: 4px solid Dourado Suave
- Border-radius: 4px

Três linhas de diferenciais:
"Sem anos esperando oportunidade."
"Sem depender exclusivamente de residência."
"Sem teoria infinita."

- Cada linha: 18px Inter | Branco | Opacity 90%
- Margin-bottom: 12px
- Prefix: ✓ (Dourado) | espaço | texto

Conclusão:
"Aqui o foco é formação prática e entendimento 
real do procedimento."
- Font: 20px Inter Semibold | Dourado Suave
- Margin-top: 40px
- Font-weight: 600

Animação
On scroll into viewport:
1. Background color: Fade in (500ms)
2. Título: Fade in + slide down (400ms ease-out)
3. Cada diferencial: Slide in from left (200ms, staggered 100ms)
4. Ícones check: Bounce scale effect (300ms ease-out)

SEÇÃO 6: "Como funciona a formação"
Layout
Background: Cinza Suave (#F3F5F8)
Padding: 120px 40px
Max-width: 1200px
Estrutura
Título (H2):
"Como funciona a formação"
- 48px Playfair Bold | Azul ENDO
- Margin-bottom: 20px
- Center aligned

Subtítulo (Corpo):
"A formação acontece em 4 semanas presenciais."
- 20px Inter Semibold | Dourado Suave
- Margin-bottom: 60px
- Center aligned

Timeline visual (Vertical no mobile, horizontal no desktop):
4 colunas | cada etapa = 1 semana

Coluna 1:
├─ Número: "Semana 1" (Playfair 32px | Azul ENDO)
├─ Conector (linha vertical | Dourado opacity 0.5)
└─ Items:
   • Fundamentos da endoscopia
   • Anatomia endoscópica aplicada
   
Coluna 2:
├─ Número: "Semana 2"
├─ Conector
└─ Items:
   • Técnica do exame
   • Manejo correto do aparelho

Coluna 3:
├─ Número: "Semana 3"
├─ Conector
└─ Items:
   • Raciocínio clínico
   • Introdução à colonoscopia

Coluna 4:
├─ Número: "Semana 4"
└─ Items:
   • Segurança do paciente
   • Acompanhamento direto

Cada item:
- Font: 16px Inter | Cinza Profissional
- Padding: 12px 0
- Border-left: 3px solid Dourado (opacity 0.6)
- Padding-left: 12px

Callout final:
"Tudo com acompanhamento direto dos professores."
- Background: Branco
- Border: 2px solid Dourado Suave
- Padding: 24px 32px
- Border-radius: 8px
- Font: 18px Inter Semibold | Azul ENDO
- Margin-top: 40px

Animação
On scroll into viewport:
1. Timeline items: Staggered fade-in (200ms, 100ms delay)
2. Connecting lines: Draw effect (border-bottom animate 400ms)
3. Numbers: Scale 0.8 → 1 (300ms ease-out)
4. Final callout: Bounce effect on entry

Mobile: Converter para timeline vertical com dots (não colunas)

SEÇÃO 7: "Quem ensina"
Layout
Background: Branco
Padding: 120px 40px
Max-width: 1200px
Estrutura
Título (H2):
"Quem ensina na formação"
- 48px Playfair Bold | Azul ENDO
- Margin-bottom: 80px
- Center aligned

Grid 2 colunas (desktop) | 1 coluna (mobile):

CARD PROFESSOR 1:
├─ Avatar (150px circular)
│  └─ Border: 4px solid Dourado
├─ Nome: "Dr. Alessandro" (28px Playfair Bold | Azul ENDO)
├─ Credenciais resumidas (16px Inter | Cinza Prof):
│  • Graduação em Medicina pela UNIG
│  • Residência em Cirurgia Geral
│  • Formação em Cirurgia de Urgência
├─ Divisor (1px linha | Dourado opacity 0.3)
├─ Título profissional (18px Inter Semibold | Dourado):
│  "Responsável técnico — Endoscopia"
└─ Experiências (14px Inter | Cinza Prof):
   • Hospital Sagrado Coração de Jesus
   • Especialidades da Prefeitura
   • Associado SBCBM

CARD PROFESSOR 2:
(estrutura idêntica)
├─ Nome: "Dra. Tâmara Husein Naciff"
├─ Credenciais:
│  • Graduação PUC Goiás
│  • Residência Clínica Médica
│  • Residência Gastroenterologia
├─ Especialidades:
   • Endoscopia digestiva alta
   • Colonoscopia
   • Prática clínica

Card CSS:
- Background: Branco
- Border: 1px solid Cinza Suave
- Padding: 40px
- Border-radius: 12px
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.06)
- Transition: all 400ms ease-out

Hover:
- Shadow: 0 16px 32px rgba(1, 40, 74, 0.12)
- Transform: translateY(-8px)
- Border: 1px solid Dourado (opacity 0.5)

Animação
On scroll into viewport:
1. Cards: Fade in + slide up (400ms ease-out, staggered 150ms)
2. Avatar: Scale effect 0.9 → 1 (500ms ease-out)
3. Border highlight: Fade in (600ms)

SEÇÃO 8: "Para quem é essa formação"
Layout
Background: Linear gradiente Cinza Suave (left) → Branco (right)
Padding: 120px 40px
Max-width: 1200px
Estrutura
Título (H2):
"Para quem é essa formação"
- 48px Playfair Bold | Azul ENDO
- Margin-bottom: 60px

Subtítulo (18px Inter):
"Essa formação foi criada para médicos que:"
- Cinza Profissional
- Margin-bottom: 40px
- Font-weight: 500

Grid 4 items (2x2 desktop | 1 coluna mobile):

Item 1:
├─ Icon: 🎯 (48px, Dourado)
└─ Texto: "querem ampliar possibilidades dentro da medicina"
   Font: 18px Inter Semibold | Azul ENDO
   Padding: 24px
   Background: Branco
   Border-radius: 8px
   Box-shadow: subtle
   Hover: Border 2px Dourado, shadow expand

(Items 2-4 idêntica, mas com ícones diferentes)
Item 2: 📚 "querem aprender um procedimento com alta demanda"
Item 3: 💰 "desejam aumentar o faturamento com procedimentos"
Item 4: 🚀 "querem desenvolver novas habilidades clínicas"

Animação
On scroll into viewport:
1. Cada item: Fade in + scale 0.95 → 1 (300ms, staggered 100ms)
2. Icon rotation: Slight rotate on hover (10deg, 200ms)

SEÇÃO 9: "Importante — Turmas Presenciais"
Layout
Background: Azul ENDO (#01284A) com texture
Padding: 80px 40px
Text-align: center
Estrutura
Ícone destaque (100px):
⚠️ ou custom icon em estilo linha

Título (H2):
"Importante"
- 40px Playfair Bold | Branco
- Margin: 20px 0 30px 0

Mensagem principal:
"As turmas são presenciais e com número limitado de alunos."
- 24px Playfair Semibold | Dourado Suave
- Line-height: 1.5
- Margin-bottom: 20px

Explicação:
"Isso acontece porque o treinamento exige acompanhamento 
próximo durante a formação. Por isso as vagas são limitadas."
- 18px Inter | Branco (90% opacity)
- Line-height: 1.6
- Max-width: 700px
- Center aligned
- Margin: 0 auto

CTA secundário (abaixo):
"Garanta sua vaga agora"
- Button style: Outline (border branco, text branco)
- Padding: 14px 28px
- Font: 16px Inter Semibold
- Margin-top: 40px

Animação
On page load/scroll:
1. Icon: Pulse effect (scale 1 → 1.1 → 1, 2s infinite)
2. Título: Fade in + slide down (300ms)
3. Mensagem: Fade in (400ms, delay 150ms)

SEÇÃO 10: "Como funciona a inscrição"
Layout
Background: Branco
Padding: 120px 40px
Max-width: 1200px
Center aligned
Estrutura
Título (H2):
"Como funciona a inscrição"
- 48px Playfair Bold | Azul ENDO
- Margin-bottom: 20px

Subtítulo (18px Inter):
"Para manter a qualidade da formação, todas as 
inscrições são feitas diretamente com nossa equipe."
- Cinza Profissional
- Margin-bottom: 60px
- Line-height: 1.6

Processual (Vertical timeline ou numbered list):
Números com ícones circulares:

Etapa 1:
├─ Círculo (80px, Azul ENDO):
│  └─ Número: "1" (32px Playfair | Branco)
├─ Linha conector (vertical, Dourado opacity 0.4)
└─ Texto: "Clique no botão abaixo"
   18px Inter Semibold | Azul ENDO
   Sub: "você será direcionado para o WhatsApp"
   16px Inter | Cinza Prof

Etapa 2:
├─ Círculo (80px, Dourado Suave):
│  └─ Número: "2"
├─ Linha conector
└─ Texto: "Nossa equipe vai explicar:"
   Listagem indentada:
   • Como funciona a formação
   • Datas da próxima turma
   • Detalhes da inscrição
   • Disponibilidade de vagas

Etapa 3:
├─ Círculo (80px, Azul Claro Clínico):
│  └─ Número: "3"
└─ Texto: "Defina seus próximos passos"
   "Você receberá um link para confirmação"
   16px Inter | Cinza Prof | italic

CTA Principal (abaixo do timeline):
"Falar com a equipe no WhatsApp"
- Button style: Primary (Dourado bg)
- Padding: 16px 40px
- Font: 16px Inter Semibold
- Icon: WhatsApp (esquerda)
- Margin-top: 60px

Animação
On scroll into viewport:
1. Timeline circles: Fade in + scale (300ms, staggered 150ms)
2. Linhas conector: Draw effect (height expand 400ms)
3. Textos: Fade in from left (250ms, staggered 100ms)
4. CTA button: Subtle pulse on entry

SEÇÃO 11: FOOTER
Layout
Background: Azul ENDO (#01284A)
Padding: 80px 40px 40px
Color: Branco
Estrutura
Grid 4 colunas:

Coluna 1 — Branding:
├─ Logo (versão branca, 120px height)
├─ Tagline: "Formação presencial em Endoscopia"
│  14px Inter | Branco 80% opacity
│  Margin-top: 16px
└─ Social links (24px icons, Dourado hover):
   • Instagram
   • WhatsApp
   • LinkedIn

Coluna 2 — Navegação:
├─ Título: "Navegação" (14px Inter Semibold | Dourado)
└─ Links (14px Inter | Branco 70% opacity):
   • Início
   • Sobre
   • Cursos
   • Contato

Coluna 3 — Informações:
├─ Título: "Contato" (14px Inter Semibold | Dourado)
└─ Info items:
   📍 Goiânia — GO
   📞 +55 (xx) xxxxx-xxxx
   ✉️ contato@endostart.com

Coluna 4 — CTA:
├─ Título: "Próximos Passos" (16px Playfair Semibold | Dourado)
├─ Descrição: "Fale com nossa equipe e garanta sua vaga"
│  14px Inter | Branco 80%
│  Margin-bottom: 16px
└─ Button: "WhatsApp" (Small, Dourado bg)

Divisor (1px linha | Dourado opacity 0.2)

Bottom footer:
├─ Texto: "© 2024 EndoStart. Todos os direitos reservados."
│  12px Inter | Branco 60% opacity
│  Text-align: center
└─ Links legais:
   • Política de Privacidade
   • Termos de Uso
   Font: 11px Inter | Branco 50% opacity
   Text-align: center
   Spacing: 20px entre links

Animação
On scroll into footer viewport:
1. Logo + branding: Fade in + slide up (400ms)
2. Colunas: Fade in from left (300ms, staggered 100ms)
3. Social icons: Rotate on hover (10deg, 200ms)
4. Links: Color change on hover (Dourado, 200ms)

7. INTERAÇÕES & MICROINTERAÇÕES
Scroll Behavior
Header (navbar):
- On scroll down 100px+: Background opacity 100%, shadow visible
- On scroll up: Restore estado original
- Transition: 300ms ease-out

Parallax backgrounds:
- Hero section: 30% scroll depth
- About section: 20% scroll depth
- Subtlety: max 30px translation

Button Interactions
WhatsApp CTA (Primary)

Default state:
- Background: Dourado Suave (#B89A6A)
- Shadow: 0 4px 16px rgba(184, 154, 106, 0.2)

Hover:
- Background: #9A7A4A (15% darker)
- Shadow: 0 8px 24px rgba(184, 154, 106, 0.3)
- Transform: translateY(-2px)
- Icon: Rotate 15deg

Active/Click:
- Transform: translateY(0px)
- Shadow: 0 2px 8px rgba(184, 154, 106, 0.2)
- Feedback: Haptic (mobile)

Transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)

Card Hover Effects
Info cards:
- Hover: translateY(-4px) + shadow expansion
- Border accent appears/highlights
- Transition: 300ms ease-out

Professor cards:
- Hover: translateY(-8px) + shadow strong
- Border color changes to Dourado
- Background stays white
- Transition: 400ms cubic-bezier

Scroll Reveal Animation
Elements com classe "reveal":
- Initial: opacity 0, transform translateY(40px)
- On scroll to viewport: 
  - opacity 1
  - transform translateY(0)
  - Duration: 600ms
  - Timing: cubic-bezier(0.34, 1.56, 0.64, 1) (smooth bounce)
  - Stagger: 100ms between items

Loading States
Button estados:
- Loading: Icon spinner (Dourado)
- Success: Checkmark animation
- Error: Shake animation + color red
- Transitions: Smooth fade between states

8. RESPONSIVIDADE & BREAKPOINTS
Breakpoints
Desktop:   ≥ 1200px
Tablet:    768px – 1199px
Mobile:    < 768px

Key rules:
- Fluid typography (clamp entre min-max)
- Flexible grid layouts
- Touch-friendly CTAs (min 48px height)
- Max-width constraints maintained

Fluid Typography Scale
H1: clamp(36px, 8vw, 64px)
H2: clamp(28px, 6vw, 48px)
H3: clamp(20px, 4vw, 28px)
Corpo: clamp(14px, 2vw, 18px)

Mobile Adjustments
Hero height: 700px (vs 600px desktop)
Section padding: 80px 20px (vs 120px 40px desktop)
Grid: 1 coluna (vs 2-3 colunas)
Card spacing: 16px (vs 24px)
Font sizes: -2–4px redução

9. PERFORMANCE & TÉCNICAS CSS
Otimizações
Images:
- Lazy loading (IntersectionObserver)
- Responsive images (srcset)
- WebP format com fallback
- Compression (TinyPNG)

Animations:
- Use transform + opacity (GPU accelerated)
- Avoid layout-triggering properties (width, height)
- RequestAnimationFrame para JS animations
- Debounce scroll events

CSS:
- Minimize reflows
- Use will-change judiciosamente
- Hardware acceleration (transform: translateZ(0))

CSS Custom Properties (Tokens)
:root {
  --color-primary: #01284A;
  --color-accent: #B89A6A;
  --color-text: #3C3C3C;
  --color-bg-light: #F3F5F8;
  --color-bg-white: #FFFFFF;
  
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 60px;
  --space-2xl: 120px;
  
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.15);
  
  --transition-fast: 200ms ease-out;
  --transition-base: 300ms ease-out;
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

10. ACESSIBILIDADE (WCAG 2.1 AA)
Contraste de Cores
Azul ENDO (#01284A) sobre Branco: 11.2:1 ✓ AAA
Dourado Suave (#B89A6A) sobre Branco: 5.8:1 ✓ AAA
Cinza Prof. (#3C3C3C) sobre Branco: 8.5:1 ✓ AAA
Branco sobre Azul ENDO: 11.2:1 ✓ AAA

Keyboard Navigation
Tab order: Lógico (esquerda → direita, top → bottom)
Focus states: Outline visível (Dourado, 2px, offset 2px)
Skip links: "Pular para conteúdo principal"

Texto Alt para Imagens
Hero image: "Médico realizando endoscopia com precisão"
Professor photos: "[Nome], Professor de Endoscopia"
Icons: Decorativos (aria-hidden) ou descritivos (alt text)

Estrutura HTML Semântica
<header role="banner">
<nav role="navigation" aria-label="Primary">
<main role="main">
<section aria-labelledby="section-title">
<footer role="contentinfo">

11. COPYWRITING & TONE (Conforme Manual da Marca)
Princípios de Copy
✅ Direto & objetivo: Evitar rodeios desnecessários
✅ Concreto: Benefícios reais, não atalhos
✅ Responsável: Reforçar segurança, supervisão, boas práticas
✅ Humano & empático: Conectar com dúvidas iniciais
Microcopy Exemplos
Buttons

✅ "Falar com a equipe no WhatsApp" (claro, ação)
✅ "Garanta sua vaga agora" (urgência, benefício)
❌ "Clique aqui" (genérico)
❌ "Saiba mais" (vago)
Labels

✅ "Turma presencial com acompanhamento"
❌ "Curso online" (não combina com formação)
Headlines

✅ "Enquanto alguns médicos vivem de plantão… outros dominam procedimentos" (contraste, aspiração)
❌ "Aprenda Endoscopia Rápido" (promessas irreais)
12. SEÇÕES ADICIONAIS RECOMENDADAS
12.1 Depoimentos (CTA social proof)
Seção: "Quem já passou por aqui"
Layout: Carousel 3 cards (desktop) | 1 card (mobile)

Card estrutura:
├─ Citação: "Antes eu não me via como especialista. 
            Agora realizo colonoscopias com segurança..."
│  Font: 18px Inter Italic | Azul ENDO
│  Quote mark icon (Dourado)
├─ Autor: Dr. João Silva (16px Inter Semibold | Azul ENDO)
├─ Especialidade: Cirurgião Geral (14px Inter | Cinza)
└─ Avatar: 80px circular, border Dourado

Animação: Auto-scroll com pause on hover

12.2 FAQ Section
Seção: "Dúvidas Frequentes"
Layout: Accordion (collapsed → expanded)

Item estrutura:
├─ Pergunta: "Como é a experiência prática?" (16px Inter Semibold)
├─ Ícone: + (muda para ×)
└─ Resposta: "A prática acontece com supervisão..." (16px Inter)

Hover effect:
- Background: Cinza Suave
- Border-left: Dourado expand
- Transition: 300ms

Animação ao expandir:
- Max-height: 0 → auto (300ms ease-out)
- Opacity: 0 → 1

12.3 CTA Section (Antes do Footer)
Seção: Final call-to-action
Layout: Full width, centered

Background: Azul ENDO gradiente
Texto: "Pronto para transformar sua carreira?" (40px Playfair | Branco)
Sub: "Fale com nossa equipe de admissão agora." (18px Inter | Dourado)
Button: Primary (Dourado bg) | Size: Large

Animação: Fade in on scroll

13. ESPECIFICAÇÕES TÉCNICAS
Stack Recomendado
Frontend:
- Framework: React / Next.js (SSR, performance)
- Styling: Tailwind CSS + CSS Modules (tokens)
- Animations: Framer Motion (scroll triggers)
- Image optimization: Next.js Image
- Icons: Feather Icons ou custom SVG

DevOps:
- Hosting: Vercel, Netlify (otimizado React)
- CDN: Cloudflare (cache, compression)
- Analytics: Google Analytics 4
- Form handling: Formspree / n8n webhook

Build Process
CSS:
- PostCSS (autoprefixer, minify)
- PurgeCSS (remove unused CSS)
- GZIP compression

JavaScript:
- Babel (transpiling)
- Webpack/Rollup (bundling)
- Tree-shaking (remove dead code)

Assets:
- Image compression (WebP, AVIF)
- SVG optimization
- Font subsetting (apenas caracteres usados)

Performance Targets
Metrics:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to First Byte (TTFB): < 600ms

Tools:
- Lighthouse (audit regulares)
- GTmetrix (monitoring)
- WebPageTest (benchmarking)

14. GUIA DE USO — EQUIPE DE DESENVOLVIMENTO
Arquivo de Componentes (Component Library)
/components
├── Buttons/
│   ├── PrimaryButton.jsx
│   ├── SecondaryButton.jsx
│   └── TextLink.jsx
├── Cards/
│   ├── InfoCard.jsx
│   ├── ProfessorCard.jsx
│   └── FeatureCard.jsx
├── Sections/
│   ├── Hero.jsx
│   ├── TwoTypes.jsx
│   ├── FormationFlow.jsx
│   └── ...
├── Common/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Navigation.jsx
│   └── ...
└── Icons/
    ├── WhatsAppIcon.jsx
    ├── LocationIcon.jsx
    └── ...

CSS Organization
/styles
├── _tokens.css (cores, espaçamento, sombras)
├── _reset.css (normalizar)
├── _typography.css (fontes, scales)
├── _layout.css (grid, containers)
├── _animations.css (keyframes)
├── _responsive.css (media queries)
└── main.css (import all)

Variáveis de Ambiente
.env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://...
NEXT_PUBLIC_ANALYTICS_ID=...
NEXT_PUBLIC_SITE_URL=https://endostart.com.br

15. SPRINTS DE DESENVOLVIMENTO RECOMENDADOS
Sprint 1: Foundation (1-2 semanas)
[ ] Design tokens setup
[ ] Component library base
[ ] Header + Footer
[ ] Button components
[ ] Color palette testing
Sprint 2: Hero + Navigation (1 semana)
[ ] Hero section
[ ] Navbar sticky
[ ] Mobile menu
[ ] Animations setup
Sprint 3: Content Sections (2 semanas)
[ ] "Realidade médica" section
[ ] "Dois tipos" cards
[ ] "Por que endoscopia" section
[ ] Timeline formação
Sprint 4: Professor + Inscrição (1 semana)
[ ] Professor cards
[ ] Inscrição processual
[ ] FAQ section (se incluído)
Sprint 5: Otimização + Launch (1 semana)
[ ] Performance audit
[ ] Mobile testing completo
[ ] Acessibilidade audit
[ ] Form testing
[ ] Analytics setup
[ ] Deploy
16. CHECKLIST PRÉ-LAUNCH
[ ] Todos os textos revisados (copywriting)
[ ] Imagens otimizadas + comprimidas
[ ] Fonts carregadas corretamente (no FOUT)
[ ] All links testados (internos + externos)
[ ] Form submissions funcionando
[ ] Mobile responsivo em todos os breakpoints
[ ] Acessibilidade: WCAG 2.1 AA
[ ] SEO: Meta tags, Open Graph, structured data
[ ] Analytics configurado
[ ] 404 page customizada
[ ] Robots.txt + sitemap.xml
[ ] SSL certificate ativo
[ ] Backup automated
[ ] Email de confirmação funcionando
[ ] Hotjar / session recording setup