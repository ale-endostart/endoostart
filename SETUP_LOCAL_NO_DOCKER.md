# 🚀 Setup Local SEM Docker - EndoStart Platform

Alternativa rápida usando SQLite para desenvolvimento local.

## ✅ Pré-requisitos

- ✓ Node.js 18+ instalado
- ✓ npm ou yarn
- ✓ Git

**Não precisa de Docker!**

---

## 📋 Passo 1: Configurar Banco SQLite

### 1.1 Backend - Atualizar Prisma Schema

Editar `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### 1.2 Criar arquivo .env.local no Backend

`backend/.env.local`:
```
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=874837483274837
CLOUDINARY_API_SECRET=your-secret
NEXTAUTH_SECRET=your-nextauth-secret-12345
NEXTAUTH_URL=http://localhost:3000
```

### 1.3 Criar arquivo .env.local no Frontend

`frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-12345
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=5585988888888
```

---

## 📦 Passo 2: Instalar Dependências

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
cd frontend
npm install
```

---

## 🗄️ Passo 3: Criar Banco de Dados

### 3.1 Gerar Prisma Client:
```bash
cd backend
npx prisma generate
```

### 3.2 Rodar Migrations (Cria as tabelas):
```bash
npx prisma migrate dev --name init
```

### 3.3 Popular Base de Dados (Seed):
```bash
npx prisma db seed
```

**Resultado esperado:**
```
✅ Seeding completed!

📋 Test Credentials:
   Admin:
     Email: dr.alessandro@endostart.com
     Password: admin123456
   Student:
     Email: medico@example.com
     Password: student123456
```

### 3.4 Verificar Banco de Dados (Opcional):
```bash
npx prisma studio
```

Abre interface visual em http://localhost:5555

---

## 🎯 Passo 4: Rodar Backend

Terminal 1:
```bash
cd backend
npm run dev
```

Esperado:
```
🚀 Server running on port 3001
📚 Health Check: http://localhost:3001/health
```

---

## 🖥️ Passo 5: Rodar Frontend

Terminal 2:
```bash
cd frontend
npm run dev
```

Esperado:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

---

## ✅ Passo 6: Testar Fluxo Completo

### 1. Landing Page
- Acesse: http://localhost:3000
- Teste o ROI Calculator (mova o slider)

### 2. Cadastro
- Clique em "Criar conta"
- Preencha e crie novo usuário

### 3. Login
- Email: `medico@example.com`
- Senha: `student123456`

### 4. Dashboard
- Veja os cursos
- Clique em um curso

### 5. Visualizar Conteúdo
- Clique em uma lição
- Veja PDF e Vídeo

### 6. Admin (Opcional)
- Email: `dr.alessandro@endostart.com`
- Senha: `admin123456`
- Acesse http://localhost:3000/admin

---

## 📊 Estrutura Criada

```
backend/
├── prisma/
│   ├── schema.prisma      (SQLite config)
│   ├── migrations/
│   │   └── [timestamp]_init/
│   └── seed.ts
└── dev.db                 ← Banco de dados local

frontend/
├── .env.local
└── [aplicação Next.js]
```

---

## 🚀 Passo 7: Converter para Supabase Cloud (Depois)

Quando quiser usar Supabase Cloud ao invés de SQLite:

### 7.1 Criar conta Supabase
- Vá para https://supabase.com
- Crie novo projeto
- Copie `DATABASE_URL`

### 7.2 Atualizar backend/prisma/schema.prisma
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 7.3 Atualizar .env.local
```
DATABASE_URL="postgresql://user:password@host:5432/db_name"
```

### 7.4 Rodar migrations em produção
```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## 💾 Fazer Backup do Banco

SQLite armazena tudo em um arquivo:

```bash
# Copiar banco para backup
cp backend/dev.db backend/dev.backup.db

# Restaurar
cp backend/dev.backup.db backend/dev.db
```

---

## 🐛 Troubleshooting

### ❌ "Migrations pending"
```bash
npx prisma migrate deploy
```

### ❌ "Prisma client not found"
```bash
npx prisma generate
```

### ❌ "Cannot find module"
```bash
npm install
```

### ❌ "Port already in use"
```bash
# Mudar porta no .env.local
PORT=3002

# Ou encontrar processo
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

---

## 🔄 Resetar Banco Completamente

Se quiser começar do zero:

```bash
cd backend

# Deletar arquivo do banco
rm dev.db

# Deletar migrations
rm -r prisma/migrations

# Criar novo
npx prisma migrate dev --name init

# Popular novamente
npx prisma db seed
```

---

## 📝 Próximos Passos

✅ Tudo funcionando localmente?

1. **Adicionar mais cursos**: Via Prisma Studio ou admin panel
2. **Testar com mais usuários**: Crie vários via signup
3. **Deploy em produção**: Use Supabase Cloud + Vercel

---

**Criado com ❤️ para EndoStart Platform**
