/**
 * 内容策略（对齐需求）：
 * - 正文 / 简介 / 项目描述：正常、克制，可直接用于简历或对外介绍。
 * - 「龙族感」：由顶部「氛围」切换背景（见 themes.css / themes.ts），不占正文。
 * - 终端感：system / bootLog / 命令式按钮与区块标题，仅作交互壳。
 */
export const site = {
  name: "你的名字",
  tagline:
    "做 Web 前端与全栈开发，关注可维护性、性能与可访问性，用清晰文档把复杂系统讲明白。",
  role: "全栈工程师",
  location: "GMT+8",
  about:
    "我有多年 Web 项目经验，熟悉 TypeScript、React 与 Node.js 生态，能把设计稿与接口协议落成可上线的页面与服务。平时重视代码评审、单测与 CI，也愿意参与需求澄清与排期。",
  email: "hello@example.com",
  system: {
    name: "SITE-TERM",
    host: "localhost",
    version: "1.0.0",
  },
  /** 终端开机动画：偏技术向，避免小说腔 */
  bootLog: [
    "kernel: workspace online …………… OK",
    "fs: mount ~/repo (rw) ………………… OK",
    "net: uplink idle ……………………… OK",
    "ui: compositor ready ………………… OK",
  ],
  /** 区块小标签：中性文案；意象改在顶部「氛围」里切换 */
  sections: {
    hero: "首页",
    about: "关于",
    skills: "技能",
    projects: "项目",
    contact: "联系",
  },
  links: [
    { label: "GitHub", href: "https://github.com", cmd: "git remote -v" },
    { label: "博客", href: "#", cmd: "less ./blog/README.md" },
    { label: "LinkedIn", href: "https://linkedin.com", cmd: "open profile" },
  ],
  projects: [
    {
      title: "数据仪表盘",
      desc: "基于 React 与 TypeScript 的管理端，封装表格、筛选与图表组件，统一权限与埋点方案。",
      href: "#",
      tags: ["React", "TS", "Vite"],
    },
    {
      title: "CLI 自动化工具",
      desc: "Node 命令行工具，将重复部署与配置检查脚本化，附带使用说明与错误码文档。",
      href: "#",
      tags: ["Node", "CLI"],
    },
    {
      title: "知识库模板",
      desc: "Markdown 编写、本地搜索与侧边目录，适合个人笔记或小团队文档站。",
      href: "#",
      tags: ["Markdown", "Search"],
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "系统设计",
    "技术写作",
    "代码评审",
  ],
  status: [
    { label: "FOCUS", value: "Web / 工程化" },
    { label: "STYLE", value: "可读、可测" },
    { label: "OUTPUT", value: "代码 / 文档" },
    { label: "STATE", value: "OPEN_TO_WORK" },
  ],
  contactTitle: "联系",
  contactLead:
    "欢迎通过邮件讨论合作、兼职或技术交流；也可在 GitHub 上直接提 issue。",
} as const;
