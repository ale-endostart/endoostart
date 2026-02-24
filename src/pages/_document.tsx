import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Meta Tags for SEO */}
        <meta
          name="description"
          content="EndoStart - Transforme sua carreira médica. Aprenda endoscopia com Dr. Alessandro e fature até R$ 2.000 por procedimento de 30 minutos."
        />
        <meta name="keywords" content="endoscopia, carreira médica, curso, imersão prática" />
        <meta name="author" content="EndoStart" />

        {/* Open Graph */}
        <meta property="og:title" content="EndoStart - Abandone o plantão de 12h" />
        <meta
          property="og:description"
          content="Aprenda endoscopia com Dr. Alessandro e fature até R$ 2.000 por procedimento de 30 minutos."
        />
        <meta property="og:type" content="website" />

        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' font-weight='bold' fill='%230284c7'>ES</text></svg>" />
      </Head>
      <body className="bg-neutral-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
