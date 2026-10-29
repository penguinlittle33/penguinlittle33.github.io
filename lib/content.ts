export const contactEmail = "penguinlittle33@gmail.com";
export type Lang = "zh" | "en";
export type Bilingual = { zh: string; en: string };
export type RichNode = { type: string; text?: string; href?: string; src?: string; alt?: string; children?: RichNode[] };
export type Entry = {
  id: string; kind: "work" | "reading" | "journal"; status: "draft" | "published";
  title: Bilingual; summary: Bilingual; category: Bilingual; period: string;
  body: { zh: RichNode[]; en: RichNode[] }; cover: string; coverCrop?: "left-half"; date: string;
  book: string; bookAuthor: string; bookEn?: string; bookAuthorEn?: string;
};
export type Profile = { photo: string; intro: Bilingual; xiaohongshu: string; github: string; linkedin: string };
export const pair = (zh: string, en: string): Bilingual => ({ zh, en });
export const textOf = (v: Bilingual, lang: Lang) => v[lang] || v.zh || v.en;
let staticPrefix="./";
export function configureStaticPrefix(prefix:string){staticPrefix=prefix;}
export function assetPath(value:string){return value.startsWith("/")&&!value.startsWith("//")?staticPrefix+value.slice(1):value;}
export function href(path:string,lang:Lang){const route=path.split("?")[0].replace(/^\/+|\/+$/g,"");return staticPrefix+(lang==="en"?"en/":"")+(route?route+"/":"")+"index.html";}
export const getLang = (s: Record<string, string | string[] | undefined>): Lang => s.lang === "en" ? "en" : "zh";
const p = (text: string): RichNode => ({ type: "p", children: [{ type: "text", text }] });
const h = (text: string): RichNode => ({ type: "h2", children: [{ type: "text", text }] });
const img = (src: string, alt: string): RichNode => ({ type: "img", src, alt });
export const defaultProfile: Profile = {
  photo: "/portrait.jpg",
  intro: pair("你好，我是彭筱，华东师范大学土木水利专业研一学生。目前关注水动力数值模拟，期待慢慢走进水利、海洋与生态相关行业。\n我希望成为一个积极向上、思想活跃，也成熟稳重、值得信赖的人。\n对待学习和工作，我愿意把问题想清楚，把事情做扎实；对待生活，我希望始终保有好奇心。\n这里既是我的个人主页，也用来记录学习、生活和一些不成熟的思考。欢迎一起交流！", "Hi, I'm Xiao Peng, a first-year master's student in Civil and Hydraulic Engineering at East China Normal University. I'm currently focused on hydrodynamic numerical modeling, and look forward to gradually exploring the fields of water, ocean and ecology.\nI hope to be positive and open to new ideas, while remaining mature, grounded and dependable.\nIn study and work, I value thinking things through and following through with care. In life, I hope to always stay curious.\nThis is my personal website, and a place to record my studies, everyday life, and thoughts still taking shape. I'd love to exchange ideas!"),
  xiaohongshu: "https://xhslink.cn/o/AnINKUixSt5", github: "https://github.com/penguinlittle33", linkedin: "",
};
export const defaultProjects: Entry[] = [
  {
    id: "flood-risk-warning", kind: "work", status: "published",
    title: pair("电网设备洪水风险智能预警", "Flood-risk early warning for power-grid equipment"),
    summary: pair("整合洪水与设备资料，关注敏感区域，探索洪灾下电网设备的动态演变。", "Bringing flood and equipment data together to study flood-sensitive areas and the response of power-grid equipment."),
    category: pair("洪水风险 · 创新研究", "Flood risk · Research"), period: "2024.06-2025.06", cover: "/projects/flood-risk-dashboard.png", coverCrop: "left-half", date: "2024-06-01", book: "", bookAuthor: "",
    body: {
      zh: [h("项目背景"), p("本项目为国家级大学生创新创业训练计划项目，研究主题为“一种电网设备洪水风险智能预警装置”。"), h("研究内容"), p("整合数据与相关电网设备资料，分析洪水敏感区域，研究大尺寸电网设备面对洪灾的动态演变过程。"), h("装置模块"), img("/projects/warning-modules.png", "预警装置模块示意"), h("相关成果"), p("国家发明专利：一种电网设备洪水风险智能预警装置。" )],
      en: [h("Background"), p("A project under the National Undergraduate Innovation and Entrepreneurship Training Program, focused on an intelligent flood-risk early-warning device for power-grid equipment."), h("Research"), p("Integrating data and equipment information, analyzing flood-sensitive areas, and studying the dynamic response of large power-grid equipment to flooding."), h("Device modules"), img("/projects/warning-modules.png", "Schematic of the early-warning device modules"), h("Related output"), p("Chinese invention patent: an intelligent flood-risk early-warning device for power-grid equipment.")],
    },
  },
  {
    id: "transparent-seepage", kind: "work", status: "published",
    title: pair("让土—岩界面的渗流被看见", "Making soil–rock interface seepage visible"),
    summary: pair("用熔融石英砂制作透明土，构建可视化实验系统，观察界面接触渗流过程。", "Building a transparent-soil experiment with fused silica sand to observe contact seepage at the soil–rock interface."),
    category: pair("渗流可视化 · 实验研究", "Seepage visualization · Experiment"), period: "2023.09-2024.12", cover: "/projects/seepage-experiment.png", date: "2023-09-01", book: "", bookAuthor: "",
    body: {
      zh: [h("项目背景"), p("“大禹杯”大学生科技立项活动项目：一种土—岩界面接触渗流的可视化实验装置。"), h("实验方法"), p("构建土—岩界面接触渗流实验系统，使用熔融石英砂制作透明土，以实现土—岩界面接触渗流过程的可视化。"), h("实验记录"), img("/projects/seepage-curve.jpg", "水力梯度与宏观流速关系曲线"), h("相关成果"), p("国家发明专利：一种土—岩界面土体孔隙渗流与岩石边壁渗流耦合特性的测试方法（实质审查中，按本科简历所载）。"), p("计算机软件著作：排土场堆渣运动过程动画自动生成软件。")],
      en: [h("Background"), p("A university research project under the Dayu Cup program, developing a visualization apparatus for contact seepage at a soil–rock interface."), h("Method"), p("A contact-seepage experiment using transparent soil made from fused silica sand, allowing the seepage process at the interface to be observed."), h("Experimental record"), img("/projects/seepage-curve.jpg", "Hydraulic gradient and macroscopic flow velocity"), h("Related outputs"), p("Chinese invention patent application: a test method for coupled soil pore seepage and rock-boundary seepage at a soil–rock interface. Under substantive examination, as recorded in the undergraduate CV."), p("Software copyright: automatic animation generation for waste-dump material movement.")],
    },
  },
  {
    id: "arch-dam-design", kind: "work", status: "published",
    title: pair("QL 水利枢纽碾压混凝土拱坝设计", "RCC arch-dam design for the QL water-control project"),
    summary: pair("从调洪演算、体型设计到应力分析，结合泄洪消能方案进行比选优化。", "From flood routing and geometry design to stress analysis and the comparison of flood-discharge and energy-dissipation schemes."),
    category: pair("水工设计 · 本科毕业设计", "Hydraulic design · Graduation project"), period: "2025.09-2026.06", cover: "/projects/arch-dam-render.jpg", date: "2025-09-01", book: "", bookAuthor: "",
    body: {
      zh: [h("设计任务"), p("三峡大学 2026 届本科毕业设计：QL 水利枢纽碾压混凝土拱坝设计。"), h("设计过程"), p("通过调洪演算和体型设计，采用拱梁分载法进行应力分析，结合泄洪消能布置方案进行比选优化。"), h("成果"), p("获评三峡大学 2026 届本科毕业生优秀设计。")],
      en: [h("Brief"), p("Undergraduate graduation project at China Three Gorges University, class of 2026: roller-compacted concrete arch-dam design for the QL water-control project."), h("Design process"), p("Flood routing and geometry design, stress analysis using the arch–cantilever load-distribution method, and comparative optimization of flood-discharge and energy-dissipation layouts."), h("Outcome"), p("Recognized as an outstanding undergraduate graduation design at China Three Gorges University in 2026.")],
    },
  },
];
export const kindLabel = { work: pair("项目作品", "Projects"), reading: pair("阅读", "Reading"), journal: pair("生活手记", "Journal") };
