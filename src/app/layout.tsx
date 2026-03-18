import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'EndoStart - Imersão em Endoscopia',
  description:
    'Abandone o plantão de 12h. Fature até R$ 2.000 por procedimento de 30 minutos. Imersão em endoscopia com o Dr. Alessandro.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'EndoStart - Imersão em Endoscopia',
    description: 'Plataforma de educação para imersão em endoscopia do Dr. Alessandro',
    url: 'https://endostart.com.br',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
