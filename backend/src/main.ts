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
import adminRoutes from './admin/admin.routes'

const prisma = new PrismaClient()
const app = express()

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
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
