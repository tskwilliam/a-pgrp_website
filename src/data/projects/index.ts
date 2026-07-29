// ─────────────────────────────────────────────────────────────
// PROJECTS
//
// To add a project:
//   1. Copy an existing entry below and give it a unique `slug`.
//   2. Create a folder:  public/images/projects/<slug>/
//   3. Place your images in that folder.
//   4. Update the `images` array — first item is the banner,
//      the rest appear in the gallery slideshow in order.
//
// Tags — pick one or more from:
//   'commercial' | 'industrial' | 'residential' | 'hospitality'
//   'institutional' | 'masterplanning' | 'landscape'
// ─────────────────────────────────────────────────────────────

export interface Project {
  slug: string
  title: string
  zhTitle: string
  location: string
  zhLocation?: string
  year: string
  type: string
  zhType: string
  // One or more tags — used for the filter buttons on the Projects page
  tags: string[]
  status: string
  client?: string
  description: string
  zhDescription: string
  images: string[]
  related: string[]
}

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const GALLERY = [
  img('photo-1554700124-538d459fc050'),
  img('photo-1596652276565-d6ed2e0ab54a'),
  img('photo-1576831371356-d6e9411ae501'),
  img('photo-1521194278274-c33e3ef2c448'),
  img('photo-1611570884860-6f9d61c3a64d'),
  img('photo-1610696338308-dd48c9da0c72'),
  img('photo-1682184805271-11671b7ecf4c'),
  img('photo-1724582586458-a51791349977'),
  img('photo-1711873316332-acb6930211e1'),
  img('photo-1642019708236-942cc048bf34'),
]

export const projects: Project[] = [
  {
    slug: 'wellness-township',
    title: 'wellness township',
    zhTitle: '健康城镇',
    location: 'myanmar',
    zhLocation: '缅甸',
    year: '2023',
    type: 'masterplanning',
    zhType: '总体规划',
    tags: ['masterplanning', 'residential', 'hospitality', 'landscape'],
    status: 'completed',
    client: 'confidential',
    description:
      'A comprehensive wellness-focused township integrating residential, hospitality, and recreational facilities within a natural landscape setting. The masterplan prioritises pedestrian connectivity, biophilic design principles, and sustainable infrastructure across 280 hectares.',
    zhDescription:
      '一个综合性健康城镇，将住宅、酒店与休闲设施融合于自然景观之中。总体规划在280公顷范围内优先考虑步行连通性、亲生物设计原则与可持续基础设施。',
    images: [
      img('photo-1483366774565-c783b9f70e2c', 900, 900),
      ...GALLERY,
    ],
    related: ['marina-bay-precinct', 'eco-resort-bali'],
  },
  {
    slug: 'urban-oasis-residences',
    title: 'urban oasis residences',
    zhTitle: '城市绿洲住宅',
    location: 'singapore',
    zhLocation: '新加坡',
    year: '2022',
    type: 'residential',
    zhType: '住宅',
    tags: ['residential', 'landscape'],
    status: 'completed',
    client: 'confidential',
    description:
      'A premium residential development in the heart of Singapore, where architecture and landscape integrate seamlessly. The tower form responds to its tropical context, with generous sky gardens and a landscaped podium that creates a green refuge within the dense urban fabric.',
    zhDescription:
      '位于新加坡市中心的高端住宅开发项目，建筑与景观无缝融合。塔楼形态呼应热带环境，宽阔的空中花园与景观台座在密集城市肌理中营造出一处绿色庇护所。',
    images: [
      img('photo-1611570885483-095b1b449aa3', 900, 900),
      ...GALLERY,
    ],
    related: ['the-pavilion-hotel', 'wellness-township'],
  },
  {
    slug: 'the-pavilion-hotel',
    title: 'the pavilion hotel',
    zhTitle: '亭阁酒店',
    location: 'chiang mai, thailand',
    zhLocation: '泰国清迈',
    year: '2023',
    type: 'hospitality',
    zhType: '酒店',
    tags: ['hospitality', 'landscape'],
    status: 'completed',
    client: 'the pavilion group',
    description:
      'A boutique luxury hotel conceived as a series of pavilions set within a mature garden landscape. The architecture draws on northern Thai vernacular forms reinterpreted through a contemporary lens, creating a resort that feels deeply embedded in its place.',
    zhDescription:
      '一座精品豪华酒店，以一系列亭阁融于成熟花园景观之中。建筑汲取泰北地域形式，以当代手法重新诠释，塑造出深深植根于本地的度假胜地。',
    images: [
      img('photo-1622396481322-3b83d186701b', 900, 900),
      ...GALLERY,
    ],
    related: ['eco-resort-bali', 'urban-oasis-residences'],
  },
  {
    slug: 'hilltop-cultural-centre',
    title: 'hilltop cultural centre',
    zhTitle: '山顶文化中心',
    location: 'hanoi, vietnam',
    zhLocation: '越南河内',
    year: '2022',
    type: 'institutional',
    zhType: '公共建筑',
    tags: ['institutional', 'landscape'],
    status: 'completed',
    description:
      'Sited on a prominent hilltop, this cultural centre serves as both civic landmark and gathering space. The building is conceived as a series of connected volumes that step down the hillside, creating terraced outdoor spaces with views across the city.',
    zhDescription:
      '坐落于山顶的显著位置，这座文化中心既是城市地标，也是公众聚集空间。建筑由一系列相连体量构成，沿山坡层层跌落，形成可俯瞰全城的梯级户外空间。',
    images: [
      img('photo-1576831371356-d6e9411ae501', 900, 900),
      ...GALLERY,
    ],
    related: ['urban-oasis-residences', 'marina-bay-precinct'],
  },
  {
    slug: 'marina-bay-precinct',
    title: 'marina bay precinct',
    zhTitle: '滨海湾片区',
    location: 'singapore',
    zhLocation: '新加坡',
    year: '2021',
    type: 'masterplanning',
    zhType: '总体规划',
    tags: ['masterplanning', 'commercial', 'institutional'],
    status: 'completed',
    client: 'urban redevelopment authority',
    description:
      "A comprehensive urban design study for the continued evolution of Marina Bay as Singapore's premier waterfront precinct. The masterplan establishes a framework for future development that prioritises public realm quality, pedestrian connectivity, and activated waterfront edges.",
    zhDescription:
      '一项综合城市设计研究，旨在推动滨海湾作为新加坡首要滨水片区的持续演进。总体规划为未来发展建立框架，优先考虑公共领域品质、步行连通性与活力滨水界面。',
    images: [
      img('photo-1610696338308-dd48c9da0c72', 900, 900),
      ...GALLERY,
    ],
    related: ['wellness-township', 'urban-oasis-residences'],
  },
  {
    slug: 'eco-resort-bali',
    title: 'eco resort',
    zhTitle: '生态度假村',
    location: 'ubud, bali',
    zhLocation: '印度尼西亚巴厘岛乌布',
    year: '2023',
    type: 'hospitality',
    zhType: '酒店',
    tags: ['hospitality', 'landscape'],
    status: 'in progress',
    client: 'confidential',
    description:
      'A sustainably designed eco-resort set within the rice terraces of Ubud. The design philosophy centres on minimal intervention, with structures raised above the landscape to preserve natural drainage patterns and root systems. Local materials and craft traditions are reinterpreted throughout.',
    zhDescription:
      '位于乌布梯田之中的可持续生态度假村。设计哲学以最小干预为核心，建筑架高于地面之上以保护自然排水系统与根系。当地材料与传统工艺在整个项目中得到重新诠释。',
    images: [
      img('photo-1599685315640-9ceab2f58148', 900, 900),
      ...GALLERY,
    ],
    related: ['the-pavilion-hotel', 'wellness-township'],
  },
  {
    slug: 'science-park-offices',
    title: 'science park offices',
    zhTitle: '科学园办公室',
    location: 'singapore',
    zhLocation: '新加坡',
    year: '2021',
    type: 'commercial',
    zhType: '商业',
    tags: ['commercial', 'industrial'],
    status: 'completed',
    client: 'confidential',
    description:
      'An innovative workplace environment designed to foster collaboration and creative thinking. The interior architecture draws on the language of the surrounding science park, with exposed structural elements, flexible open floors, and abundant natural light filtered through a curated palette of materials.',
    zhDescription:
      '一个旨在促进协作与创新思维的办公环境。室内建筑汲取周边科学园的语言，以裸露结构构件、灵活开放楼层和透过精选材料调节的充沛自然光为特色。',
    images: [
      img('photo-1724582586458-a51791349977', 900, 900),
      ...GALLERY,
    ],
    related: ['urban-oasis-residences', 'hilltop-cultural-centre'],
  },
  {
    slug: 'riverside-masterplan',
    title: 'riverside masterplan',
    zhTitle: '河滨总体规划',
    location: 'kuala lumpur, malaysia',
    zhLocation: '马来西亚吉隆坡',
    year: '2022',
    type: 'masterplanning',
    zhType: '总体规划',
    tags: ['masterplanning', 'commercial', 'residential', 'landscape'],
    status: 'in progress',
    client: 'confidential',
    description:
      'A mixed-use riverside development that reconnects the city to its waterfront heritage. The masterplan creates a new urban quarter anchored by cultural facilities, a continuous riverside promenade, and a range of residential and commercial uses designed to activate the precinct throughout the day.',
    zhDescription:
      '一个将城市与其滨水历史重新连接的混合用途河滨开发项目。总体规划以文化设施、连续滨河长廊以及全天候激活片区的住宅与商业功能为核心，打造全新城市片区。',
    images: [
      img('photo-1487214626629-b7eaa70441b2', 900, 900),
      ...GALLERY,
    ],
    related: ['marina-bay-precinct', 'wellness-township'],
  },
]
