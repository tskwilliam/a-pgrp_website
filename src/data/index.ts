// ─────────────────────────────────────────────────────────────
// DATA  —  central re-export
//
// Edit content in the sub-files:
//   src/data/projects/index.ts   — project entries + Project type
//   src/data/people/index.ts     — staff/partner entries + Person type
//   src/data/media/index.ts      — articles/press + Article type
//
// Services and jobs stay here (they are less frequently edited).
// ─────────────────────────────────────────────────────────────

export type { Project } from './projects'
export { projects } from './projects'

export type { Person } from './people'
export { people } from './people'

export type { Article } from './media'
export { articles } from './media'

// ── Services ─────────────────────────────────────────────────
export interface Service {
  id: string
  number: string
  name: string
  zhName: string
  description: string
  zhDescription: string
  imageUrl: string
  relatedCategory: string
}

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const services: Service[] = [
  {
    id: 'architecture',
    number: '01',
    name: 'architecture',
    zhName: '建筑设计',
    description:
      'we create buildings that respond thoughtfully to their context — cultural, climatic, and social. from concept through to completion, our architecture is guided by a conviction that form and function must be inseparable.',
    zhDescription:
      '我们创造的建筑对其文化、气候与社会背景作出深思熟虑的回应。从概念到落成，我们的建筑设计始终坚信形式与功能不可分割。',
    imageUrl: img('photo-1483366774565-c783b9f70e2c'),
    relatedCategory: 'architecture',
  },
  {
    id: 'project-management',
    number: '02',
    name: 'project management',
    zhName: '项目管理',
    description:
      'our project management services ensure that design intent is realised with precision. we manage complex, multi-stakeholder projects across all phases, delivering quality outcomes on time and within budget.',
    zhDescription:
      '我们的项目管理服务确保设计意图得到精准实现。我们跨越所有阶段管理复杂的多方利益相关者项目，按时按预算交付优质成果。',
    imageUrl: img('photo-1576831371356-d6e9411ae501'),
    relatedCategory: 'architecture',
  },
  {
    id: 'interior-design',
    number: '03',
    name: 'interior design',
    zhName: '室内设计',
    description:
      'from intimate hospitality environments to corporate workplaces, our interior design is rooted in a deep understanding of how people occupy space. we create interiors that are refined, purposeful, and enduring.',
    zhDescription:
      '从亲密的酒店环境到企业办公空间，我们的室内设计植根于对人如何使用空间的深刻理解。我们创造精致、有目的性且历久弥新的室内环境。',
    imageUrl: img('photo-1711873316332-acb6930211e1'),
    relatedCategory: 'interior',
  },
  {
    id: 'landscape-design',
    number: '04',
    name: 'landscape design',
    zhName: '景观设计',
    description:
      'we design landscapes that extend the architecture into the ground — creating ecologies, circulation systems, and sensory experiences that connect people to the natural world, even within the densest urban settings.',
    zhDescription:
      '我们设计的景观将建筑延伸至大地——创造生态系统、动线与感官体验，使人们与自然世界相连，即便在最密集的城市环境中。',
    imageUrl: img('photo-1599685315640-9ceab2f58148'),
    relatedCategory: 'landscape',
  },
  {
    id: 'urban-planning',
    number: '05',
    name: 'urban planning',
    zhName: '城市规划',
    description:
      'our urban planning practice engages with the complexity of cities — their movement systems, land uses, social infrastructures, and economic forces. we develop plans that are robust, flexible, and deeply humane.',
    zhDescription:
      '我们的城市规划实践面对城市的复杂性——其交通系统、土地利用、社会基础设施与经济力量。我们制定的规划具有稳健性、灵活性与深厚的人文关怀。',
    imageUrl: img('photo-1610696338308-dd48c9da0c72'),
    relatedCategory: 'urban planning',
  },
  {
    id: 'master-planning',
    number: '06',
    name: 'masterplanning',
    zhName: '总体规划',
    description:
      'from new townships to urban precincts, our masterplans establish the spatial, social, and ecological frameworks that allow great places to grow over time. we plan for the long term, with clarity and ambition.',
    zhDescription:
      '从新城镇到城市片区，我们的总体规划建立空间、社会与生态框架，使优质场所随时间生长。我们着眼长远，以清晰的愿景和雄心规划未来。',
    imageUrl: img('photo-1596652276565-d6ed2e0ab54a'),
    relatedCategory: 'masterplanning',
  },
  {
    id: 'tourism-development',
    number: '07',
    name: 'tourism development',
    zhName: '旅游开发',
    description:
      'we bring a holistic approach to tourism development, considering architecture, landscape, programming, and operations together. our tourism projects create authentic experiences that are rooted in place and culture.',
    zhDescription:
      '我们以整体视角开展旅游开发，将建筑、景观、规划与运营统筹考量。我们的旅游项目创造植根于地方与文化的真实体验。',
    imageUrl: img('photo-1668120089662-42642838cfef'),
    relatedCategory: 'tourism development',
  },
]

// ── Jobs ──────────────────────────────────────────────────────
export interface Job {
  title: string
  zhTitle: string
  department: string
  zhDepartment: string
  location: string
  type: string
  zhType: string
  description: string
  zhDescription: string
  requirements: string[]
  zhRequirements: string[]
}

export const jobListings: Job[] = [
  {
    title: 'senior architect',
    zhTitle: '高级建筑师',
    department: 'architecture',
    zhDepartment: '建筑设计',
    location: 'singapore',
    type: 'full-time',
    zhType: '全职',
    description:
      'we are looking for a talented and experienced senior architect to join our singapore studio. the successful candidate will lead design on a range of projects across residential, hospitality, and civic sectors.',
    zhDescription:
      '我们正在寻找一位才华横溢、经验丰富的高级建筑师加入我们的新加坡工作室。成功候选人将主导住宅、酒店及公共建筑等多类项目的设计工作。',
    requirements: [
      'minimum 8 years of professional experience',
      'registered architect in singapore or overseas equivalent',
      'proficiency in revit, autocad, and rhino',
      'strong portfolio demonstrating design leadership',
      'excellent communication and presentation skills',
    ],
    zhRequirements: [
      '至少8年专业经验',
      '持有新加坡注册建筑师资格或同等境外资格',
      '熟练使用Revit、AutoCAD和Rhino',
      '具备充分展示设计领导力的作品集',
      '出色的沟通与演示能力',
    ],
  },
  {
    title: 'interior designer',
    zhTitle: '室内设计师',
    department: 'interior design',
    zhDepartment: '室内设计',
    location: 'singapore',
    type: 'full-time',
    zhType: '全职',
    description:
      'we are seeking a skilled interior designer with experience in hospitality and high-end residential projects. you will work closely with our interior design lead on a portfolio of exciting commissions across southeast asia.',
    zhDescription:
      '我们正在寻找一位在酒店及高端住宅项目方面经验丰富的室内设计师。您将与室内设计负责人紧密合作，参与整个东南亚的精彩委托项目。',
    requirements: [
      'minimum 4 years of professional experience',
      'proficiency in autocad, sketchup, and 3ds max or enscape',
      'strong material and finish specification skills',
      'experience with ff&e procurement',
      'attention to detail and passion for craft',
    ],
    zhRequirements: [
      '至少4年专业经验',
      '熟练使用AutoCAD、SketchUp及3ds Max或Enscape',
      '较强的材料与饰面规格制定能力',
      '具有FF&E采购经验',
      '对工艺的细节把控力与热情',
    ],
  },
  {
    title: 'urban designer',
    zhTitle: '城市设计师',
    department: 'urban planning',
    zhDepartment: '城市规划',
    location: 'singapore',
    type: 'full-time',
    zhType: '全职',
    description:
      'we are looking for a thoughtful urban designer to join our planning and masterplanning team. you will contribute to large-scale urban design and masterplanning commissions across southeast asia.',
    zhDescription:
      '我们正在寻找一位具有深度思考能力的城市设计师加入我们的规划与总体规划团队。您将参与整个东南亚的大型城市设计与总体规划项目。',
    requirements: [
      'degree in urban design, urban planning, or architecture',
      'minimum 3 years of professional experience in urban design',
      'proficiency in autocad, arcgis, and adobe suite',
      'strong research and analytical skills',
      'experience preparing planning and design reports',
    ],
    zhRequirements: [
      '城市设计、城市规划或建筑学学位',
      '至少3年城市设计专业经验',
      '熟练使用AutoCAD、ArcGIS及Adobe套件',
      '较强的研究与分析能力',
      '具有编制规划与设计报告的经验',
    ],
  },
  {
    title: 'architectural intern',
    zhTitle: '建筑实习生',
    department: 'architecture',
    zhDepartment: '建筑设计',
    location: 'singapore',
    type: 'internship',
    zhType: '实习',
    description:
      'we welcome applications from motivated architectural students for internship positions within our singapore studio. interns will work alongside experienced architects on live projects across a range of sectors.',
    zhDescription:
      '我们欢迎有积极性的建筑专业学生申请我们新加坡工作室的实习职位。实习生将与经验丰富的建筑师并肩参与跨多类型领域的实际项目。',
    requirements: [
      'currently enrolled in a recognised architecture programme',
      'minimum 6-month internship period',
      'proficiency in autocad and sketchup',
      'strong hand drawing and model-making skills',
      'genuine curiosity and enthusiasm for architecture',
    ],
    zhRequirements: [
      '目前在读并获认可的建筑学专业',
      '实习期最短六个月',
      '熟练使用AutoCAD和SketchUp',
      '较强的手绘及模型制作能力',
      '对建筑的真挚好奇心与热情',
    ],
  },
]
