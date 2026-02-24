# 🚀 QuickStart - EndoStart Local (Sem Docker)

## ✅ Status Atual

✓ Banco de dados SQLite criado e populado
✓ Backend com todas as APIs implementadas
✓ Frontend com autenticação e painel de membros
✓ Seed com dados de teste

---

## 🎯 3 LINHAS PARA RODAR TUDO:

### Terminal 1: Backend
```bash
cd C:\TurboOps\Code\backend
$env:DATABASE_URL="file:./dev.db"; npm run dev
```

### Terminal 2: Frontend
```bash
cd C:\TurboOps\Code\frontend
npm run dev
```

✅ **Pronto! Tudo em localhost:3000 e localhost:3001**

---

## 📝 Credenciais de Teste

**Aluno:**
- Email: medico@example.com
- Senha: student123456

**Admin:**
- Email: dr.alessandro@endostart.com
- Senha: admin123456

---

## 🌐 URLs

- http://localhost:3000 → Landing page
- http://localhost:3000/dashboard → Portal de membros
- http://localhost:3000/admin → Painel admin
- http://localhost:3001/health → Testar API
- http://localhost:5555 → Prisma Studio (banco)

---

## ✨ O Que Foi Implementado

✓ Landing page com ROI Calculator
✓ Autenticação (email + Google OAuth)
✓ Portal de membros com cursos
✓ PDF viewer integrado
✓ Video embed (YouTube/Vimeo)
✓ Painel admin
✓ APIs completas (Auth, Courses, Content, etc)
✓ Banco SQLite com seed

---

## 📊 Para Visualizar Banco

```bash
cd backend
DATABASE_URL="file:./dev.db" npx prisma studio
```

Acesse http://localhost:5555

---

**Está pronto! Abra 2 terminais e rode os comandos acima.**
