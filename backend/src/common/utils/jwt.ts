import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('CRITICAL: JWT_SECRET environment variable must be set')
}
const JWT_EXPIRY = process.env.JWT_EXPIRY || process.env.JWT_EXPIRATION || '7d'

export interface TokenPayload {
  userId: string
  role: string
  email: string
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: JWT_EXPIRY as string,
  } as any)
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET!) as TokenPayload
    return payload
  } catch (error) {
    return null
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.decode(token) as TokenPayload
    return payload
  } catch (error) {
    return null
  }
}
