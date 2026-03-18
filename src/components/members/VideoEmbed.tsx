'use client'

interface VideoEmbedProps {
  url: string
  title?: string
  type?: 'youtube' | 'vimeo'
}

function getVideoId(url: string, type: 'youtube' | 'vimeo'): string | null {
  if (type === 'youtube') {
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    const match = url.match(youtubeRegex)
    return match ? match[1] : null
  }

  if (type === 'vimeo') {
    const vimeoRegex = /vimeo\.com\/(\d+)/
    const match = url.match(vimeoRegex)
    return match ? match[1] : null
  }

  return null
}

export function VideoEmbed({ url, title, type = 'youtube' }: VideoEmbedProps) {
  const videoId = getVideoId(url, type)

  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-neutral-200 rounded-lg flex items-center justify-center">
        <p className="text-neutral-600">Vídeo indisponível</p>
      </div>
    )
  }

  const iframeSrc =
    type === 'youtube'
      ? `https://www.youtube.com/embed/${videoId}`
      : `https://player.vimeo.com/video/${videoId}`

  return (
    <div className="space-y-3">
      {title && <h3 className="font-semibold text-neutral-900">{title}</h3>}
      <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src={iframeSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
