import { Router } from 'express'
import { z } from 'zod'
import { AuthController } from './auth.controller'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const authController = new AuthController()

// Validation schemas
const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  crm: z.string().optional(),
  phone: z.string().optional(),
  state: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const loginGoogleSchema = z.object({
  googleId: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
})

// Routes
router.post('/register', validateRequest(registerSchema), (req, res) => authController.register(req, res))
router.post('/login', validateRequest(loginSchema), (req, res) => authController.login(req, res))
router.post('/login-google', validateRequest(loginGoogleSchema), (req, res) => authController.loginGoogle(req, res))

export default router
