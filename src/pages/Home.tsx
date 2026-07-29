import { useEffect, useRef, useState } from 'react'
import type { PageState } from '../App'
import { projects, articles } from '../data'
import { useLang } from '../context/lang'

// ── Hero slideshow images ─────────────────────────────────────────────────────
// To use your own images: place files in public/images/home/ and update paths,
// e.g. '/images/home/hero-1.jpg'
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=1920&h=1080&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1576831371356-d6e9411ae501?w=1920&h=1080&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1554700124-538d459fc050?w=1920&h=1080&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1610696338308-dd48c9da0c72?w=1920&h=1080&fit=crop&auto=format&q=80',
]
const SLIDE_INTERVAL = 5000 // ms between slides

interface Props {
  navigate: (p: PageState) => void
}

function useFadeIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}s`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className="fade-in">
      {children}
    </div>
  )
}

export default function Home({ navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'

  const selectedProjects = projects.slice(0, 4)
  const featuredArticle = articles[0]
  const introRef = useRef<HTMLDivElement>(null)
  useFadeIn(introRef)

  const [heroIndex, setHeroIndex] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)

  useEffect(() => {
    if (heroPaused || HERO_IMAGES.length <= 1) return
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length), SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [heroPaused])

  const stats = zh
    ? [
        { value: '20+', label: '年执业经验' },
        { value: '150+', label: '已完成项目' },
        { value: '12', label: '国家和地区' },
        { value: '7', label: '设计领域' },
      ]
    : [
        { value: '20+', label: 'years of practice' },
        { value: '150+', label: 'projects completed' },
        { value: '12', label: 'countries' },
        { value: '7', label: 'disciplines' },
      ]

  return (
    <div>
      {/* Hero */}
      <div
        style={{ position: 'relative', height: '100svh', minHeight: '600px', overflow: 'hidden', backgroundColor: '#212529' }}
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        {/* Crossfade slideshow */}
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={i !== heroIndex}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: i === heroIndex ? 0.65 : 0,
              transition: 'opacity 1.4s ease',
              pointerEvents: 'none',
            }}
          />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)' }} />

        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: 'clamp(2rem,5vw,6rem)',
            right: '2rem',
            maxWidth: '680px',
          }}
        >
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}>
            est. 2004 · singapore
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              marginBottom: '1.5rem',
            }}
          >
            {zh ? <>以目的<br />设计场所</> : <>designing places<br />with purpose</>}
          </h1>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', maxWidth: '480px', letterSpacing: '0.02em' }}>
            {zh
              ? 'a+pgrp是一家建筑与设计事务所，在建筑、室内设计、景观、城市规划与开发领域打造深思熟虑的人居环境。'
              : 'a+pgrp is an architecture and design practice creating thoughtful environments across architecture, interiors, landscape, urban planning and development.'}
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate({ id: 'projects' })}
              style={{
                padding: '0.75rem 1.75rem',
                backgroundColor: '#ffffff',
                color: '#212529',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                fontFamily: 'inherit',
                transition: 'background-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b4906e')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              {zh ? '查看项目' : 'view projects'}
            </button>
            <button
              onClick={() => navigate({ id: 'story' })}
              style={{
                padding: '0.75rem 1.75rem',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                fontFamily: 'inherit',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
            >
              {zh ? '关于我们' : 'our story'}
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        {HERO_IMAGES.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(1.5rem,3vw,2.5rem)',
              right: 'clamp(2rem,5vw,6rem)',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                aria-label={`slide ${i + 1}`}
                style={{
                  height: '2px',
                  width: i === heroIndex ? '28px' : '8px',
                  backgroundColor: i === heroIndex ? '#ffffff' : 'rgba(255,255,255,0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.4s ease, background-color 0.4s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Intro */}
      <section style={{ padding: 'clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(3rem, 6vw, 6rem)',
              alignItems: 'start',
            }}
          >
            <FadeSection>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1.5rem' }}>
                {zh ? '关于 a+pgrp' : 'about a+pgrp'}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 3rem)',
                  fontWeight: 300,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: '#212529',
                }}
              >
                {zh ? '以建筑改变生活的笃定，成就一家事务所' : 'a practice built on the conviction that architecture changes lives'}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
                {zh
                  ? '廖松顺与梁美美于2004年创立a+pgrp，历经多年发展，从新加坡一家精品工作室成长为在东南亚及更广泛地区开展业务的多元化设计事务所。'
                  : 'founded in 2004 by andrew chen and priya gopal, a+pgrp has grown from a boutique singapore studio into a multi-disciplinary design practice working across southeast asia and beyond.'}
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', marginBottom: '2.5rem', letterSpacing: '0.02em' }}>
                {zh
                  ? '我们在每一个尺度上进行工作——从门把手的细节到整座城市的布局——跨越每一个领域，从私人住宅到市政基础设施，从精品酒店到城市总体规划。'
                  : 'we work at every scale — from the detail of a door handle to the layout of an entire city — and across every sector, from intimate private residences to civic infrastructure, from boutique hotels to urban masterplans.'}
              </p>
              <button
                onClick={() => navigate({ id: 'story' })}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: '#212529',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: '1px solid #212529',
                  paddingBottom: '4px',
                }}
              >
                {zh ? '了解我们的故事' : 'read our story'}
                <span>→</span>
              </button>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '2.5rem 1rem', textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#212529', marginBottom: '0.4rem' }}>
                  {s.value}
                </p>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9AA3AC' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected projects */}
      <section style={{ padding: 'clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '0.75rem' }}>
                  {zh ? '精选作品' : 'selected work'}
                </p>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                  {zh ? '近期项目' : 'recent projects'}
                </h2>
              </div>
              <button
                onClick={() => navigate({ id: 'projects' })}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: '#9AA3AC',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#212529')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9AA3AC')}
              >
                {zh ? '全部项目 →' : 'all projects →'}
              </button>
            </div>
          </FadeSection>

          <div className="home-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {selectedProjects.map((p, i) => (
              <FadeSection key={p.slug} delay={i * 0.1}>
                <button
                  onClick={() => navigate({ id: 'project-detail', slug: p.slug })}
                  style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  <div className="img-zoom" style={{ aspectRatio: '1/1', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                    <img
                      src={p.images[0]}
                      alt={zh ? p.zhTitle : p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
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
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section style={{ padding: 'clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <FadeSection>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '3rem' }}>
              {zh ? 'a+pgrp 最新动态' : 'latest from a+pgrp'}
            </p>
          </FadeSection>
          <FadeSection delay={0.1}>
            <button
              onClick={() => navigate({ id: 'media-detail', slug: featuredArticle.slug })}
              style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
            >
              <div className="home-article-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                <div className="img-zoom" style={{ aspectRatio: '16/10', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
                  <img
                    src={featuredArticle.imageUrl}
                    alt={zh ? featuredArticle.zhTitle : featuredArticle.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#b4906e', textTransform: 'uppercase' }}>
                      {zh ? featuredArticle.zhCategory : featuredArticle.category}
                    </span>
                    <span style={{ width: '24px', height: '1px', backgroundColor: '#dee2e6' }} />
                    <span style={{ fontSize: '0.65rem', color: '#9AA3AC', letterSpacing: '0.04em' }}>{featuredArticle.date}</span>
                  </div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.2rem, 2vw, 1.7rem)',
                      fontWeight: 300,
                      lineHeight: 1.35,
                      letterSpacing: '-0.01em',
                      marginBottom: '1.25rem',
                      color: '#212529',
                    }}
                  >
                    {zh ? featuredArticle.zhTitle : featuredArticle.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.8, color: '#495057', letterSpacing: '0.02em', marginBottom: '2rem' }}>
                    {zh ? featuredArticle.zhSummary : featuredArticle.summary}
                  </p>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#212529', borderBottom: '1px solid #212529', paddingBottom: '3px' }}>
                    {zh ? '阅读更多 →' : 'read more →'}
                  </span>
                </div>
              </div>
            </button>
          </FadeSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#212529',
          padding: 'clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)',
          textAlign: 'center',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1611570885483-095b1b449aa3?w=1920&h=600&fit=crop&auto=format&q=70"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
              {zh ? '开始对话' : 'start a conversation'}
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 4rem)',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: '1.5rem',
              }}
            >
              {zh ? <>共同设计<br />卓越非凡之作</> : <>let us design something<br />extraordinary together</>}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '3rem', letterSpacing: '0.02em' }}>
              {zh ? '我们欢迎各类规模与类型的项目咨询。' : 'we welcome enquiries for projects of all scales and types.'}
            </p>
            <button
              onClick={() => navigate({ id: 'contact' })}
              style={{
                padding: '0.9rem 2.5rem',
                backgroundColor: '#b4906e',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                fontFamily: 'inherit',
                transition: 'background-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c9a080')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#b4906e')}
            >
              {zh ? '联系我们' : 'get in touch'}
            </button>
          </FadeSection>
        </div>
      </section>
      <style>{`
        @media (max-width: 767px) {
          .home-projects-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin-left: auto !important; margin-right: auto !important; }
          .home-article-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin-left: auto !important; margin-right: auto !important; }
        }
      `}</style>
    </div>
  )
}
