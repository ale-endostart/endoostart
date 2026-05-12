import { Sidebar } from '@/components/common/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="pt-14 px-4 pb-6 lg:pt-8 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
