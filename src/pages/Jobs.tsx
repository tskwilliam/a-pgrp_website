import { useState, useEffect, useRef } from 'react'
import type { PageState } from '../App'
import { jobListings } from '../data'
import { useLang } from '../context/lang'

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

interface Props {
  navigate: (p: PageState) => void
}

const faqs = {
  en: [
    { q: 'what positions are currently available?', a: 'we currently have openings for a senior architect, interior designer, and urban designer. we are also accepting internship applications on an ongoing basis. please see the listings above for full details.' },
    { q: 'do you accept internship applications?', a: 'yes. we welcome applications from motivated architectural and design students for internship positions. internships are typically for a minimum of six months and are available across architecture, interior design, and urban design.' },
    { q: 'what should be included in my portfolio?', a: 'your portfolio should be a concise, curated selection of your best work — typically 15-25 pages. include a range of projects that demonstrate your design skills, technical ability, and creative thinking. do not simply include everything you have ever made.' },
    { q: 'can i submit a general application?', a: 'yes. if you do not see a role that matches your profile but believe you would be a strong addition to the team, we welcome general applications. please describe your skills and interests clearly in your cover note.' },
    { q: 'when will i hear back after applying?', a: 'we aim to respond to all applications within four weeks of receipt. if you have not heard from us after four weeks, please feel free to follow up by email.' },
    { q: 'what file formats can i upload?', a: 'we accept pdf and docx files for your resume and cover letter. for portfolios, pdf is preferred, with a maximum file size of 20mb. if your portfolio is hosted online, you may also share a link.' },
  ],
  zh: [
    { q: '目前有哪些开放职位？', a: '我们目前在招募高级建筑师、室内设计师和城市设计师，同时持续接受实习申请。详情请参阅上方招聘列表。' },
    { q: '是否接受实习申请？', a: '是的。我们欢迎积极上进的建筑与设计专业学生申请实习职位。实习通常最短六个月，涵盖建筑、室内设计和城市设计领域。' },
    { q: '作品集应包含哪些内容？', a: '您的作品集应是精心挑选的最佳作品集锦，通常为15-25页。请包含能展示设计能力、技术水平和创意思维的多类项目，切勿将所有作品一并放入。' },
    { q: '可以提交主动申请吗？', a: '可以。如果您未找到与自身背景匹配的职位，但认为自己能为团队带来价值，欢迎提交主动申请。请在求职信中清晰描述您的技能与兴趣。' },
    { q: '申请后何时会收到回复？', a: '我们力争在收到申请后四周内回复所有申请人。如超过四周仍未收到回复，欢迎通过邮件跟进。' },
    { q: '可以上传哪些文件格式？', a: '简历和求职信接受PDF和DOCX格式。作品集建议使用PDF格式，最大文件大小为20MB。如作品集托管在线上，也可分享链接。' },
  ],
}

interface FormState {
  name: string
  email: string
  phone: string
  position: string
  message: string
  file: File | null
}

export default function Jobs({ navigate: _navigate }: Props) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', position: '', message: '', file: null })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = zh ? '请输入您的姓名' : 'please enter your name'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = zh ? '请输入有效的电子邮件地址' : 'please enter a valid email address'
    if (!form.position.trim()) e.position = zh ? '请说明您申请的职位' : 'please specify the position you are applying for'
    if (!form.message.trim()) e.message = zh ? '请附上一段简短的自我介绍' : 'please include a short message'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
    setErrors({})
  }

  const handleChange = (field: keyof Omit<FormState, 'file'>) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: '100%',
    border: `1px solid ${hasError ? '#c0392b' : '#dee2e6'}`,
    padding: '0.85rem 1rem',
    fontSize: '0.8rem',
    letterSpacing: '0.03em',
    color: '#212529',
    fontFamily: 'inherit',
    outline: 'none',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.2s ease',
  })

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header hero */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#212529',
          overflow: 'hidden',
          padding: 'clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1724582586458-a51791349977?w=1920&h=600&fit=crop&auto=format&q=70"
          alt="studio"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
            {zh ? '职业发展' : 'careers'}
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: '#ffffff', lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: '1.75rem' }}>
            {zh ? '优秀建筑始于人' : 'good architecture begins with people'}
          </h1>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', maxWidth: '560px', letterSpacing: '0.02em' }}>
            {zh
              ? '我们始终欢迎充满好奇心、深思熟虑且乐于协作的人才，共同创造有意义的场所。'
              : 'we are always looking for curious, thoughtful and collaborative individuals who want to create meaningful places with us.'}
          </p>
        </div>
      </div>

      {/* Culture section */}
      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem,6vw,5rem)', alignItems: 'start' }}>
            <FadeSection>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1rem' }}>
                {zh ? '在a+pgrp工作' : 'working at a+pgrp'}
              </p>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {zh ? '严谨、好奇与关怀并存的文化' : 'a culture of rigour, curiosity, and care'}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
                {zh
                  ? '我们是一个约三十人的工作室——规模适中，每个人都能发挥有意义的作用、清晰表达自己的声音；同时又足够成熟，能够承接复杂而重要的项目。我们的文化以严谨的思维、慷慨的精神和对工作品质的深切追求为核心。'
                  : 'we are a studio of around thirty people, small enough for every person to have a meaningful role and a clear voice, large enough to take on complex and significant commissions. our culture is defined by intellectual seriousness, generosity of spirit, and a deep commitment to the quality of the work.'}
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#495057', letterSpacing: '0.02em' }}>
                {zh
                  ? '我们投资于团队的职业发展，提供广泛的项目类型与规模接触机会，并相信只有在同等信任、挑战与支持的环境中，才能产生最好的设计。'
                  : 'we invest in the professional development of our team, provide exposure to a wide range of project types and scales, and believe that the best design happens when people are trusted, challenged, and supported in equal measure.'}
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Current openings */}
      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <FadeSection>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '3rem' }}>
              {zh ? '当前招聘职位' : 'current openings'}
            </p>
          </FadeSection>
          <div>
            {jobListings.map((job, i) => (
              <FadeSection key={i} delay={i * 0.08}>
                <div style={{ padding: '2rem 0', borderBottom: '1px solid #dee2e6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'nowrap' }}>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 400, letterSpacing: '0.04em', marginBottom: '0.4rem', color: '#212529' }}>{zh ? job.zhTitle : job.title}</h3>
                      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.65rem', color: '#9AA3AC', letterSpacing: '0.06em' }}>{zh ? job.zhDepartment : job.department}</span>
                        <span style={{ fontSize: '0.65rem', color: '#9AA3AC', letterSpacing: '0.06em' }}>{job.location}</span>
                        <span
                          style={{
                            fontSize: '0.6rem',
                            letterSpacing: '0.08em',
                            color: job.type === 'internship' ? '#b4906e' : '#212529',
                            border: `1px solid ${job.type === 'internship' ? '#b4906e' : '#dee2e6'}`,
                            padding: '2px 8px',
                          }}
                        >
                          {zh ? job.zhType : job.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setForm((prev) => ({ ...prev, position: job.title }))
                        document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      style={{
                        padding: '0.55rem 1.25rem',
                        backgroundColor: 'transparent',
                        border: '1px solid #212529',
                        cursor: 'pointer',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        color: '#212529',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#212529'; e.currentTarget.style.color = '#ffffff' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#212529' }}
                    >
                      {zh ? '申请' : 'apply'}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#495057', lineHeight: 1.75, letterSpacing: '0.02em', marginTop: '1rem', maxWidth: '640px' }}>{zh ? job.zhDescription : job.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {(zh ? job.zhRequirements : job.requirements).slice(0, 3).map((r, ri) => (
                      <span key={ri} style={{ fontSize: '0.62rem', letterSpacing: '0.04em', color: '#9AA3AC', backgroundColor: '#f8f9fa', padding: '3px 10px' }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply-form" style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)', borderBottom: '1px solid #dee2e6' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem,6vw,5rem)', alignItems: 'start' }}>
            <FadeSection>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1rem' }}>
                {zh ? '申请' : 'apply'}
              </p>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '1.25rem' }}>
                {zh ? '发送申请' : 'send us your application'}
              </h2>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.8, color: '#495057', letterSpacing: '0.02em' }}>
                {zh
                  ? '请填写表格并附上您的简历和作品集。我们将在四周内与您联系。'
                  : 'complete the form and attach your resume and portfolio. we will be in touch within four weeks.'}
              </p>
            </FadeSection>

            <FadeSection delay={0.15}>
              <div>
                {submitted ? (
                  <div style={{ padding: '3rem', border: '1px solid #dee2e6', textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '1px solid #b4906e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b4906e" strokeWidth="1.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 300, marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
                      {zh ? '申请已收到' : 'application received'}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#9AA3AC', letterSpacing: '0.02em', lineHeight: 1.7 }}>
                      {zh
                        ? '感谢您对a+pgrp的关注。我们将审阅您的申请，并在四周内与您联系。'
                        : 'thank you for your interest in a+pgrp. we will review your application and be in touch within four weeks.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                      { field: 'name' as const, label: zh ? '姓名' : 'full name', type: 'text', required: true },
                      { field: 'email' as const, label: zh ? '电子邮件' : 'email address', type: 'email', required: true },
                      { field: 'phone' as const, label: zh ? '电话号码' : 'phone number', type: 'tel', required: false },
                    ].map(({ field, label, type, required }) => (
                      <div key={field}>
                        <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
                          {label}{required && <span style={{ color: '#b4906e' }}> *</span>}
                        </label>
                        <input
                          type={type}
                          value={form[field] as string}
                          onChange={handleChange(field)}
                          style={inputStyle(!!errors[field])}
                          onFocus={(e) => (e.target.style.borderColor = '#212529')}
                          onBlur={(e) => (e.target.style.borderColor = errors[field] ? '#c0392b' : '#dee2e6')}
                        />
                        {errors[field] && <p style={{ fontSize: '0.65rem', color: '#c0392b', marginTop: '0.35rem', letterSpacing: '0.04em' }}>{errors[field]}</p>}
                      </div>
                    ))}

                    <div>
                      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
                        {zh ? '申请职位' : 'position applied for'} <span style={{ color: '#b4906e' }}>*</span>
                      </label>
                      <select
                        value={form.position}
                        onChange={handleChange('position')}
                        style={{ ...inputStyle(!!errors.position), appearance: 'none', cursor: 'pointer' }}
                      >
                        <option value="">{zh ? '选择职位…' : 'select position...'}</option>
                        {jobListings.map((j) => (
                          <option key={j.title} value={j.title}>{j.title}</option>
                        ))}
                        <option value="general application">{zh ? '主动申请' : 'general application'}</option>
                      </select>
                      {errors.position && <p style={{ fontSize: '0.65rem', color: '#c0392b', marginTop: '0.35rem', letterSpacing: '0.04em' }}>{errors.position}</p>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
                        {zh ? '简短介绍' : 'short message'} <span style={{ color: '#b4906e' }}>*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={handleChange('message')}
                        rows={5}
                        style={{ ...inputStyle(!!errors.message), resize: 'vertical' }}
                        onFocus={(e) => (e.target.style.borderColor = '#212529')}
                        onBlur={(e) => (e.target.style.borderColor = errors.message ? '#c0392b' : '#dee2e6')}
                      />
                      {errors.message && <p style={{ fontSize: '0.65rem', color: '#c0392b', marginTop: '0.35rem', letterSpacing: '0.04em' }}>{errors.message}</p>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9AA3AC', marginBottom: '0.5rem' }}>
                        {zh ? '作品集 / 简历（PDF、DOCX — 最大20MB）' : 'portfolio / résumé (pdf, docx — max 20mb)'}
                      </label>
                      <label
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #dee2e6', padding: '0.85rem 1rem', cursor: 'pointer', transition: 'border-color 0.2s ease' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#212529')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#dee2e6')}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AA3AC" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        <span style={{ fontSize: '0.78rem', color: form.file ? '#212529' : '#9AA3AC', letterSpacing: '0.03em' }}>
                          {form.file ? form.file.name : (zh ? '点击上传文件' : 'click to upload file')}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.docx"
                          style={{ display: 'none' }}
                          onChange={(e) => setForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: '0.5rem',
                        padding: '1rem 2rem',
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
                      {zh ? '提交申请' : 'submit application'}
                    </button>
                  </form>
                )}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)' }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem,6vw,5rem)', alignItems: 'start' }}>
            <FadeSection>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#b4906e', marginBottom: '1rem' }}>faq</p>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {zh ? '常见问题' : 'frequently asked questions'}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <div>
                {faqs[lang === 'zh' ? 'zh' : 'en'].map((faq, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '1.5rem 0',
                        textAlign: 'left',
                        gap: '1rem',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', letterSpacing: '0.03em', color: '#212529', fontWeight: openFaq === i ? 500 : 400 }}>
                        {faq.q}
                      </span>
                      <span style={{ fontSize: '1.1rem', color: '#b4906e', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease', lineHeight: 1 }}>
                        +
                      </span>
                    </button>
                    <div style={{ maxHeight: openFaq === i ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.85, color: '#495057', letterSpacing: '0.02em', paddingBottom: '1.5rem' }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>
    </div>
  )
}
