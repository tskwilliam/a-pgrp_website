import { useEffect, useRef, useState } from 'react'
import type { PageState } from '../App'
import { useLang } from '../context/lang'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

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

// ─── World presence map ───────────────────────────────────────
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type LabelAnchor = 'start' | 'end'
interface CityPin {
  key: string; en: string; zh: string
  lon: number; lat: number
  anchor: LabelAnchor; dx: number; dy: number
}
// All labels are anchor='start' (left-aligned). dx/dy in SVG user units offset the
// label group from the city point. Font sizes use CSS px (clamp) so they don't shrink
// with the SVG on mobile — they stay at the CSS viewport-relative size.
// anchor='end'  → name + "+"  rendered right-to-left (name left of pin, right-justified)
// anchor='start' → "+" + name  rendered left-to-right (name right of pin)
const CITY_PINS: CityPin[] = [
  { key: 'sg', en: 'singapore (hq)', zh: '新加坡（总部）', lon: 103.82, lat:  1.35, anchor: 'end',   dx: 8, dy: 0 },
  { key: 'yn', en: 'yangon',          zh: '仰光',           lon:  96.17, lat: 16.85, anchor: 'end',   dx: 4, dy: 0 },
  { key: 'ce', en: 'cebu',            zh: '宿务',           lon: 123.89, lat: 10.32, anchor: 'start', dx: -5, dy: 0 },
  { key: 'bj', en: 'beijing',         zh: '北京',           lon: 116.40, lat: 39.90, anchor: 'start', dx: 0,  dy: 0 },
  { key: 'sh', en: 'shanghai',        zh: '上海',           lon: 121.47, lat: 31.23, anchor: 'start', dx: -6,  dy: 0 },
  { key: 'sz', en: 'suzhou',          zh: '苏州',           lon: 120.62, lat: 31.30, anchor: 'end',   dx: 0,  dy: 0 },
]

function WorldMap({ isZh }: { isZh: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <ComposableMap
      projection="geoEquirectangular"
      projectionConfig={{ center: [112, 22], scale: 420 }}
      width={800}
      height={480}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#E9ECEF"
              stroke="#ffffff"
              strokeWidth={0.6}
              tabIndex={-1}
              style={{ outline: 'none' }}
            />
          ))
        }
      </Geographies>

      {CITY_PINS.map((city) => {
        const isHov = hovered === city.key
        const label = isZh ? city.zh : city.en
        // CSS px font sizes — don't scale with the SVG, so text stays readable on mobile
        const plusFs  = isHov ? 'clamp(18px,2.2vw,26px)' : 'clamp(14px,1.7vw,20px)'
        const labelFs = isHov ? 'clamp(12px,1.4vw,17px)' : 'clamp(10px,1.1vw,13px)'
        return (
          <Marker key={city.key} coordinates={[city.lon, city.lat]}>
            <g
              transform={`translate(${city.dx},${city.dy})`}
              onMouseEnter={() => setHovered(city.key)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              <text
                textAnchor={city.anchor}
                dominantBaseline="central"
                fill="#495057"
                style={{ fontFamily: 'inherit', userSelect: 'none' }}
              >
                {city.anchor === 'end' ? (
                  // name right-of-left-of-pin: "city name +" — text justified right, ending at pin
                  <>
                    <tspan style={{ fontSize: labelFs, letterSpacing: '0.04em', transition: 'font-size 0.2s ease' }}>{label}{' '}</tspan>
                    <tspan style={{ fontSize: plusFs, fontWeight: '300', transition: 'font-size 0.2s ease' }}>+</tspan>
                  </>
                ) : (
                  // name right of pin: "+ city name"
                  <>
                    <tspan style={{ fontSize: plusFs, fontWeight: '300', transition: 'font-size 0.2s ease' }}>+</tspan>
                    <tspan style={{ fontSize: labelFs, letterSpacing: '0.04em', transition: 'font-size 0.2s ease' }}>{' '}{label}</tspan>
                  </>
                )}
              </text>
            </g>
          </Marker>
        )
      })}
    </ComposableMap>
  )
}

const timeline = {
  en: [
    { year: '2004', event: "a+pgrp founded by liew soong shoon and mei mei leong in singapore. the practice begins with residential and small commercial commissions." },
    { year: '2008', event: "first international commission — a boutique resort in thailand — marks the beginning of the practice's regional expansion." },
    { year: '2012', event: "the practice grows to 25 people and opens a project office in kuala lumpur to support growing regional commissions." },
    { year: '2015', event: "establishment of dedicated interior design and landscape design studios within the practice." },
    { year: '2017', event: "first urban masterplanning commission — a 180-hectare township development in myanmar — signals a significant expansion of scale and scope." },
    { year: '2019', event: "the practice is awarded two sia architectural design awards, recognising excellence across residential and hospitality categories." },
    { year: '2021', event: "a+pgrp is appointed to the marina bay precinct urban design study, one of singapore's most significant planning commissions." },
    { year: '2023', event: "twenty years of practice. the studio expands into new premises at science park. the pavilion hotel, chiang mai, opens." },
  ],
  zh: [
    { year: '2004', event: '廖松顺与梁美美于新加坡创立a+pgrp，事务所以住宅及小型商业项目起步。' },
    { year: '2008', event: '首个国际项目——泰国一家精品度假村——标志着事务所区域扩张的开始。' },
    { year: '2012', event: '团队规模扩展至25人，并在吉隆坡开设项目办公室以支持增长中的区域业务。' },
    { year: '2015', event: '在事务所内成立专属室内设计与景观设计工作室。' },
    { year: '2017', event: '首个城市总体规划项目——缅甸一个180公顷的城镇开发项目——标志着事务所在规模与范围上的重大扩张。' },
    { year: '2019', event: '事务所荣获两项新加坡建筑师学会建筑设计奖，分别在住宅与酒店类别中斩获殊荣。' },
    { year: '2021', event: 'a+pgrp受委托开展滨海湾片区城市设计研究，这是新加坡最重要的规划项目之一。' },
    { year: '2023', event: '二十周年。工作室迁入科学园新址扩展办公。亭阁酒店（清迈）正式开业。' },
  ],
}

const awards = {
  en: [
    { year: '2023', title: 'sia architectural design award, residential category' },
    { year: '2022', title: "fiabci prix d'excellence, merit award" },
    { year: '2022', title: 'id+a asia interior design award, hospitality' },
    { year: '2021', title: 'singapore interior design awards, best hospitality' },
    { year: '2020', title: 'frame awards interior design, merit' },
    { year: '2019', title: 'sia architectural design award (x2)' },
    { year: '2018', title: 'aia singapore design award' },
    { year: '2016', title: 'bd world architecture festival — shortlisted' },
  ],
  zh: [
    { year: '2023', title: '新加坡建筑师学会建筑设计奖 住宅类' },
    { year: '2022', title: '国际房地产联合会卓越奖 优秀奖' },
    { year: '2022', title: 'ID+A亚洲室内设计奖 酒店类' },
    { year: '2021', title: '新加坡室内设计奖 最佳酒店项目' },
    { year: '2020', title: 'Frame Awards 室内设计 优秀奖' },
    { year: '2019', title: '新加坡建筑师学会建筑设计奖（两项）' },
    { year: '2018', title: '美国建筑师学会新加坡设计奖' },
    { year: '2016', title: 'BD世界建筑节 入围' },
  ],
}

const philosophy = {
  en: [
    { title: 'context first', body: 'every project begins with a rigorous reading of its physical, cultural, and social context. we believe that architecture must emerge from its place, not be imposed upon it.' },
    { title: 'human scale', body: 'we design for people, not for photographs. the quality of an environment is measured by how it feels to inhabit — the quality of light, the pleasure of movement, the comfort of shelter.' },
    { title: 'material honesty', body: 'we believe in the intelligence of materials. our architecture uses materials that are true to their nature, sustainable in their sourcing, and beautiful in their aging.' },
    { title: 'enduring quality', body: 'we resist the fashionable in favour of the lasting. our ambition is to create buildings and places that remain relevant, loved, and valued for generations.' },
  ],
  zh: [
    { title: '场所优先', body: '每个项目都始于对其物理、文化与社会背景的严格解读。我们相信建筑必须从场所中生长，而非强加于其上。' },
    { title: '人本尺度', body: '我们为人而设计，而非为照片。环境的品质由人居其中的感受衡量——光线的质量、移动的愉悦、遮蔽的舒适。' },
    { title: '材料诚实', body: '我们相信材料的智慧。我们的建筑使用忠于其本性、可持续采购、随时间老化而愈显美丽的材料。' },
    { title: '持久品质', body: '我们抵制流行，追求持久。我们的理想是创造代代相传、始终被珍视与热爱的建筑与场所。' },
  ],
}

export default function OurStory({ navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Page header */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#212529',
          overflow: 'hidden',
          padding: 'clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522743791393-522312deeebf?w=1920&h=800&fit=crop&auto=format&q=80"
          alt="architecture"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
            {zh ? '关于我们' : 'about us'}
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.8rem)', fontWeight: 300, color: '#ffffff', lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: '1.75rem' }}>
            {zh ? '二十年，以目的设计场所' : 'twenty years of designing places with purpose'}
          </h1>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', maxWidth: '560px', letterSpacing: '0.02em' }}>
            {zh
              ? 'a+pgrp是一家多元化建筑与设计事务所，在东南亚打造深思熟虑的人居环境。'
              : 'a+pgrp is a multi-disciplinary architecture and design practice creating thoughtful environments across southeast asia.'}
          </p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: 'clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'start' }}>
            <FadeSection>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 300, lineHeight: 1.3, letterSpacing: '-0.01em', border: 'none', textAlign: 'left' }}>
                {zh ? '二十年，以目的设计场所' : 'twenty years of designing places with purpose'}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', marginBottom: '1.25rem', letterSpacing: '0.02em', textAlign: 'justify' }}>
                {zh
                  ? 'a+pgrp由廖松顺与梁美美于2004年创立，两人共同坚信，最好的建筑与其服务的人们的生活密不可分。二十年过去，这一信念始终未变。'
                  : 'a+pgrp was founded in 2004 by liew soong shoon and mei mei leong, who shared a conviction that architecture at its best is inseparable from the lives of the people it serves. twenty years on, that conviction has not changed.'}
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', letterSpacing: '0.02em', textAlign: 'justify' }}>
                {zh
                  ? '我们是一群充满好奇心、乐于协作的人，对所创造环境的品质有着深切关注。我们跨建筑、室内设计、景观、城市规划与开发多个领域工作，以同样的认真与用心对待每一个规模与类型的项目。'
                  : 'we are a studio of curious, collaborative people who care deeply about the quality of the environments we create. we work across architecture, interior design, landscape, urban planning, and development, bringing the same seriousness and care to every scale and type of project.'}
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <div style={{ height: 'clamp(300px, 50vw, 550px)', overflow: 'hidden', backgroundColor: '#e9ecef' }}>
        <img
          src="https://images.unsplash.com/photo-1576831371356-d6e9411ae501?w=1920&h=700&fit=crop&auto=format&q=80"
          alt="a+pgrp project"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Design philosophy */}
      <section style={{ padding: 'clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <FadeSection>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1.5rem' }}>
              {zh ? '设计哲学' : 'design philosophy'}
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 300, lineHeight: 1.3, letterSpacing: '-0.01em', maxWidth: '640px', marginBottom: '3rem' }}>
              {zh ? '我们相信，最好的建筑始于深度倾听' : 'we believe that the best architecture begins with deep listening'}
            </h2>
          </FadeSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
            {philosophy[lang === 'zh' ? 'zh' : 'en'].map((v, i) => (
              <FadeSection key={v.title} delay={i * 0.08}>
                <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '2rem' }}>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', marginBottom: '1rem', color: '#212529' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.85, color: '#495057', letterSpacing: '0.02em' }}>{v.body}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* World presence map */}
      <section style={{ paddingTop: 'clamp(4rem,7vw,6rem)', paddingBottom: 'clamp(3rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(2rem,5vw,6rem)', marginBottom: '2.5rem' }}>
          <FadeSection>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1.5rem' }}>
              {zh ? '业务范围' : 'our presence'}
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 300, lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: 0 }}>
              {zh ? '扎根新加坡，服务亚太地区' : 'rooted in singapore, working across asia'}
            </h2>
          </FadeSection>
        </div>
        <FadeSection delay={0.1}>
          <WorldMap isZh={zh} />
        </FadeSection>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#f8f9fa', padding: 'clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <FadeSection>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1.5rem' }}>
              {zh ? '历史' : 'history'}
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '4rem' }}>
              {zh ? '重要里程碑' : 'milestones'}
            </h2>
          </FadeSection>
          <div>
            {timeline[lang === 'zh' ? 'zh' : 'en'].map((t, i) => (
              <FadeSection key={t.year} delay={i * 0.05}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: '2rem',
                    padding: '2rem 0',
                    borderBottom: '1px solid #dee2e6',
                    alignItems: 'start',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#b4906e', letterSpacing: '0.08em', paddingTop: '0.1rem' }}>{t.year}</span>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#495057', letterSpacing: '0.02em' }}>{t.event}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <div style={{ height: 'clamp(280px, 40vw, 500px)', overflow: 'hidden', backgroundColor: '#e9ecef' }}>
        <img
          src="https://images.unsplash.com/photo-1610696338308-dd48c9da0c72?w=1920&h=600&fit=crop&auto=format&q=80"
          alt="urban design"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Awards */}
      <section style={{ padding: 'clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'start' }}>
            <FadeSection>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1.5rem' }}>
                {zh ? '荣誉' : 'recognition'}
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                {zh ? '奖项与成就' : 'awards &\nachievements'}
              </h2>
            </FadeSection>
            <FadeSection delay={0.1}>
              <div>
                {awards[lang === 'zh' ? 'zh' : 'en'].map((a, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      padding: '1.25rem 0',
                      borderBottom: '1px solid #dee2e6',
                      alignItems: 'baseline',
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', color: '#b4906e', letterSpacing: '0.08em', flexShrink: 0 }}>{a.year}</span>
                    <span style={{ fontSize: '0.8rem', color: '#495057', letterSpacing: '0.02em', lineHeight: 1.6 }}>{a.title}</span>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid #dee2e6', padding: 'clamp(4rem,7vw,7rem) clamp(2rem,5vw,6rem)', textAlign: 'center' }}>
        <FadeSection>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#9AA3AC', marginBottom: '1rem' }}>
            {zh ? '与我们合作' : 'work with us'}
          </p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '2rem' }}>
            {zh ? '准备好开始一个项目了吗？' : 'ready to begin a project?'}
          </h2>
          <button
            onClick={() => navigate({ id: 'contact' })}
            style={{
              padding: '0.85rem 2.5rem',
              backgroundColor: '#212529',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              fontFamily: 'inherit',
              transition: 'background-color 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b4906e')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#212529')}
          >
            {zh ? '联系我们' : 'get in touch'}
          </button>
        </FadeSection>
      </section>
    </div>
  )
}
