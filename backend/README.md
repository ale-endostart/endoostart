# EndoStart API Backend

API backend para a plataforma EndoStart construída com Node.js, Express e Prisma.

## 🚀 Início Rápido

```bash
# Install
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local com suas credenciais

# Database setup
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Development
npm run dev
# http://localhost:3001
```

## 📦 Dependências Principais

- **express**: Web framework
- **prisma**: ORM para PostgreSQL
- **next-auth**: Autenticação
- **jsonwebtoken**: JWT tokens
- **bcryptjs**: Password hashing
- **multer**: File uploads
- **zod**: Schema validation
- **passport**: OAuth strategies

## 🏗️ Estrutura

```
src/
├── main.ts              # Entry point
├── config/              # Configurações (DB, env, CORS)
├── auth/                # Autenticação
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.routes.ts
│   ├── guards/
│   └── strategies/
├── students/            # Gerenciamento de alunos
├── courses/             # Cursos
├── lessons/             # Aulas
├── content/             # PDFs e vídeos
├── analytics/           # Rastreamento de eventos
└── common/              # Middleware, decorators, etc
```

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - User atual

### Courses
- `GET /api/courses` - Listar cursos
- `GET /api/courses/:id` - Detalhes do curso
- `GET /api/courses/:id/modules` - Módulos

### Admin
- `GET /api/admin/students` - Lista de alunos
- `PUT /api/admin/students/:id/access` - Grant/revoke access

## 🔐 Autenticação

Usa JWT tokens com NextAuth. Todas as rotas protegidas requerem header:
```
Authorization: Bearer {token}
```

## 📝 Migrations

```bash
# Create migration
npm run prisma:migrate

# View changes
npm run prisma:studio

# Reset database
npx prisma migrate reset
```

## 🧪 Testing

```bash
npm run test
npm run test:cov
```

## 📊 Database

PostgreSQL com Prisma ORM. Schema definido em `prisma/schema.prisma`.

## 🚀 Deployment

```bash
# Build
npm run build

# Start
npm start
```

Suporta Railway, AWS EC2, Fly.io, etc.

---

Ver `../CLAUDE.md` para arquitetura completa.
