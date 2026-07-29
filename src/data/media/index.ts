// ─────────────────────────────────────────────────────────────
// MEDIA  (journal & press articles)
//
// Chinese: zhTitle, zhSummary, zhCategory are translated.
// Article body[] intentionally stays in English — not translated.
// ─────────────────────────────────────────────────────────────

export interface Article {
  slug: string
  title: string
  zhTitle: string
  category: string
  zhCategory: string
  date: string
  summary: string
  zhSummary: string
  imageUrl: string
  body: string[]
}

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const articles: Article[] = [
  {
    slug: 'sia-award-2023',
    title: 'a+pgrp receives sia architectural design award 2023',
    zhTitle: 'a+pgrp 荣获2023年新加坡建筑师学会建筑设计奖',
    category: 'awards',
    zhCategory: '奖项',
    date: '12 november 2023',
    summary:
      'a+pgrp is honoured to receive the singapore institute of architects architectural design award for the urban oasis residences project, recognising excellence in residential architecture.',
    zhSummary:
      'a+pgrp 荣幸地凭借城市绿洲住宅项目荣获新加坡建筑师学会建筑设计奖，彰显在住宅建筑领域的卓越成就。',
    imageUrl: img('photo-1611570885483-095b1b449aa3'),
    body: [
      'a+pgrp is proud to announce that the urban oasis residences project has been awarded the singapore institute of architects (sia) architectural design award 2023 in the residential category.',
      "the award recognises projects that demonstrate exceptional design quality and a meaningful contribution to singapore's built environment. the jury commended the project for its sophisticated response to its tropical context and the quality of its residential amenity.",
      '"this recognition means a great deal to the entire team who worked so hard on this project," said founding partner liew soong shoon. "it reflects our belief that architecture must always seek to improve the lives of the people who inhabit it."',
      "the sia architectural design awards are among singapore's most prestigious recognitions of architectural excellence, awarded biennially across residential, commercial, institutional, and urban design categories.",
    ],
  },
  {
    slug: 'pavilion-hotel-opens',
    title: 'the pavilion hotel, chiang mai, opens to guests',
    zhTitle: '亭阁酒店清迈店正式向宾客开放',
    category: 'news',
    zhCategory: '新闻',
    date: '3 september 2023',
    summary:
      "after three years of design and construction, the pavilion hotel has opened its doors in the foothills of chiang mai, thailand. the project marks a significant milestone for a+pgrp's hospitality portfolio.",
    zhSummary:
      '经过三年的设计与建造，亭阁酒店已在泰国清迈山麓正式开业，为a+pgrp酒店业务组合树立了重要里程碑。',
    imageUrl: img('photo-1622396481322-3b83d186701b'),
    body: [
      "the pavilion hotel, chiang mai, has officially opened following three years of design development and construction. the project represents one of the most significant hospitality commissions in a+pgrp's two-decade history.",
      'set within four hectares of mature gardens at the foothills of doi suthep, the resort comprises thirty-two pavilion villas and a central arrival building housing dining, spa, and event facilities.',
      'the design draws on the architectural traditions of northern thailand, reinterpreting vernacular forms and materials through a contemporary lens. local teak, natural stone, and hand-fired ceramics appear throughout, crafted by regional artisans.',
      '"we spent considerable time understanding the culture, the climate, and the particular quality of light in chiang mai before beginning to design," said founding partner mei mei leong. "the result is a place that feels genuinely of its setting."',
    ],
  },
  {
    slug: 'wellness-township-featured',
    title: 'wellness township masterplan featured in wallpaper magazine',
    zhTitle: '健康城镇总体规划荣登《wallpaper》杂志',
    category: 'press',
    zhCategory: '媒体报道',
    date: '18 july 2023',
    summary:
      "wallpaper magazine profiles the wellness township masterplan in myanmar, exploring the planning principles and design philosophy that underpin one of a+pgrp's most ambitious projects to date.",
    zhSummary:
      '《wallpaper》杂志深度报道缅甸健康城镇总体规划，探讨支撑这一迄今最具雄心项目的规划原则与设计理念。',
    imageUrl: img('photo-1483366774565-c783b9f70e2c'),
    body: [
      "wallpaper magazine's july issue features an in-depth profile of the wellness township masterplan in myanmar, examining the ambitious planning and design principles that guided the project.",
      "the article explores how a+pgrp approached the challenge of creating a new 280-hectare township from the ground up — establishing frameworks for land use, movement, public space, and ecological systems that can support the growth of a genuinely liveable community.",
      "the feature highlights the project's biophilic design strategy, which prioritises pedestrian connectivity, planted corridors, and a network of parks and water features throughout the township.",
      'urban design lead wu dawei spoke to wallpaper about the masterplanning process: "our starting point was always the landscape — understanding the existing ecology, topography, and drainage patterns before introducing any built form."',
    ],
  },
  {
    slug: 'new-singapore-studio',
    title: 'a+pgrp marks twenty years with expanded singapore studio',
    zhTitle: 'a+pgrp 以扩建新加坡工作室庆祝二十周年',
    category: 'news',
    zhCategory: '新闻',
    date: '5 may 2023',
    summary:
      "marking two decades of practice, a+pgrp has expanded its singapore studio at science park, creating a new collaborative workspace designed to support the next phase of the practice's growth.",
    zhSummary:
      '值二十周年之际，a+pgrp扩建了位于科学园的新加坡工作室，打造全新协作空间，为事务所下一阶段的发展奠定基础。',
    imageUrl: img('photo-1724582586458-a51791349977'),
    body: [
      "a+pgrp has expanded its singapore studio at science park 2 to mark the practice's twentieth anniversary. the new space, designed in-house by the practice's interior design team, creates a collaborative working environment that reflects the values and culture of the firm.",
      'the studio occupies an expanded floor area of 450 square metres, featuring open-plan studio space, dedicated model-making facilities, a project library, and a new client presentation suite.',
      '"the studio is our home and the place where our best work begins," said founding partner liew soong shoon. "designing it ourselves gave us an opportunity to demonstrate what we believe about how creative teams should work together."',
      'the new studio opened to the team in april 2023 and serves as the base for all singapore-based projects across architecture, interior design, landscape, and urban planning.',
    ],
  },
  {
    slug: 'bali-resort-progress',
    title: 'eco resort, bali: design in progress',
    zhTitle: '巴厘岛生态度假村：设计进行中',
    category: 'projects',
    zhCategory: '项目',
    date: '22 march 2023',
    summary:
      "a+pgrp shares an update on the eco resort project currently under development in ubud, bali, offering an insight into the design principles and sustainable strategies that are shaping the project.",
    zhSummary:
      'a+pgrp就巴厘岛乌布生态度假村项目的最新进展进行分享，揭示塑造这一项目的设计原则与可持续策略。',
    imageUrl: img('photo-1599685315640-9ceab2f58148'),
    body: [
      "a+pgrp's eco resort project in ubud, bali, is currently in the detailed design phase ahead of a planned construction commencement in early 2024.",
      'the project — set within the rice terraces of ubud — adopts a design philosophy of minimal intervention. structures are elevated above the natural ground plane to preserve root systems and drainage patterns, and all materials are sourced locally wherever possible.',
      'the resort will comprise twelve villas, a central dining pavilion, a spa facility, and a series of meditation and yoga platforms integrated into the landscape.',
      '"sustainability is not a strategy in this project — it is the project," said landscape architect mei chen. "every decision, from the position of each structure to the choice of every plant species, is guided by a commitment to protecting and enriching this extraordinary landscape."',
    ],
  },
  {
    slug: 'insights-tropical-architecture',
    title: 'designing for the tropics: principles from twenty years of practice',
    zhTitle: '为热带而设计：二十年实践的原则',
    category: 'insights',
    zhCategory: '洞见',
    date: '10 january 2023',
    summary:
      "founding partner liew soong shoon reflects on the defining principles that have guided a+pgrp's approach to tropical architecture across two decades of practice in southeast asia.",
    zhSummary:
      '创始合伙人廖松顺回顾引导a+pgrp二十年东南亚热带建筑实践的核心原则。',
    imageUrl: img('photo-1576831371356-d6e9411ae501'),
    body: [
      "writing for the singapore institute of architects journal, founding partner liew soong shoon shares the defining principles that have guided a+pgrp's approach to architecture in the tropics over twenty years of practice.",
      "the article explores how climate, culture, and the particular quality of tropical light have shaped the practice's design language — from the disposition of buildings on their sites to the design of shading systems, natural ventilation, and landscape integration.",
      '"in the tropics, the boundary between inside and outside is always negotiable," liew writes. "the most interesting architecture in this region is that which takes this ambiguity seriously, designing threshold spaces that mediate between the interior and the exterior world."',
      "the article also examines how the practice's approach has evolved in response to climate change, noting an increasing emphasis on passive design strategies, resilient landscape design, and adaptive building forms.",
    ],
  },
]
