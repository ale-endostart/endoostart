'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Settings {
  platformName: string
  logoUrl: string
  faviconUrl: string
  primaryColor: string
  accentColor: string
  footerText: string
  whatsappNumber: string
}

export default function AdminSettings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>({
    platformName: 'EndoStart', logoUrl: '', faviconUrl: '', primaryColor: '#16a34a', accentColor: '#22c55e', footerText: '', whatsappNumber: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user || session?.user?.role !== 'ADMIN') { router.push('/dashboard'); return }
    fetchSettings()
  }, [session, status])

  const token = (session as any)?.accessToken

  async function fetchSettings() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch (err) { console.error(err) } finally { setIsLoading(false) }
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setSuccess('Configuracoes salvas com sucesso!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const d = await res.json()
        setError(d.error || 'Erro ao salvar')
      }
    } catch { setError('Erro ao salvar configuracoes') } finally { setSaving(false) }
  }

  if (isLoading) return <div className="flex items-center justify-center h-96"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Configuracoes</h1>
        <p className="text-neutral-500 text-sm mt-1">Personalize sua area de membros</p>
      </div>

      {success && <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">{success}</div>}
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      <form onSubmit={saveSettings} className="space-y-6">
        {/* General */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">Geral</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nome da Plataforma</label>
            <input type="text" value={settings.platformName} onChange={e => setSettings({...settings, platformName: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Numero WhatsApp</label>
            <input type="text" value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="5562991980100" />
            <p className="text-xs text-neutral-400 mt-1">Formato: codigo do pais + DDD + numero (sem espacos ou tracos)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Texto do Rodape</label>
            <input type="text" value={settings.footerText} onChange={e => setSettings({...settings, footerText: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="© 2026 EndoStart. Todos os direitos reservados." />
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">Marca</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">URL do Logo</label>
            <input type="text" value={settings.logoUrl} onChange={e => setSettings({...settings, logoUrl: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="https://..." />
            {settings.logoUrl && (
              <div className="mt-3 p-4 bg-neutral-900 rounded-lg inline-block">
                <img src={settings.logoUrl} alt="Logo preview" className="h-10 object-contain" onError={e => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">URL do Favicon</label>
            <input type="text" value={settings.faviconUrl} onChange={e => setSettings({...settings, faviconUrl: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="https://..." />
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">Cores</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Cor Primaria</label>
              <div className="flex items-center gap-3">
                <input type="color" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                  className="w-10 h-10 rounded-lg border border-neutral-200 cursor-pointer" />
                <input type="text" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                  className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Cor de Destaque</label>
              <div className="flex items-center gap-3">
                <input type="color" value={settings.accentColor} onChange={e => setSettings({...settings, accentColor: e.target.value})}
                  className="w-10 h-10 rounded-lg border border-neutral-200 cursor-pointer" />
                <input type="text" value={settings.accentColor} onChange={e => setSettings({...settings, accentColor: e.target.value})}
                  className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm font-mono" />
              </div>
            </div>
          </div>
          {/* Preview */}
          <div className="p-4 rounded-lg border border-neutral-200">
            <p className="text-xs text-neutral-500 mb-2">Preview</p>
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: settings.primaryColor }}>Botao Primario</div>
              <div className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: settings.accentColor }}>Botao Destaque</div>
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
          {saving ? 'Salvando...' : 'Salvar Configuracoes'}
        </button>
      </form>
    </div>
  )
}
