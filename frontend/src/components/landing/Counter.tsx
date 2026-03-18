'use client'

import { useRef, useState, useEffect } from 'react'

export default function Counter({
  target,
  suffix = '',
  prefix = '',
  className = '',
}: {
  target: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2200
          const startTime = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 4)
            setCount(Math.round(target * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
