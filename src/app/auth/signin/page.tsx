'use client'

import React, { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // NextAuth wraps the error message from authorize()
        const errorMessage = result.error === 'CredentialsSignin'
          ? 'Email ou senha inválidos'
          : result.error
        setError(errorMessage)
      } else if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique sua conexão.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">EndoStart</h1>
          <p className="text-primary-200">Acesse sua conta</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
              Criar conta
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-primary-200 text-sm">
          © 2024 EndoStart. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}

export default function SignIn() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    }>
      <SignInForm />
    </React.Suspense>
  )
}
