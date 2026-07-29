// ─────────────────────────────────────────────────────────────
// PEOPLE
//
// To add a team member:
//   1. Copy an existing entry and give it a unique `slug`.
//   2. Set isPartner: true  → shown large (2 per row) on the People page.
//      Set isPartner: false → shown small (4 per row).
//   3. Add a portrait photo to:  public/images/people/<slug>.jpg
//   4. Update imageUrl to:       '/images/people/<slug>.jpg'
// ─────────────────────────────────────────────────────────────

export interface Person {
  slug: string
  name: string
  zhName: string
  position: string
  zhPosition: string
  isPartner: boolean
  imageUrl: string
  bio: string
  zhBio: string
  qualifications: string[]
  zhQualifications: string[]
  experience: string[]
  zhExperience: string[]
  awards?: string[]
  zhAwards?: string[]
}

const img = (id: string, w = 900, h = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const people: Person[] = [
  {
    slug: 'liew-soong-shoon',
    name: 'liew soong shoon',
    zhName: '廖松顺',
    position: 'founding partner',
    zhPosition: '创始合伙人',
    isPartner: true,
    imageUrl: img('photo-1574281570877-bd815ebb50a4'),
    bio: "Liew Soong Shoon co-founded a+pgrp in 2004 following distinguished careers at leading international architecture practices in Singapore and London. His work is defined by a commitment to place-making and a conviction that architecture must respond with sensitivity to its cultural, climatic, and social context.",
    zhBio: '廖松顺于2004年联合创立a+pgrp，此前曾在新加坡和伦敦多家知名国际建筑事务所任职。他的作品以对场所营造的执着追求以及建筑应敏感回应文化、气候与社会背景的坚定信念为核心。',
    qualifications: [
      'bachelor of architecture (honours), national university of singapore',
      'master of architecture, architectural association london',
      'registered architect, singapore',
      'member, singapore institute of architects',
    ],
    zhQualifications: [
      '建筑学荣誉学士，新加坡国立大学',
      '建筑学硕士，英国建筑联盟学院',
      '新加坡注册建筑师',
      '新加坡建筑师学会会员',
    ],
    experience: [
      'wellness township, myanmar',
      'urban oasis residences, singapore',
      'the pavilion hotel, chiang mai',
      'marina bay precinct, singapore',
      'riverside masterplan, kuala lumpur',
    ],
    zhExperience: [
      '健康城镇，缅甸',
      '城市绿洲住宅，新加坡',
      '亭阁酒店，清迈',
      '滨海湾片区，新加坡',
      '河滨总体规划，吉隆坡',
    ],
    awards: [
      'sia architectural design award 2022',
      "fiabci prix d'excellence, merit award 2021",
      'aia singapore design award 2019',
    ],
    zhAwards: [
      '新加坡建筑师学会建筑设计奖 2022',
      '国际房地产联合会卓越奖 优秀奖 2021',
      '美国建筑师学会新加坡设计奖 2019',
    ],
  },
  {
    slug: 'mei-mei-leong',
    name: 'mei mei leong',
    zhName: '梁美美',
    position: 'partner',
    zhPosition: '合伙人',
    isPartner: true,
    imageUrl: img('photo-1619799090425-0efe92bd62a7'),
    bio: "Mei Mei Leong brings exceptional depth in interior design and spatial planning to the practice. Her design philosophy centres on the relationship between people and place, believing that interiors must support human wellbeing as much as they delight the eye.",
    zhBio: '梁美美为事务所带来深厚的室内设计与空间规划专业积累。她的设计哲学以人与场所的关系为核心，深信室内空间在悦目之余，更须支持人的身心健康。',
    qualifications: [
      'bachelor of interior design (honours), lasalle college of the arts',
      'master of interior architecture, royal college of art, london',
      'registered interior designer, singapore',
      'fellow, institute of interior designers singapore',
    ],
    zhQualifications: [
      '室内设计荣誉学士，新加坡拉萨尔艺术学院',
      '室内建筑学硕士，英国皇家艺术学院',
      '新加坡注册室内设计师',
      '新加坡室内设计师学会院士',
    ],
    experience: [
      'the pavilion hotel, chiang mai',
      'science park offices, singapore',
      'eco resort, ubud bali',
      'urban oasis residences, singapore',
    ],
    zhExperience: [
      '亭阁酒店，清迈',
      '科学园办公室，新加坡',
      '生态度假村，巴厘岛乌布',
      '城市绿洲住宅，新加坡',
    ],
    awards: [
      'id+a asia interior design award 2023',
      'singapore interior design awards, best hospitality 2022',
      'frame awards, merit 2020',
    ],
    zhAwards: [
      'ID+A亚洲室内设计奖 2023',
      '新加坡室内设计奖 最佳酒店项目 2022',
      'Frame Awards 优秀奖 2020',
    ],
  },
  {
    slug: 'james-liu',
    name: 'james liu',
    zhName: '刘建明',
    position: 'associate principal, architecture',
    zhPosition: '建筑副总监',
    isPartner: false,
    imageUrl: img('photo-1600896997793-b8ed3459a17f'),
    bio: "James Liu leads architectural design across the practice's residential and commercial portfolio. With fifteen years of experience, he brings rigorous technical knowledge and a nuanced design sensibility to complex projects.",
    zhBio: '刘建明主导事务所住宅与商业项目的建筑设计工作。凭借十五年从业经验，他将严谨的技术知识与细腻的设计感知力带入复杂项目之中。',
    qualifications: [
      'bachelor of architecture, national university of singapore',
      'master of architecture, eth zurich',
    ],
    zhQualifications: [
      '建筑学学士，新加坡国立大学',
      '建筑学硕士，苏黎世联邦理工学院',
    ],
    experience: ['urban oasis residences, singapore', 'hilltop cultural centre, hanoi', 'science park offices, singapore'],
    zhExperience: ['城市绿洲住宅，新加坡', '山顶文化中心，河内', '科学园办公室，新加坡'],
  },
  {
    slug: 'sarah-tan',
    name: 'sarah tan',
    zhName: '陈诗慧',
    position: 'associate principal, interior design',
    zhPosition: '室内设计副总监',
    isPartner: false,
    imageUrl: img('photo-1631253205777-9f792356b1f4'),
    bio: "Sarah Tan leads interior design projects with a focus on hospitality and high-end residential. Her sensitivity to material and detail creates spaces that are refined, restful, and deeply considered.",
    zhBio: '陈诗慧主导酒店与高端住宅室内设计项目。她对材料与细节的敏锐感知，塑造出精致、舒适且经过深思熟虑的空间。',
    qualifications: [
      'bachelor of interior design, lasalle college of the arts',
      'member, institute of interior designers singapore',
    ],
    zhQualifications: [
      '室内设计学士，新加坡拉萨尔艺术学院',
      '新加坡室内设计师学会会员',
    ],
    experience: ['the pavilion hotel, chiang mai', 'eco resort, ubud bali', 'science park offices, singapore'],
    zhExperience: ['亭阁酒店，清迈', '生态度假村，巴厘岛乌布', '科学园办公室，新加坡'],
  },
  {
    slug: 'michael-lim',
    name: 'michael lim',
    zhName: '林明轩',
    position: 'senior architect',
    zhPosition: '高级建筑师',
    isPartner: false,
    imageUrl: img('photo-1608174386344-80898cec6beb'),
    bio: 'Michael Lim brings a strong design voice and technical rigour to every project he leads. He is particularly skilled in complex mixed-use and civic commissions.',
    zhBio: '林明轩为每个主导项目带来鲜明的设计主张与严谨的技术素养，尤其擅长复杂综合体与公共建筑项目。',
    qualifications: ['bachelor of architecture, university of melbourne', 'registered architect, singapore'],
    zhQualifications: ['建筑学学士，墨尔本大学', '新加坡注册建筑师'],
    experience: ['hilltop cultural centre, hanoi', 'marina bay precinct, singapore'],
    zhExperience: ['山顶文化中心，河内', '滨海湾片区，新加坡'],
  },
  {
    slug: 'rachel-wong',
    name: 'rachel wong',
    zhName: '王瑞琪',
    position: 'senior interior designer',
    zhPosition: '高级室内设计师',
    isPartner: false,
    imageUrl: img('photo-1719406508345-f0460303349b'),
    bio: 'Rachel Wong specialises in luxury residential and boutique hospitality interiors. Her work is characterised by a restrained palette and exceptional attention to craftsmanship and detail.',
    zhBio: '王瑞琪专注于豪华住宅与精品酒店室内设计。她的作品以克制的色调和对工艺与细节的极致关注为特色。',
    qualifications: ['bachelor of interior architecture (honours), rmit university'],
    zhQualifications: ['室内建筑学荣誉学士，澳大利亚皇家墨尔本理工大学'],
    experience: ['eco resort, ubud bali', 'urban oasis residences, singapore'],
    zhExperience: ['生态度假村，巴厘岛乌布', '城市绿洲住宅，新加坡'],
  },
  {
    slug: 'david-ng',
    name: 'david ng',
    zhName: '吴大伟',
    position: 'urban design lead',
    zhPosition: '城市设计总监',
    isPartner: false,
    imageUrl: img('photo-1569594984813-02490511ddcb'),
    bio: "David Ng leads the practice's urban planning and masterplanning portfolio. With expertise spanning urban design policy, transportation planning, and public realm design, he brings a holistic perspective to large-scale commissions.",
    zhBio: '吴大伟主导事务所的城市规划与总体规划业务。凭借横跨城市设计政策、交通规划与公共空间设计的专业积累，他为大型项目提供全局视角。',
    qualifications: [
      'bachelor of urban planning, national university of singapore',
      'master of urban design, harvard graduate school of design',
    ],
    zhQualifications: [
      '城市规划学士，新加坡国立大学',
      '城市设计硕士，哈佛大学设计研究生院',
    ],
    experience: ['marina bay precinct, singapore', 'wellness township, myanmar', 'riverside masterplan, kuala lumpur'],
    zhExperience: ['滨海湾片区，新加坡', '健康城镇，缅甸', '河滨总体规划，吉隆坡'],
  },
  {
    slug: 'mei-chen',
    name: 'mei chen',
    zhName: '陈梅',
    position: 'landscape architect',
    zhPosition: '景观建筑师',
    isPartner: false,
    imageUrl: img('photo-1738844153732-a485f0e78382'),
    bio: 'Mei Chen leads landscape design across the practice with a particular interest in tropical planting design and biophilic environments that integrate architecture and nature.',
    zhBio: '陈梅主导事务所景观设计工作，尤其专注于热带植栽设计以及将建筑与自然融为一体的亲生物环境。',
    qualifications: ['bachelor of landscape architecture, national university of singapore'],
    zhQualifications: ['景观建筑学学士，新加坡国立大学'],
    experience: ['eco resort, ubud bali', 'wellness township, myanmar', 'the pavilion hotel, chiang mai'],
    zhExperience: ['生态度假村，巴厘岛乌布', '健康城镇，缅甸', '亭阁酒店，清迈'],
  },
  {
    slug: 'leon-park',
    name: 'leon park',
    zhName: '朴俊赫',
    position: 'project architect',
    zhPosition: '项目建筑师',
    isPartner: false,
    imageUrl: img('photo-1777446015841-b5c8b08cf7b6'),
    bio: 'Leon Park is a skilled project architect with a particular strength in construction documentation and contract administration. He brings precision and care to every project he manages.',
    zhBio: '朴俊赫是一位出色的项目建筑师，尤其擅长施工文件编制与合同管理，为每个经手的项目带来精准与细致。',
    qualifications: ['bachelor of architecture, korea university', 'registered architect, singapore'],
    zhQualifications: ['建筑学学士，韩国高丽大学', '新加坡注册建筑师'],
    experience: ['urban oasis residences, singapore', 'science park offices, singapore'],
    zhExperience: ['城市绿洲住宅，新加坡', '科学园办公室，新加坡'],
  },
  {
    slug: 'anna-krishna',
    name: 'anna krishna',
    zhName: '安娜·克里希纳',
    position: 'interior designer',
    zhPosition: '室内设计师',
    isPartner: false,
    imageUrl: img('photo-1567016376408-0226e4d0c1ea'),
    bio: "Anna Krishna brings a fresh perspective and genuine enthusiasm to interior design projects. Her work is characterised by thoughtful material selections and a sensitivity to the way people inhabit spaces.",
    zhBio: '安娜·克里希纳为室内设计项目带来清新视角与真诚热忱。她的作品以审慎的材料选择和对人如何栖居空间的敏感洞察为特色。',
    qualifications: ['bachelor of interior design, lasalle college of the arts'],
    zhQualifications: ['室内设计学士，新加坡拉萨尔艺术学院'],
    experience: ['the pavilion hotel, chiang mai', 'science park offices, singapore'],
    zhExperience: ['亭阁酒店，清迈', '科学园办公室，新加坡'],
  },
]
