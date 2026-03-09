# 🚀 Guia de Deployment - EndoStart Platform

## Ambiente: Produção Final para Cliente Testar

### 📋 Pré-requisitos
- Conta Vercel (para frontend)
- Conta Railway ou Render (para backend)
- Conta Supabase (PostgreSQL)
- Domínio (ex: endostart.com.br)
- Google OAuth credentials (para login)

---

## 1️⃣ Banco de Dados - Supabase PostgreSQL

### Já Configurado:
```
DATABASE_URL=postgresql://postgres:inWTneSjLLM6UsW3@db.kmsvfakkgdwbfdlfbsqw.supabase.co:5432/postgres
```

### Próximos passos:
1. Acessar Supabase Dashboard
2. Rodar migrations:
```bash
cd backend
npm install
DATABASE_URL="postgresql://postgres:inWTneSjLLM6UsW3@db.kmsvfakkgdwbfdlfbsqw.supabase.co:5432/postgres" npx prisma migrate deploy
DATABASE_URL="postgresql://postgres:inWTneSjLLM6UsW3@db.kmsvfakkgdwbfdlfbsqw.supabase.co:5432/postgres" npm run prisma:seed
```

---

## 2️⃣ Backend - Railway/Render

### Opção A: Railway (Recomendado)
1. Acessar railway.app
2. Conectar repositório GitHub
3. Criar novo projeto
4. Selecionar serviço Node.js
5. Configurar Environment Variables:

```env
DATABASE_URL=postgresql://postgres:inWTneSjLLM6UsW3@db.kmsvfakkgdwbfdlfbsqw.supabase.co:5432/postgres
CORS_ORIGIN=https://endostart.com.br
JWT_SECRET=seu-secret-muito-seguro-aqui
JWT_EXPIRY=7d
PORT=3001
NODE_ENV=production
```

6. Build Command: `cd backend && npm install && npm run build`
7. Start Command: `cd backend && npm start`
8. Railway fornecerá URL: `https://backend-xyz.railway.app`

### Opção B: Render
1. Acessar render.com
2. Conectar GitHub
3. Criar Web Service
4. Apontar para `backend/` directory
5. Configurar mesmas env vars acima
6. Deploy automático ao fazer push

---

## 3️⃣ Frontend - Vercel

### Deploy:
1. Acessar vercel.com
2. Conectar repositório GitHub (pasta raiz do projeto)
3. Configurar Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://backend-xyz.railway.app
NEXTAUTH_URL=https://endostart.com.br
NEXTAUTH_SECRET=seu-secret-muito-seguro-aqui
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

4. Build Settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Vercel fornecerá URL: `https://endostart.vercel.app`
6. Apontar domínio para Vercel (CNAME/A records)

---

## 4️⃣ Domínio Custom

### Configurar em Registrador (ex: GoDaddy, Namecheap):
1. Apontar NS ou CNAME para Vercel
2. Vercel fornecerá DNS records para copiar
3. Aguardar propagação (5-30 min)

---

## 5️⃣ Google OAuth - Credenciais

1. Google Cloud Console: console.cloud.google.com
2. Criar projeto
3. Ir para "Credenciais"
4. Criar "OAuth 2.0 Client ID"
5. Adicionar URIs autorizadas:
   - http://localhost:3000 (dev)
   - https://endostart.com.br (prod)
   - https://endostart.vercel.app (preview)

6. Copiar Client ID e Secret para env vars do Vercel

---

## 6️⃣ Testar em Produção

### Credenciais de Teste:

**Admin:**
- Email: dr.alessandro@endostart.com
- Senha: admin123456

**Aluno:**
- Email: medico@example.com
- Senha: student123456

### URLs:
- Landing: https://endostart.com.br
- Login Admin: https://endostart.com.br/auth/signin
- Dashboard Admin: https://endostart.com.br/admin
- Dashboard Aluno: https://endostart.com.br/dashboard

---

## 7️⃣ Monitoramento

### Logs Backend:
- Railway: Dashboard → Service → Logs
- Render: Service → Logs

### Logs Frontend:
- Vercel: Deployments → Logs
- Browser Console (F12)

### Erros:
- Check `/api/health` no backend (deve retornar `{"status": "OK"}`)

---

## 8️⃣ Atualizações Futuras

Qualquer change no GitHub será automaticamente deployado:
- **Frontend**: Vercel (ao fazer push em main)
- **Backend**: Railway/Render (ao fazer push em main)

Para desabilitar auto-deploy:
- Vercel: Project Settings → Git → Uncheck "Automatically deploy"
- Railway/Render: Service Settings → Disable auto-deploy

---

## ⚠️ Checklist Final

- [ ] Supabase migrations rodadas
- [ ] Seed data inserido
- [ ] Backend rodando em Railway/Render
- [ ] Frontend deployado em Vercel
- [ ] Domínio apontando para Vercel
- [ ] Env vars configuradas corretamente
- [ ] Google OAuth funcionando
- [ ] WhatsApp links testados
- [ ] PDFs carregando no visualizador
- [ ] Login/Signup funcionando
- [ ] Admin painel acessível
- [ ] Dashboard de alunos acessível
- [ ] CustomCursor apenas na landing page

---

## 🆘 Troubleshooting

### "Erro 401 ao fazer login"
- Verificar se backend está online
- Verificar `NEXT_PUBLIC_API_URL` no Vercel
- Limpar localStorage do browser

### "Banco de dados não conectando"
- Verificar `DATABASE_URL` no backend
- Testar conexão: `npx prisma studio`
- Verificar IPs permitidos no Supabase

### "PDF não carregando"
- Verificar se arquivo foi feito upload
- Verificar CORS do backend
- Abrir DevTools e checar Network tab

### "CustomCursor aparecendo na area de membros"
- Verificar se está só importado em `/src/pages/index.tsx`
- Verificar `_app.tsx` não o importa

---

Qualquer dúvida, contatar o time de suporte! 🚀
