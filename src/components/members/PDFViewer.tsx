'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title?: string
  onDownload?: () => void
}

export function PDFViewer({ url, title, onDownload }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1)
  }

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1)
  }

  return (
    <div className="flex flex-col h-full bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex-1">
          {title && <h3 className="font-semibold text-neutral-900">{title}</h3>}
          {numPages && (
            <p className="text-sm text-neutral-600">
              Página {pageNumber} de {numPages}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber === 1}
            className="px-3 py-1 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded font-semibold text-sm"
          >
            ← Anterior
          </button>

          <button
            onClick={goToNextPage}
            disabled={!numPages || pageNumber === numPages}
            className="px-3 py-1 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded font-semibold text-sm"
          >
            Próxima →
          </button>

          {onDownload && (
            <button
              onClick={onDownload}
              className="px-3 py-1 bg-accent-600 hover:bg-accent-700 text-white rounded font-semibold text-sm"
            >
              ⬇️ Baixar
            </button>
          )}
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        {isLoading && (
          <div className="text-center">
            <p className="text-neutral-600">Carregando PDF...</p>
          </div>
        )}

        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  )
}
