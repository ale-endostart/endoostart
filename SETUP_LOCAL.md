# 🚀 Setup Local - EndoStart Platform com Supabase

Guia completo para configurar e rodar a área de membros localmente.

## ✅ Pré-requisitos

- ✓ Docker Desktop instalado e rodando
- ✓ Node.js 18+ instalado
- ✓ Git
- ✓ npm ou yarn

## 📋 Passo 1: Iniciar Supabase Local

### Windows (PowerShell ou CMD):
```bash
cd C:\TurboOps\Code
start-supabase.bat
```

### Mac/Linux:
```bash
cd ~/TurboOps/Code
chmod +x start-supabase.sh
./start-supabase.sh
```

**Aguarde ~30 segundos para os containers iniciarem**

### Verificar se está rodando:
```bash
docker ps
```

Você deve ver:
- `supabase_postgres` (PostgreSQL)
- `supabase_studio` (UI)

### Acessar Supabase Studio:
Abra no navegador: **http://localhost:3001**

---

## 📝 Passo 2: Instalar Dependências

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
cd ../frontend
npm install
```

---

## 🗄️ Passo 3: Configurar Banco de Dados

### 3.1 Gerar Prisma Client:
```bash
cd backend
npx prisma generate
```

### 3.2 Rodar Migrations:
```bash
npx prisma migrate deploy
```

Isso vai:
- Criar as tabelas no PostgreSQL
- Aplicar os schemas definidos

### 3.3 Popular Base de Dados (Seed):
```bash
npx prisma db seed
```

Isso vai criar:
- ✓ Usuário Admin (Dr. Alessandro)
- ✓ Usuário Teste (Médico)
- ✓ 3 Cursos de exemplo
- ✓ Módulos e Lições
- ✓ Conteúdo (PDFs e Vídeos)

**Credenciais de Teste:**
```
Admin:
  Email: dr.alessandro@endostart.com
  Senha: admin123456

Aluno:
  Email: medico@example.com
  Senha: student123456
```

---

## 🔧 Passo 4: Verificar Banco de Dados

### Via Supabase Studio:
1. Abra http://localhost:3001
2. Faça login com credenciais do Supabase (padrão)
3. Vá em **SQL Editor** ou **Schema** para verificar tabelas

### Via Terminal:
```bash
cd backend
npx prisma studio
```

Isso abre interface visual em http://localhost:5555

---

## 🎯 Passo 5: Rodar Backend

```bash
cd backend
npm run dev
```

Você deve ver:
```
🚀 Server running on port 3001
📚 Health Check: http://localhost:3001/health
```

**Testar saúde do servidor:**
```bash
curl http://localhost:3001/health
```

---

## 🖥️ Passo 6: Rodar Frontend

Em **novo terminal**:
```bash
cd frontend
npm run dev
```

Você deve ver:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

---

## 🧪 Passo 7: Testar Fluxo Completo

### 1. Landing Page
Acesse: **http://localhost:3000**
- Deve aparecer a página de vendas com ROI Calculator
- Vermine se o slider funciona

### 2. Cadastro de Novo Usuário
- Clique em "Criar conta" no header ou vá para `/auth/signup`
- Preencha formulário (email, senha, nome, etc)
- Clique em "Criar conta"

### 3. Login
- Clique em "Entrar" ou vá para `/auth/signin`
- Use credenciais criadas ou teste:
  - Email: `medico@example.com`
  - Senha: `student123456`
- Deve redirecionar para `/dashboard`

### 4. Dashboard
- Deve ver "Bem-vindo, João Silva 👋"
- Deve ver progresso geral: 17% (total de 2 cursos)
- Deve ver "Meus Cursos" com 2 cursos (Endoscopia e Colonoscopia)

### 5. Visualizar Curso
- Clique em "Imersão em Endoscopia"
- Deve ver 3 módulos (Esôfago, Estômago, Intestino)
- Clique em módulo "Esôfago"
- Deve ver 2 lições

### 6. Visualizar Aula com Conteúdo
- Clique em "Anatomia do Esôfago"
- Deve ver PDF viewer com controles
- Clique em "Próxima" → PDF deve navegar
- Clique em "Demonstração Prática" (VIDEO)
- Deve aparecer embed do YouTube

### 7. Admin Panel (Opcional)
- Crie novo usuário com role ADMIN
- Ou use credenciais admin seed
- Vá para `/admin`
- Deve ver lista de estudantes
- Botões para "Conceder" e "Revogar" acesso

---

## 🐛 Troubleshooting

### ❌ "Connection refused" no banco de dados
```bash
# Verificar se containers estão rodando
docker ps

# Se não estiverem, iniciar novamente
docker-compose up -d

# Esperar 30 segundos
sleep 30
```

### ❌ "Prisma client not found"
```bash
cd backend
npx prisma generate
```

### ❌ "Migrations pending"
```bash
cd backend
npx prisma migrate deploy
```

### ❌ "Porta 3001 já em uso"
```bash
# Mudar porta no backend/.env.local
PORT=3002

# Ou encerrar processo na porta
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3001
kill -9 <PID>
```

### ❌ "NEXT_PUBLIC_API_URL não encontrado"
Verificar se `.env.local` existe em `frontend/`
```bash
cat frontend/.env.local
```

---

## 📊 Arquitetura do Setup Local

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (localhost:3000)                 │
│                      (Next.js Frontend)                      │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP Requests
                             ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend API (localhost:3001)                    │
│               (Express.js + Prisma ORM)                      │
└────────────────────────────┬────────────────────────────────┘
                             │ Queries
                             ↓
┌─────────────────────────────────────────────────────────────┐
│           PostgreSQL (localhost:5432)                        │
│            Supabase Local (Docker)                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          Supabase Studio UI (localhost:3001)                 │
│         (Visual Database Management)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Variáveis de Ambiente

### Backend (.env.local)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
PORT=3001
JWT_SECRET=your-jwt-key
NEXTAUTH_SECRET=your-nextauth-key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
```

---

## 📚 Documentação Relacionada

- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Local Docs](https://supabase.com/docs/guides/local-development)
- [NextAuth Docs](https://next-auth.js.org/)

---

## 🎉 Próximos Passos

✅ Setup completo? Agora você pode:

1. **Adicionar mais cursos e conteúdo**
   - Via Supabase Studio
   - Ou criar script de seed adicional

2. **Configurar Cloudinary** (opcional)
   - Criar conta em https://cloudinary.com
   - Adicionar credenciais ao `.env.local`

3. **Testar Google OAuth** (opcional)
   - Criar projeto em Google Cloud
   - Adicionar credenciais

4. **Deploy em produção**
   - Usar Supabase Cloud (ao invés de local)
   - Fazer deploy no Vercel (frontend)
   - Fazer deploy no Railway/Render (backend)

---

## ❓ Precisa de Ajuda?

Verifique os logs:

```bash
# Backend logs
npm run dev

# Frontend logs
npm run dev

# Docker logs
docker-compose logs -f

# Database logs
docker-compose logs -f postgres
```

---

**Criado com ❤️ para EndoStart Platform**
