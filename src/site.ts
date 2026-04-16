/** 在这里修改你的个人信息与“终端/龙族”氛围文案 */
export const site = {
  name: "你的名字",
  /** 像 RPG 副标题一行 */
  tagline: "雨线在窗外排队，我在终端里和命运对局。",
  /** 职业一行，可自嘲可冷感 */
  role: "写代码的混血种 — 全栈工程师",
  location: "Nibelungen // 未标注坐标",
  about:
    "世界很大，龙很安静。有人把人生当成一场过场动画，我偏想把它编译成可读的日志：错了就改，崩了就重启。咖啡凉了也没关系，反正雨还会下很久。",
  email: "hello@example.com",
  system: {
    name: "DRAGON-CLI",
    host: "cassell.local",
    version: "0.13",
  },
  /** 仿开机滚屏，可自行增删 */
  bootLog: [
    "INIT core ……………………… OK",
    "MOUNT /world/rain …………… rw",
    "LOAD bloodline.dll ………… deferred",
    "LISTEN melancholy.stream … on",
  ],
  sections: {
    hero: "SEQUENCE // COLD_OPEN",
    about: "CH.01 — 档案",
    skills: "SKILL_TREE (read-only)",
    projects: "CH.02 — 任务清单",
    contact: "CH.03 — 联络协议",
  },
  links: [
    { label: "GitHub", href: "https://github.com", cmd: "curl -L gh" },
    { label: "博客", href: "#", cmd: "cat ./blog" },
    { label: "LinkedIn", href: "https://linkedin.com", cmd: "open in" },
  ],
  projects: [
    {
      title: "QUEST_α // 仪表盘",
      desc: "React + TS。像构筑言灵一样把状态锁进格子，界面亮起来的时候，世界安静半秒。",
      href: "#",
      tags: ["React", "TS", "Vite"],
    },
    {
      title: "QUEST_β // 自动化",
      desc: "CLI：把重复的命运写成脚本。文档是写给未来的遗书，也是路标。",
      href: "#",
      tags: ["Node", "CLI"],
    },
    {
      title: "QUEST_γ // 知识库",
      desc: "Markdown + 搜索。记忆太沉，就分卷存放；需要时再召唤。",
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
    "雨夜生存",
  ],
  /** 右侧 STATUS 面板四格 */
  status: [
    { label: "FOCUS", value: "工程 / 产品" },
    { label: "STYLE", value: "可读 > 聪明" },
    { label: "OUTPUT", value: "代码 / 文档" },
    { label: "STATE", value: "LISTENING" },
  ],
} as const;
