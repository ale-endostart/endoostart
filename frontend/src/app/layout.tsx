import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'EndoStart - Imersao em Endoscopia',
  description:
    'Abandone o plantao de 12h. Fature ate R$ 2.000 por procedimento de 30 minutos. Imersao em endoscopia com o Dr. Alessandro.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'EndoStart - Imersao em Endoscopia',
    description: 'Plataforma de educacao para imersao em endoscopia do Dr. Alessandro',
    url: 'https://endostart.com.br',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
