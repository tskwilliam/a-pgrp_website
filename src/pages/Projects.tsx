import { useState, useEffect, useRef } from 'react'
import type { PageState } from '../App'
import { projects } from '../data'
import { useLang } from '../context/lang'

interface Props {
  navigate: (p: PageState) => void
  initialFilter?: string
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
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className="fade-in">{children}</div>
}

export default function Projects({ navigate, initialFilter }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [active, setActive] = useState(initialFilter || 'all')

  const filters = [
    { key: 'all', en: 'all', zh: '全部' },
    { key: 'commercial', en: 'commercial', zh: '商业' },
    { key: 'industrial', en: 'industrial', zh: '工业' },
    { key: 'residential', en: 'residential', zh: '住宅' },
    { key: 'hospitality', en: 'hospitality', zh: '酒店' },
    { key: 'institutional', en: 'institutional', zh: '公共建筑' },
    { key: 'masterplanning', en: 'masterplanning', zh: '总体规划' },
    { key: 'landscape', en: 'landscape', zh: '景观' },
  ]

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.tags.includes(active))

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div
        style={{
          padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem) clamp(2rem,4vw,3rem)',
          borderBottom: '1px solid #dee2e6',
        }}
      >
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '0.75rem' }}>
            {zh ? '作品集' : 'portfolio'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '2.5rem' }}>
            {zh ? '项目' : 'projects'}
          </h1>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                style={{
                  padding: '0.5rem 1.1rem',
                  border: `1px solid ${active === f.key ? '#212529' : '#dee2e6'}`,
                  backgroundColor: active === f.key ? '#212529' : 'transparent',
                  color: active === f.key ? '#ffffff' : '#9AA3AC',
                  cursor: 'pointer',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                }}
              >
                {zh ? f.zh : f.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem) clamp(5rem,9vw,8rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <p style={{ color: '#9AA3AC', fontSize: '0.85rem', letterSpacing: '0.04em', padding: '3rem 0' }}>
              {zh ? '该分类下暂无项目。' : 'no projects found in this category.'}
            </p>
          ) : (
            <div
              className="projects-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
                gap: '2.5rem 2rem',
              }}
            >
              {filtered.map((p, i) => (
                <FadeSection key={p.slug} delay={i * 0.06}>
                  <button
                    onClick={() => navigate({ id: 'project-detail', slug: p.slug })}
                    style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                    aria-label={`view ${p.title}`}
                  >
                    <div className="img-zoom" style={{ aspectRatio: '1/1', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                      <img
                        src={p.images[0]}
                        alt={zh ? p.zhTitle : p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ paddingTop: '1.1rem' }}>
                      <p style={{ fontSize: '0.95rem', fontWeight: 400, letterSpacing: '0.01em', marginBottom: '0.3rem', color: '#212529' }}>
                        {zh ? p.zhTitle : p.title}
                      </p>
                      <p style={{ fontSize: '0.72rem', color: '#9AA3AC', letterSpacing: '0.06em' }}>
                        {zh ? (p.zhLocation ?? p.location) : p.location}
                      </p>
                    </div>
                  </button>
                </FadeSection>
              ))}
            </div>
          )}
        </div>
      </section>
      <style>{`
        @media (max-width: 767px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
        }
      `}</style>
    </div>
  )
}
