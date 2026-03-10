import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

if (!process.env.NEXTAUTH_SECRET) {
  console.warn('NEXTAUTH_SECRET is not defined. Using a generated one for build purposes.')
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('Google OAuth credentials are not defined')
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios')
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          console.error('[Auth Error] NEXT_PUBLIC_API_URL is not configured')
          throw new Error('Erro de configuração do servidor')
        }

        try {
          const response = await fetch(
            `${apiUrl}/api/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )

          if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            const message = errorData?.error || 'Email ou senha inválidos'
            throw new Error(message)
          }

          const data = await response.json()

          if (!data.user || !data.token) {
            throw new Error('Resposta inválida do servidor')
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: `${data.user.firstName} ${data.user.lastName}`,
            image: null,
            role: data.user.role,
            accessToken: data.token,
          }
        } catch (error: any) {
          console.error('[Auth Error]', error?.message || error)
          throw new Error(error?.message || 'Falha na autenticação')
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id_for_build',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret_for_build',
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = (user as any).role
        token.accessToken = (user as any).accessToken
      }

      if (account?.provider === 'google' && user) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL
          if (!apiUrl) {
            console.error('[Google Auth Error] NEXT_PUBLIC_API_URL is not configured')
            return token
          }

          const response = await fetch(
            `${apiUrl}/api/auth/login-google`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                googleId: account.providerAccountId,
                email: user.email,
                name: user.name,
              }),
            }
          )

          if (response.ok) {
            const data = await response.json()
            token.accessToken = data.token
            if (data.user) {
              token.role = data.user.role
            }
          } else {
            console.error('[Google Auth Error] Backend returned', response.status)
          }
        } catch (error) {
          console.error('[Google Auth Error]', error)
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
        ;(session.user as any).email = token.email as string
        ;(session.user as any).role = token.role
      }
      ;(session as any).accessToken = token.accessToken

      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_vercel_builds_123",
    maxAge: 7 * 24 * 60 * 60,
  },
}
