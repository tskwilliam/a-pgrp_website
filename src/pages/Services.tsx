import { useState, useEffect, useRef } from 'react'
import type { PageState } from '../App'
import { services } from '../data'
import { useLang } from '../context/lang'

interface Props {
  navigate: (p: PageState) => void
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}s`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target) }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className="fade-in">{children}</div>
}

export default function Services({ navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const scrolled = -rect.top
      const sectionHeight = rect.height / services.length
      const idx = Math.min(
        Math.max(0, Math.floor(scrolled / sectionHeight)),
        services.length - 1
      )
      setActiveIndex(idx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const active = services[activeIndex]

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Page header */}
      <div style={{ padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem) clamp(2rem,4vw,3rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '0.75rem' }}>
            {zh ? '我们的工作' : 'what we do'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
            {zh ? '服务' : 'services'}
          </h1>
        </div>
      </div>

      {/* Overview */}
      <section style={{ padding: 'clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'start' }}>
            <FadeSection>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 300, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                {zh ? '七大领域，共享一份智慧' : 'seven disciplines, one shared intelligence'}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', letterSpacing: '0.02em', textAlign: 'justify' }}>
                {zh
                  ? '在a+pgrp，我们的工作横跨七个相互关联的领域——从室内细节的亲密感到城市总体规划的广度。每个项目都汲取这些领域的共同智慧，使我们能够提供深思熟虑的、整体性的环境，以回应其所处的特定文化、气候与社区。'
                  : "at a+pgrp, our work spans seven interrelated disciplines — from the intimacy of interior detailing to the breadth of urban masterplanning. each project draws on a shared intelligence across these fields, allowing us to deliver thoughtful, integrated environments that respond to the specific cultures, climates, and communities they inhabit."}
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Immersive scroll section */}
      <div ref={containerRef} style={{ position: 'relative', height: `${services.length * 100}vh` }}>
        {/* Sticky viewport */}
        <div
          style={{
            position: 'sticky',
            top: '56px',
            height: 'calc(100vh - 56px)',
            overflow: 'hidden',
          }}
        >
          {/* Background images */}
          {services.map((s, i) => (
            <div
              key={s.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === activeIndex ? 1 : 0,
                transition: 'opacity 0.8s ease',
                backgroundColor: '#212529',
              }}
            >
              <img
                src={s.imageUrl}
                alt={s.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)' }} />
            </div>
          ))}

          {/* Content overlay */}
          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem)' }}>
            <div style={{ maxWidth: '900px' }}>
              <h2
                key={active.id}
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  fontWeight: 200,
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '2rem',
                  animation: 'serviceSlideIn 0.6s ease forwards',
                }}
              >
                {zh ? active.zhName : active.name}
              </h2>

              <p
                key={`desc-${active.id}`}
                style={{
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: '560px',
                  letterSpacing: '0.02em',
                  marginBottom: '2.5rem',
                  animation: 'serviceSlideIn 0.6s ease 0.1s both',
                }}
              >
                {zh ? active.zhDescription : active.description}
              </p>

              <button
                onClick={() => navigate({ id: 'projects', filter: active.relatedCategory })}
                style={{
                  padding: '0.75rem 1.75rem',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.45)',
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  fontFamily: 'inherit',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)' }}
              >
                {zh ? '查看相关项目 →' : 'view related projects →'}
              </button>
            </div>

            {/* Progress bar */}
            <div
              style={{
                position: 'absolute',
                right: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {services.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    width: '2px',
                    height: i === activeIndex ? '28px' : '12px',
                    backgroundColor: i === activeIndex ? '#b4906e' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.4s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              right: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
              <path d="M6 0v18M1 13l5 5 5-5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes serviceSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
