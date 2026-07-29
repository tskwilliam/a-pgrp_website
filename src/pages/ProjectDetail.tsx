import { useState, useRef, useEffect } from 'react'
import type { PageState } from '../App'
import { projects } from '../data'
import { useLang } from '../context/lang'

interface Props {
  slug: string
  navigate: (p: PageState) => void
}

const THUMB_SIZE = 96        // px — square thumbnail width/height
const THUMB_GAP = 6          // px — gap between thumbnails
const THUMBS_VISIBLE = 7     // number of thumbnails shown at once in the ribbon
const RIBBON_TRACK_W = THUMBS_VISIBLE * THUMB_SIZE + (THUMBS_VISIBLE - 1) * THUMB_GAP // 540px

function ArrowBtn({ onClick, dir, style }: { onClick: () => void; dir: 'left' | 'right'; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'left' ? 'previous' : 'next'}
      style={{
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.22)',
        backdropFilter: 'blur(6px)',
        cursor: 'pointer',
        width: '40px', height: '40px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#ffffff',
        transition: 'background 0.18s ease',
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {dir === 'left'
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}

function ImageSlideshow({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [ribbonOffset, setRibbonOffset] = useState(0)
  const ribbonRef = useRef<HTMLDivElement>(null)

  const STEP = THUMB_SIZE + THUMB_GAP

  useEffect(() => {
    const targetOffset = current * STEP - RIBBON_TRACK_W / 2 + THUMB_SIZE / 2
    const total = images.length * STEP - THUMB_GAP
    const max = Math.max(0, total - RIBBON_TRACK_W)
    setRibbonOffset(Math.max(0, Math.min(max, targetOffset)))
  }, [current, images.length])

  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen, current, fading])

  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [fullscreen])

  if (images.length === 0) return null

  const go = (dir: 1 | -1) => {
    if (fading) return
    setFading(true)
    setTimeout(() => {
      setCurrent((c) => (c + dir + images.length) % images.length)
      setFading(false)
    }, 200)
  }

  const goTo = (i: number) => {
    if (fading || i === current) return
    setFading(true)
    setTimeout(() => { setCurrent(i); setFading(false) }, 200)
  }

  const totalRibbonWidth = images.length * STEP - THUMB_GAP
  const maxOffset = Math.max(0, totalRibbonWidth - RIBBON_TRACK_W)
  const scrollRibbon = (dir: 1 | -1) => {
    setRibbonOffset((o) => Math.max(0, Math.min(maxOffset, o + dir * STEP * 3)))
  }

  const ThumbnailRibbon = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', width: 'fit-content', margin: '8px auto 0' }}>
      <button
        onClick={() => scrollRibbon(-1)}
        aria-label="scroll thumbnails left"
        style={{
          flexShrink: 0, width: '28px', height: THUMB_SIZE + 'px',
          background: 'none', border: 'none',
          cursor: ribbonOffset > 0 ? 'pointer' : 'default',
          color: ribbonOffset > 0 ? '#212529' : '#ced4da',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, transition: 'color 0.2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div ref={ribbonRef} style={{ width: RIBBON_TRACK_W + 'px', flexShrink: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: `${THUMB_GAP}px`, transform: `translateX(-${ribbonOffset}px)`, transition: 'transform 0.35s ease' }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`view image ${i + 1}`}
              style={{
                flexShrink: 0,
                width: THUMB_SIZE + 'px', height: THUMB_SIZE + 'px',
                padding: 0, border: 'none', cursor: 'pointer',
                overflow: 'hidden',
                opacity: i === current ? 1 : 0.45,
                transition: 'opacity 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => { if (i !== current) e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={(e) => { if (i !== current) e.currentTarget.style.opacity = '0.45' }}
            >
              <img src={src} alt={`thumbnail ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {i === current && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#b4906e' }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollRibbon(1)}
        aria-label="scroll thumbnails right"
        style={{
          flexShrink: 0, width: '28px', height: THUMB_SIZE + 'px',
          background: 'none', border: 'none',
          cursor: ribbonOffset < maxOffset ? 'pointer' : 'default',
          color: ribbonOffset < maxOffset ? '#212529' : '#ced4da',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, transition: 'color 0.2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )

  return (
    <>
      <div style={{ maxWidth: '900px', margin: '0 auto', userSelect: 'none' }}>
        <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden', backgroundColor: '#e9ecef' }}>
          <img
            src={images[current]}
            alt={`${title} — ${current + 1}`}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />

          {images.length > 1 && (
            <>
              <ArrowBtn dir="left" onClick={() => go(-1)} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)' }} />
              <ArrowBtn dir="right" onClick={() => go(1)} style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)' }} />
            </>
          )}

          <button
            onClick={() => setFullscreen(true)}
            aria-label="view fullscreen"
            style={{
              position: 'absolute', bottom: '0.75rem', right: '0.75rem',
              background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)', cursor: 'pointer', padding: '7px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', transition: 'background 0.18s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>

          <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.75)', background: 'rgba(0,0,0,0.4)', padding: '3px 8px' }}>
            {current + 1} / {images.length}
          </div>
        </div>

        {images.length > 1 && <ThumbnailRibbon />}
      </div>

      {fullscreen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            backgroundColor: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setFullscreen(false) }}
        >
          <button
            onClick={() => setFullscreen(false)}
            aria-label="close fullscreen"
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', zIndex: 1,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div style={{ position: 'absolute', top: '1.4rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>
            {current + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <ArrowBtn dir="left" onClick={() => go(-1)} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
          )}

          <img
            src={images[current]}
            alt={`${title} — ${current + 1}`}
            style={{
              maxWidth: 'calc(100vw - 8rem)',
              maxHeight: 'calc(100vh - 6rem)',
              objectFit: 'contain',
              display: 'block',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />

          {images.length > 1 && (
            <ArrowBtn dir="right" onClick={() => go(1)} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
          )}
        </div>
      )}
    </>
  )
}

export default function ProjectDetail({ slug, navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div style={{ padding: '8rem clamp(2rem,5vw,6rem)', textAlign: 'center' }}>
        <p style={{ color: '#9AA3AC', fontSize: '0.85rem' }}>{zh ? '未找到该项目。' : 'project not found.'}</p>
        <button onClick={() => navigate({ id: 'projects' })} style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.08em', textDecoration: 'underline', fontFamily: 'inherit' }}>
          {zh ? '返回全部项目' : 'back to projects'}
        </button>
      </div>
    )
  }

  const images = project.images ?? []
  const bannerImage = images[0] ?? ''
  const galleryImages = images.slice(1)

  const idx = projects.findIndex((p) => p.slug === slug)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const related = projects.filter((p) => project.related.includes(p.slug)).slice(0, 2)

  const meta = [
    { label: zh ? '地点' : 'location', value: zh ? (project.zhLocation ?? project.location) : project.location },
    { label: zh ? '年份' : 'year', value: project.year },
    { label: zh ? '类型' : 'type', value: zh ? project.zhType : project.type },
    { label: zh ? '状态' : 'status', value: zh
      ? (project.status === 'completed' ? '已竣工' : '进行中')
      : project.status
    },
    ...(project.client ? [{ label: zh ? '客户' : 'client', value: project.client }] : []),
  ]

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Banner image */}
      <div style={{ height: 'clamp(400px, 65vh, 700px)', backgroundColor: '#212529', overflow: 'hidden', position: 'relative' }}>
        <img
          src={bannerImage}
          alt={zh ? project.zhTitle : project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: 'clamp(2rem,5vw,6rem)', right: '2rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
            {zh ? project.zhType : project.type}
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            {zh ? project.zhTitle : project.title}
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.5rem', letterSpacing: '0.04em' }}>
            {zh ? (project.zhLocation ?? project.location) : project.location}
          </p>
        </div>
      </div>

      {/* Meta + description */}
      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'start' }}>
            <div>
              {meta.map((m) => (
                <div key={m.label} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #dee2e6' }}>
                  <span style={{ fontSize: '0.65rem', color: '#b4906e', letterSpacing: '0.1em', width: '80px', flexShrink: 0 }}>{m.label}</span>
                  <span style={{ fontSize: '0.78rem', color: '#495057', letterSpacing: '0.04em' }}>{m.value}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.95, color: '#495057', letterSpacing: '0.02em' }}>
                {zh ? project.zhDescription : project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery slideshow */}
      {galleryImages.length > 0 && (
        <section style={{ padding: '0 0 clamp(5rem,9vw,8rem)' }}>
          <div style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
            <ImageSlideshow images={galleryImages} title={zh ? project.zhTitle : project.title} />
          </div>
        </section>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid #dee2e6', padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
          <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '2.5rem' }}>
              {zh ? '相关项目' : 'related projects'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {related.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => navigate({ id: 'project-detail', slug: p.slug })}
                  style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  <div className="img-zoom" style={{ aspectRatio: '1/1', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                    <img src={p.images?.[0] ?? ''} alt={zh ? p.zhTitle : p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 400, letterSpacing: '0.01em', marginBottom: '0.25rem', color: '#212529' }}>
                      {zh ? p.zhTitle : p.title}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#9AA3AC', letterSpacing: '0.05em' }}>
                      {zh ? (p.zhLocation ?? p.location) : p.location}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <div style={{ borderTop: '1px solid #dee2e6', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <button
          onClick={() => navigate({ id: 'project-detail', slug: prev.slug })}
          style={{ background: 'none', border: 'none', borderRight: '1px solid #dee2e6', cursor: 'pointer', padding: '2rem', textAlign: 'left', fontFamily: 'inherit', transition: 'background-color 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
            {zh ? '← 上一个项目' : '← previous'}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#212529', letterSpacing: '0.02em' }}>
            {zh ? prev.zhTitle : prev.title}
          </p>
        </button>
        <button
          onClick={() => navigate({ id: 'project-detail', slug: next.slug })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2rem', textAlign: 'right', fontFamily: 'inherit', transition: 'background-color 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
            {zh ? '下一个项目 →' : 'next →'}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#212529', letterSpacing: '0.02em' }}>
            {zh ? next.zhTitle : next.title}
          </p>
        </button>
      </div>
    </div>
  )
}
