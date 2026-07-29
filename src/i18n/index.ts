import type { Lang } from '../context/lang'

const translations = {
  nav: {
    story: { en: 'our story', zh: '关于我们' },
    projects: { en: 'projects', zh: '项目' },
    people: { en: 'people', zh: '团队' },
    services: { en: 'services', zh: '服务' },
    media: { en: 'media', zh: '媒体' },
    jobs: { en: 'jobs', zh: '招聘' },
    contact: { en: 'contact', zh: '联系我们' },
    langToggle: { en: '简', zh: 'EN' },
  },
  footer: {
    copyright: { en: '© 2024 a+pgrp. all rights reserved.', zh: '© 2024 a+pgrp. 版权所有。' },
    address1: { en: '10 science park road', zh: '科学园路10号' },
    address2: { en: '#03-01 the alpha', zh: '#03-01 阿尔法大厦' },
    address3: { en: 'singapore 117684', zh: '新加坡 117684' },
    email: { en: 'info@ap-grp.com', zh: 'info@ap-grp.com' },
    phone: { en: '+65 6123 4567', zh: '+65 6123 4567' },
  },
  home: {
    heroTagline: { en: 'architecture + planning + interiors', zh: '建筑 · 规划 · 室内设计' },
    recentProjects: { en: 'recent projects', zh: '近期项目' },
    viewAllProjects: { en: 'view all projects', zh: '查看全部项目' },
    latestFrom: { en: 'latest from a+pgrp', zh: 'a+pgrp 最新动态' },
    viewAllNews: { en: 'view all', zh: '查看全部' },
    readMore: { en: 'read more', zh: '阅读更多' },
  },
  story: {
    heading: { en: 'our story', zh: '关于我们' },
    body1: {
      en: 'a+pgrp was established in singapore in 2004 by andrew chen and priya gopal, two architects who shared a conviction that the best architecture emerges from a deep understanding of place, people, and purpose.',
      zh: 'a+pgrp由廖松顺与梁美美于2004年在新加坡创立。两位建筑师深信，最优秀的建筑源于对场所、人与目的的深刻理解。',
    },
    body2: {
      en: 'over two decades, the practice has grown from a two-person studio into a team of thirty-five architects, designers, planners, and landscape architects working across southeast asia and beyond.',
      zh: '二十年来，事务所从两人工作室成长为拥有三十五位建筑师、设计师、规划师和景观设计师的团队，业务遍及东南亚及更广泛地区。',
    },
    body3: {
      en: "our work spans architecture, interior design, landscape, and urban planning — with every project guided by a commitment to cultural sensitivity, environmental responsibility, and design excellence. we believe that great architecture has the capacity to improve people's lives, strengthen communities, and enrich the places we inhabit.",
      zh: '我们的工作涵盖建筑、室内设计、景观与城市规划——每个项目都以文化敏感性、环境责任感和设计卓越性为指引。我们相信，优秀的建筑能够改善人们的生活，凝聚社区力量，丰富我们所居住的场所。',
    },
    approachHeading: { en: 'our approach', zh: '我们的理念' },
    approach1Title: { en: 'place', zh: '场所' },
    approach1Body: {
      en: 'every project begins with an attentive reading of its setting — its climate, topography, cultural context, and history. we believe architecture must respond to where it is.',
      zh: '每个项目都始于对场所的细心解读——其气候、地形、文化背景与历史。我们相信，建筑必须回应它所在的地方。',
    },
    approach2Title: { en: 'people', zh: '人' },
    approach2Body: {
      en: "architecture exists to serve the people who use it. understanding how people inhabit, move through, and feel within a building or place is central to everything we do.",
      zh: '建筑存在的意义在于服务使用它的人。理解人们如何居住、穿行并感受一栋建筑或一个场所，是我们一切工作的核心。',
    },
    approach3Title: { en: 'craft', zh: '工艺' },
    approach3Body: {
      en: 'we believe in the value of good design and careful making. from the scale of the masterplan to the detail of a door handle, quality of craft matters.',
      zh: '我们相信优秀设计与精心制作的价值。从总体规划的尺度到门把手的细节，工艺品质至关重要。',
    },
    valuesHeading: { en: 'our values', zh: '我们的价值观' },
  },
  projects: {
    heading: { en: 'projects', zh: '项目' },
    all: { en: 'all', zh: '全部' },
    architecture: { en: 'architecture', zh: '建筑' },
    interior: { en: 'interior', zh: '室内' },
    masterplanning: { en: 'masterplanning', zh: '总体规划' },
    urbanPlanning: { en: 'urban planning', zh: '城市规划' },
    tourismDevelopment: { en: 'tourism development', zh: '旅游开发' },
    viewProject: { en: 'view project', zh: '查看项目' },
  },
  projectDetail: {
    location: { en: 'location', zh: '地点' },
    year: { en: 'year', zh: '年份' },
    type: { en: 'type', zh: '类型' },
    status: { en: 'status', zh: '状态' },
    client: { en: 'client', zh: '客户' },
    completed: { en: 'completed', zh: '已竣工' },
    inProgress: { en: 'in progress', zh: '进行中' },
    relatedProjects: { en: 'related projects', zh: '相关项目' },
    prevProject: { en: 'previous project', zh: '上一个项目' },
    nextProject: { en: 'next project', zh: '下一个项目' },
    backToProjects: { en: '← all projects', zh: '← 全部项目' },
  },
  people: {
    heading: { en: 'people', zh: '团队' },
    partners: { en: 'partners', zh: '合伙人' },
    team: { en: 'team', zh: '团队成员' },
    viewProfile: { en: 'view profile', zh: '查看简介' },
  },
  personDetail: {
    qualifications: { en: 'qualifications', zh: '学历资质' },
    experience: { en: 'selected experience', zh: '代表项目' },
    awards: { en: 'awards & recognition', zh: '奖项与荣誉' },
    backToPeople: { en: '← all people', zh: '← 全部团队' },
  },
  services: {
    heading: { en: 'services', zh: '服务' },
    subheading: {
      en: 'we offer a comprehensive range of design services across architecture, interiors, landscape, and urban planning.',
      zh: '我们提供涵盖建筑、室内、景观与城市规划的全面设计服务。',
    },
    learnMore: { en: 'learn more', zh: '了解更多' },
  },
  media: {
    heading: { en: 'media', zh: '媒体' },
    all: { en: 'all', zh: '全部' },
    news: { en: 'news', zh: '新闻' },
    awards: { en: 'awards', zh: '奖项' },
    press: { en: 'press', zh: '媒体报道' },
    projects: { en: 'projects', zh: '项目' },
    insights: { en: 'insights', zh: '洞见' },
    events: { en: 'events', zh: '活动' },
    readMore: { en: 'read more', zh: '阅读更多' },
    backToMedia: { en: '← all media', zh: '← 全部媒体' },
  },
  jobs: {
    heading: { en: 'careers', zh: '职业发展' },
    subheading: {
      en: "we are always looking for talented and ambitious designers to join our team. if you share our values and our commitment to design excellence, we'd love to hear from you.",
      zh: '我们始终欢迎才华横溢、志向远大的设计师加入我们的团队。如果您与我们有着共同的价值观和对设计卓越的追求，欢迎与我们联系。',
    },
    applyNow: { en: 'apply now', zh: '立即申请' },
    openPositions: { en: 'open positions', zh: '招聘职位' },
    noOpenings: {
      en: 'there are no open positions at this time. please check back later or send us a speculative application.',
      zh: '目前暂无空缺职位，请稍后再查看，或向我们发送主动申请。',
    },
    sendSpeculative: { en: 'send a speculative application', zh: '发送主动申请' },
    location: { en: 'location', zh: '地点' },
    type: { en: 'type', zh: '类型' },
    fullTime: { en: 'full-time', zh: '全职' },
    partTime: { en: 'part-time', zh: '兼职' },
    contract: { en: 'contract', zh: '合同制' },
  },
  contact: {
    heading: { en: 'contact', zh: '联系我们' },
    studio: { en: 'studio', zh: '工作室' },
    newEnquiries: { en: 'new enquiries', zh: '新项目咨询' },
    pressMedia: { en: 'press & media', zh: '媒体联系' },
    careers: { en: 'careers', zh: '职业发展' },
    sendMessage: { en: 'send a message', zh: '发送消息' },
    name: { en: 'name', zh: '姓名' },
    email: { en: 'email', zh: '电子邮件' },
    subject: { en: 'subject', zh: '主题' },
    message: { en: 'message', zh: '消息内容' },
    send: { en: 'send', zh: '发送' },
    address: { en: 'address', zh: '地址' },
    phone: { en: 'phone', zh: '电话' },
  },
} as const

type Translations = typeof translations
type Section = keyof Translations
type Key<S extends Section> = keyof Translations[S]

export function tx<S extends Section, K extends Key<S>>(
  section: S,
  key: K,
  lang: Lang,
): string {
  return (translations[section][key] as Record<Lang, string>)[lang]
}

export function useTx(lang: Lang) {
  return <S extends Section, K extends Key<S>>(section: S, key: K) =>
    tx(section, key, lang)
}
