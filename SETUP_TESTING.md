# 🚀 Guia de Teste - Área de Membros

## ⚙️ Pré-requisitos

- Node.js 18+
- SQLite (já incluído)
- Dois terminais (um para backend, outro para frontend)

## 🔧 Setup Inicial

### 1. Crie `.env` no Backend

```bash
cd backend
cat > .env << 'EOF'
DATABASE_URL="file:./dev.db"
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=7d
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@endostart.com
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=endostart-files
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
CORS_ORIGIN=http://localhost:3000
EOF
```

### 2. Populate Database

```bash
cd backend
DATABASE_URL="file:./dev.db" npm run prisma:seed
```

Você deve ver:
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

### 3. Start Backend

**Terminal 1:**
```bash
cd backend
DATABASE_URL="file:./dev.db" npm run dev
```

Você deve ver:
```
✅ API running on http://localhost:3001
```

### 4. Start Frontend

**Terminal 2:**
```bash
cd ..  # volta para raiz
npm run dev
```

Você deve ver:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

## ✅ Testes

### Teste 1: Login como Student

1. Abra `http://localhost:3000/auth/signin`
2. Cole:
   - **Email**: `medico@example.com`
   - **Senha**: `student123456`
3. Clique "Entrar"
4. Você deve ver o **Dashboard** com 2 cursos

### Teste 2: Ver Curso

1. Clique em "Imersão em Endoscopia"
2. Você deve ver:
   - Sidebar com módulos (Esôfago, Estômago)
   - Lista de aulas na sidebar
   - Aula selecionada no main
   - Botão para baixar PDF

### Teste 3: Ver Perfil

1. Clique no menu (canto superior direito)
2. Vá em "Perfil"
3. Veja seus dados pessoais

### Teste 4: Logout

1. Clique "Sair"
2. Você volta para home

### Teste 5: Login como Admin

1. Abra `http://localhost:3000/auth/signin`
2. Cole:
   - **Email**: `dr.alessandro@endostart.com`
   - **Senha**: `admin123456`
3. Clique "Entrar"
4. Redirecionado para `/admin`?
   - ❌ **NÃO** = Veja a seção "Troubleshooting"
5. Você deve ver **Painel de Administração** com:
   - 1 aluno total
   - 1 com acesso
   - Tabela com "João Silva"
   - Botão "Revogar" (já tem acesso)

### Teste 6: Revogar e Conceder Acesso

1. No painel admin, clique "Revogar" ao lado de João Silva
2. Status deve mudar para "Sem Acesso"
3. Clique "Conceder"
4. Status deve voltar para "Com Acesso"

## 🐛 Troubleshooting

### ❌ "Erro: EADDRINUSE: address already in use :::3001"

**Problema**: Backend já rodando em outra janela
**Solução**:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3001
kill -9 <PID>
```

Depois `npm run dev` novamente.

---

### ❌ "Erro ao fazer login" / "Network Error"

**Problema**: Backend não está rodando
**Solução**:
1. Verifique se `npm run dev` está rodando no terminal backend
2. Verifique se mostra `✅ API running on http://localhost:3001`
3. Se não, cheque os erros no terminal

---

### ❌ "Erro: Missing script prisma:seed"

**Problema**: Backend sem scripts configurados
**Solução**: Verifique se `package.json` tem:
```json
"prisma:seed": "ts-node -r tsconfig-paths/register prisma/seed.ts"
```

Se não tiver, adicione à seção `"scripts"`.

---

### ❌ "Environment variable not found: DATABASE_URL"

**Problema**: .env não está sendo lido
**Solução**:
```bash
# Rode com variável de ambiente
cd backend
DATABASE_URL="file:./dev.db" npm run dev
```

Ou crie `.env` no `/backend`:
```
DATABASE_URL="file:./dev.db"
```

---

### ❌ "Página em branco" / "Cannot GET /auth/signin"

**Problema**: Frontend não consegue encontrar as páginas
**Solução**:
1. Verifique se `npm run dev` está rodando (deve ver `Local: http://localhost:3000`)
2. Verifique se a pasta `/src/pages/auth/` existe com `signin.tsx` e `signup.tsx`
3. Clear cache: `Ctrl+Shift+Delete` no navegador

---

### ❌ "Login funciona mas redirecionado pro signin novamente"

**Problema**: Token não está sendo armazenado corretamente
**Solução**:
1. Abra DevTools (`F12`)
2. Vá em `Application` → `Local Storage`
3. Verifique se existe `token` e `user`
4. Se não existir, o backend não retornou token
5. Verifique erro no console do navegador

---

### ❌ Admin login não redireciona para /admin

**Problema**: Hook useAuth não verifica role ADMIN
**Solução**:
1. Verifique se o usuário admin tem `role: ADMIN` no banco
2. Execute:
   ```bash
   cd backend
   DATABASE_URL="file:./dev.db" npx prisma studio
   ```
3. Vá em `User` e verifique se `dr.alessandro@endostart.com` tem `role: ADMIN`
4. Se não, edite manualmente

---

### ❌ "Alunos não aparecem no painel admin"

**Problema**: Seed não foi rodado ou dados deletados
**Solução**:
```bash
cd backend
# Delete e recriar
rm dev.db
DATABASE_URL="file:./dev.db" npm run prisma:seed
```

---

### ❌ "CORS error" no console

**Problema**: Frontend não consegue falar com backend
**Solução**:
1. Verifique se backend tem CORS configurado
2. Em `/backend/src/main.ts`, procure por `cors()`
3. Deve ter `CORS_ORIGIN=http://localhost:3000`

---

## 📊 Dados de Teste

### Cursos Disponíveis

| Curso | ID | Módulos | Status |
|-------|----|---------| -------|
| Imersão em Endoscopia | course_1 | Esôfago, Estômago | Ativo |
| Colonoscopia Avançada | course_2 | — | Ativo |

### Alunos

| Nome | Email | CRM | Acesso |
|------|-------|-----|--------|
| João Silva | medico@example.com | SP654321 | ✅ Sim |

### Admin

| Nome | Email | CRM | Role |
|------|-------|-----|------|
| Alessandro | dr.alessandro@endostart.com | SP123456 | ADMIN |

---

## 🎯 Próximas Funcionalidades

- [ ] Implementar PDF Viewer com react-pdf
- [ ] Sistema de anotações
- [ ] Marcação de aulas como completas
- [ ] Certificados automáticos
- [ ] Vídeo (Vimeo/YouTube) — *futuro*

---

**Última atualização**: Março 2026
