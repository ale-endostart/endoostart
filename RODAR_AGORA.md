# ✅ ENDPOINTS FUNCIONANDO - INSTRUÇÕES FINAIS

## 🚀 PARA RODAR TUDO AGORA:

### **Terminal 1 - BACKEND:**
```powershell
cd C:\TurboOps\Code\backend
$env:DATABASE_URL="file:./dev.db"
npm run dev
```

**Aguarde até ver:**
```
🚀 Server running on port 3001
📚 Health Check: http://localhost:3001/health
```

### **Terminal 2 - FRONTEND:**
```powershell
cd C:\TurboOps\Code\frontend
npm run dev
```

**Aguarde até ver:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

---

## 🌐 LINKS QUE AGORA FUNCIONAM:

- **Landing Page:** http://localhost:3000
- **Login:** http://localhost:3000/auth/signin
- **Criar Conta:** http://localhost:3000/auth/signup
- **Dashboard Aluno:** http://localhost:3000/dashboard
- **Painel Admin:** http://localhost:3000/admin
- **API Health:** http://localhost:3001/health

---

## 📝 CREDENCIAIS DE TESTE

**Aluno:**
- Email: `medico@example.com`
- Senha: `student123456`

**Admin:**
- Email: `dr.alessandro@endostart.com`
- Senha: `admin123456`

---

## 🧪 TESTE O FLUXO:

1. **Abra** http://localhost:3000
2. **Faça login** com email: `medico@example.com` / senha: `student123456`
3. **Veja** o dashboard com seus cursos
4. **Clique** em "Imersão em Endoscopia"
5. **Abra** uma lição e veja PDF + Vídeo funcionando
6. **Logout** e faça login como admin (dr.alessandro@endostart.com)
7. **Acesse** /admin para gerenciar alunos

---

## ⚠️ SE ALGO NÃO FUNCIONAR:

### Porta 3001 ou 3000 em uso?
```powershell
# Mude a porta do backend:
$env:PORT=3002
$env:DATABASE_URL="file:./dev.db"
npm run dev
```

Depois mude `NEXT_PUBLIC_API_URL` no frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### Erro de compilação do TypeScript?
```bash
npm install
```

### Banco com problema?
```bash
cd backend
rm dev.db
rm -r prisma/migrations
DATABASE_URL="file:./dev.db" npx prisma migrate dev --name init
DATABASE_URL="file:./dev.db" npx prisma db seed
```

---

## 📊 VER DADOS DO BANCO:

```bash
cd backend
DATABASE_URL="file:./dev.db" npx prisma studio
```

Acesse **http://localhost:5555**

---

**Tudo pronto! Abra 2 terminais e rode os comandos acima!** 🎉
