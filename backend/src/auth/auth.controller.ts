import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.register(req.body)
      res.status(201).json({
        message: 'User registered successfully',
        ...result,
      })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      const result = await authService.login(email, password)
      res.json(result)
    } catch (error: any) {
      res.status(401).json({ error: error.message })
    }
  }

  async loginGoogle(req: Request, res: Response): Promise<void> {
    try {
      const { googleId, email, name } = req.body
      const result = await authService.loginGoogle(googleId, email, name)
      res.json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
