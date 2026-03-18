import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { PrismaClient } from '@prisma/client'

// Import routes
import authRoutes from './auth/auth.routes'
import coursesRoutes from './courses/courses.routes'
import contentRoutes from './content/content.routes'
import studentsRoutes from './students/students.routes'
import analyticsRoutes from './analytics/analytics.routes'
import commentRoutes from './comments/comment.routes'
import adminRoutes from './admin/admin.routes'

const prisma = new PrismaClient()
const app = express()

// Middleware - CORS com múltiplas origens
const allowedOrigins = [
  'https://www.endostart.app.br',
  'https://endostart.app.br',
  'https://endostart-qg53.vercel.app',
  'http://localhost:3000',
]

// Adiciona origens extras da variável de ambiente (separadas por vírgula)
if (process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN.split(',').forEach(origin => {
    const trimmed = origin.trim()
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed)
    }
  })
}

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sem origin (mobile apps, Postman, health checks)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn(`CORS blocked: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/admin', adminRoutes)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  })
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📚 Health Check: http://localhost:${PORT}/health`)
  console.log(`📝 API Endpoints:`)
  console.log(`   - Auth: POST /api/auth/register, /login, /login-google`)
  console.log(`   - Courses: GET /api/courses, /api/courses/:courseId/modules`)
  console.log(`   - Students: GET /api/students/profile, /courses, /progress`)
  console.log(`   - Admin: GET /api/admin/students, POST /api/admin/students/:id/grant`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})
