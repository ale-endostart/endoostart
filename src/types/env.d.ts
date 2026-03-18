declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string
    readonly NEXT_PUBLIC_WHATSAPP_NUMBER: string
    readonly NEXTAUTH_URL: string
    readonly NEXTAUTH_SECRET: string
    readonly GOOGLE_CLIENT_ID: string
    readonly GOOGLE_CLIENT_SECRET: string
  }
}
