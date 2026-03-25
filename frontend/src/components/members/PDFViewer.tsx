'use client'

interface PDFViewerProps {
  url: string
  title?: string
  onDownload?: () => void
}

export function PDFViewer({ url, title, onDownload }: PDFViewerProps) {
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex-1">
          {title && <h3 className="font-semibold text-neutral-900">{title}</h3>}
        </div>

        {onDownload && (
          <button
            onClick={onDownload}
            className="px-3 py-1 bg-accent-600 hover:bg-accent-700 text-white rounded font-semibold text-sm"
          >
            Baixar
          </button>
        )}
      </div>

      {/* Viewer */}
      <iframe
        src={url}
        className="flex-1 w-full min-h-[600px] border-0"
        allow="autoplay"
        allowFullScreen
      />
    </div>
  )
}
