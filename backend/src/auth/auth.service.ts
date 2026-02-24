import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { signToken } from '../common/utils/jwt'

const prisma = new PrismaClient()

export class AuthService {
  async register(data: {
    firstName: string
    lastName: string
    email: string
    password: string
    crm?: string
    phone?: string
    state?: string
  }) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error('User already exists with this email')
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash,
        crm: data.crm,
        phone: data.phone,
        state: data.state,
        role: 'STUDENT',
        hasAccess: false,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    })

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user,
      token,
    }
  }

  async login(email: string, password: string) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    if (!user.passwordHash) {
      throw new Error('User registered with OAuth only')
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      throw new Error('Invalid email or password')
    }

    // Log login activity
    await prisma.activityLog.create({
      data: {
        studentId: user.id,
        eventType: 'LOGIN',
        metadata: JSON.stringify({ timestamp: new Date().toISOString() }),
      },
    })

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    }
  }

  async loginGoogle(googleId: string, email: string, name: string) {
    // Try to find existing user
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId }, { email }],
      },
    })

    // Create user if doesn't exist
    if (!user) {
      const [firstName, ...lastNameParts] = name.split(' ')
      const lastName = lastNameParts.join(' ') || 'User'

      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          googleId,
          role: 'STUDENT',
          hasAccess: false,
        },
      })
    } else if (!user.googleId) {
      // Update existing user with googleId
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      })
    }

    // Log login activity
    await prisma.activityLog.create({
      data: {
        studentId: user.id,
        eventType: 'LOGIN',
        metadata: JSON.stringify({ provider: 'google' }),
      },
    })

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    }
  }
}
