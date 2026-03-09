# 🚀 PRODUÇÃO - Guia Rápido

## ✅ Status Atual
- Landing page com CustomCursor ✓
- Area de membros com cursor padrão ✓
- Admin painel completo ✓
- Autenticação funcionando ✓
- Build Next.js passando ✓

---

## 🎯 Próximos 3 Passos Para Colocar Online

### PASSO 1: Supabase (5 minutos)
```bash
# Terminal - na pasta backend/
cd backend
DATABASE_URL="postgresql://postgres:inWTneSjLLM6UsW3@db.kmsvfakkgdwbfdlfbsqw.supabase.co:5432/postgres" npx prisma migrate deploy
DATABASE_URL="postgresql://postgres:inWTneSjLLM6UsW3@db.kmsvfakkgdwbfdlfbsqw.supabase.co:5432/postgres" npm run prisma:seed
```
✅ Banco de dados pronto com dados de teste

---

### PASSO 2: Backend - Railway (10 minutos)
1. Ir para **railway.app** → Sign in com GitHub
2. Criar novo projeto → Selecionar "Node.js"
3. Conectar repo GitHub (C--TurboOps-Code)
4. Railway pergunta build/start commands - colocar:
   - **Build**: `cd backend && npm install && npm run build`
   - **Start**: `cd backend && npm start`

5. Configurar Variáveis de Ambiente (Environment):
```
DATABASE_URL=postgresql://postgres:inWTneSjLLM6UsW3@db.kmsvfakkgdwbfdlfbsqw.supabase.co:5432/postgres
CORS_ORIGIN=https://endostart.com.br
JWT_SECRET=seu-segredo-super-aleatorio-aqui-min-32chars!@#$%
JWT_EXPIRY=7d
PORT=3001
NODE_ENV=production
```

6. Deploy automático vai rodar
7. Copiar URL fornecida pelo Railway: `https://backend-xyz.railway.app`

✅ Backend online e rodando

---

### PASSO 3: Frontend - Vercel (5 minutos)
1. Ir para **vercel.com** → Sign in com GitHub
2. Importar projeto (C--TurboOps-Code)
3. Framework: Next.js (detecta automaticamente)
4. Configurar Variáveis de Ambiente:
```
NEXT_PUBLIC_API_URL=https://backend-xyz.railway.app   (substituir URL do Railway)
NEXTAUTH_URL=https://endostart.vercel.app
NEXTAUTH_SECRET=seu-segredo-super-aleatorio-aqui-min-32chars!@#$%
```

5. Deploy automático vai rodar
6. Vercel gera URL: `https://endostart.vercel.app`

✅ Frontend online e conectado ao backend

---

## 📱 Testar em Produção

**URL da App**: https://endostart.vercel.app

### Credenciais:
```
ADMIN:
Email: dr.alessandro@endostart.com
Senha: admin123456

ALUNO:
Email: medico@example.com
Senha: student123456
```

### Fluxo de Teste:
1. Acessar landing page (deve ter cursor customizado - círculo dourado)
2. Fazer login como admin → /admin
3. Verificar dashboard com estatísticas
4. Fazer logout
5. Fazer login como aluno → /dashboard
6. Acessar um curso → visualizar PDFs
7. Marcar aula como concluída
8. Ver progresso atualizar

---

## 🎨 CustomCursor

- ✅ **Landing Page** (`/`): CustomCursor ativo (círculo dourado que expande ao hover em botões)
- ✅ **Area de Membros** (`/dashboard`, `/admin`): Cursor padrão do navegador
- ✅ **Auth Pages** (`/auth/signin`, `/auth/signup`): Cursor padrão

---

## 🔧 Depois: Conectar Domínio

Quando quiser usar seu domínio `endostart.com.br`:

1. Em **Vercel**: Project Settings → Domains → Add domain
2. Copiar os DNS records fornecidos
3. Em seu registrador (GoDaddy/Namecheap/etc):
   - Apontar nameservers OU
   - Adicionar CNAME para Vercel
4. Aguardar propagação (5-30 minutos)

---

## 📊 Monitorar

- **Backend logs**: railway.app → Seu projeto → Logs
- **Frontend logs**: vercel.com → Seu projeto → Deployments → Logs
- **Erro 401?** Limpar localStorage do browser ou verificar JWT_SECRET
- **Banco offline?** Verificar DATABASE_URL está correta no Railway

---

## 🎯 Checklist Final

- [ ] Migrations rodadas no Supabase
- [ ] Seed data inserido (credenciais de teste)
- [ ] Backend deployado no Railway
- [ ] Frontend deployado no Vercel
- [ ] NEXT_PUBLIC_API_URL apontando para Railway
- [ ] JWT_SECRET igual em backend e frontend
- [ ] Login funcionando
- [ ] Admin painel acessível
- [ ] Dashboard de alunos acessível
- [ ] CustomCursor só na landing (não em /dashboard ou /admin)

---

## 💡 Dicas

- Toda vez que fizer push no GitHub, Vercel e Railway fazem deploy automático
- Para desativar auto-deploy: Vercel/Railway Settings → desativar
- Para resetar dados: `npx prisma migrate reset` (local apenas!)
- Para adicionar novo usuário: Admin → Novo Aluno form
- Para adicionar curso: Admin → Novo Curso → Adicionar Módulos/Aulas/PDFs

---

**Pronto?** Comece pelo Passo 1! 🚀
