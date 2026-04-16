import type { BlogPost } from "./blog/parsePost";
import { MENU_DEF, MENU_ORDER, type MenuViewId } from "./menu";
import { site } from "./site";

export type ShellRunResult = {
  lines: string[];
  next?: MenuViewId;
  clear?: boolean;
};

const TOP_DIRS: MenuViewId[] = ["about", "projects", "blog", "contact"];

const TAB_TO_MENU: Partial<Record<string, MenuViewId>> = {};
for (const id of MENU_ORDER) {
  TAB_TO_MENU[MENU_DEF[id].tab] = id;
}

export function shellPathForView(v: MenuViewId): string {
  if (v === "home") return "~";
  return `~/${v}`;
}

function normalizeCdArg(arg: string): string {
  let s = arg.trim();
  if (!s || s === "~") return "home";
  if (s === "/" || s === "~/" || s === ".") return "home";
  s = s.replace(/^~\//, "").replace(/^\.\//, "");
  if (s === "..") return "..";
  if (s.startsWith("../")) return s;
  const lower = s.toLowerCase();
  if (lower === "home") return "home";
  return s;
}

function parentOf(v: MenuViewId): MenuViewId {
  return v === "home" ? "home" : "home";
}

function resolveMenuId(raw: string): MenuViewId | ".." | null {
  const s = normalizeCdArg(raw);
  if (s === "..") return "..";
  if (s === "home") return "home";
  const dirs = ["about", "projects", "blog", "contact"] as const;
  if ((dirs as readonly string[]).includes(s)) {
    return s as MenuViewId;
  }
  const tab = TAB_TO_MENU[raw.trim()] ?? TAB_TO_MENU[s];
  if (tab && tab !== "home") return tab;
  return null;
}

export const SHELL_HELP: string[] = [
  "可用命令（站点模拟 shell，非真系统）：",
  "  help              本列表",
  "  clear             清屏",
  "  pwd               当前逻辑路径（与上方内容区同步）",
  "  ls [path]         ~/ 下列目录；在 blog 视图下列 .md",
  "  cd [dir]          cd ~ | cd .. | cd / | cd about|projects|blog|contact",
  "                    支持中文目录名（与顶栏菜单一致）",
  "  cat <file>        README | about.md | site.ts | blog/<slug>.md",
  "  grep <pat>       在 about 与博客正文里搜",
  "  find . | find . -name \"*.md\" | find . -name <slug>",
  "  /                 同 cd ~",
];

function lsLines(menuView: MenuViewId, pathArg: string | undefined, posts: BlogPost[]): string[] {
  const arg = (pathArg ?? ".").trim();
  const atBlog = menuView === "blog";

  if (arg === "~/blog" || arg === "blog" || (atBlog && (arg === "." || arg === "./"))) {
    if (posts.length === 0) return ["(empty)"];
    return posts.map((p) => `${p.slug}.md`);
  }

  if (arg === "." || arg === "~" || arg === "~/" || arg === "") {
    if (menuView === "home" || arg === "~" || arg === "~/") {
      return [...TOP_DIRS.map((d) => `${d}/`), "README"];
    }
    if (atBlog) {
      return posts.length ? posts.map((p) => `${p.slug}.md`) : ["(empty)"];
    }
    return [`./`, "../", "(open panel above; ls ~/blog from ~ for posts)"];
  }

  if (arg === "blog/" || arg === "~/blog/") {
    return posts.length ? posts.map((p) => `${p.slug}.md`) : ["(empty)"];
  }

  return [`ls: cannot access '${arg}': No such file or directory`];
}

function catLines(arg: string | undefined, posts: BlogPost[]): string[] {
  if (!arg) return ["cat: missing operand"];
  const a = arg.trim().replace(/^~\//, "").replace(/^\.\//, "");
  if (a === "README" || a === "README.md") {
    return [
      "Personal site — 用 cd 进入 about / projects / blog / contact 打开对应版面。",
      "技术栈见 about 里的说明；博客在 src/content/blog/*.md。",
    ];
  }
  if (a === "about.md" || a === "about" || a === "about/about.md") {
    return site.about.split(/\r?\n/).slice(0, 120);
  }
  if (a === "site.ts" || a === "./site.ts") {
    return [
      "// src/site.ts — 请在编辑器中打开完整文件。",
      `// name: ${site.name}`,
      `// email: ${site.email}`,
    ];
  }
  const m = /^blog\/(.+)\.md$/.exec(a) ?? /^(.+)\.md$/.exec(a);
  if (m) {
    const slug = m[1].replace(/\.md$/i, "");
    const post = posts.find((p) => p.slug === slug);
    if (!post) return [`cat: ${a}: No such file`];
    return post.bodyMd.split(/\r?\n/).slice(0, 100);
  }
  return [`cat: ${a}: No such file`];
}

function escRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function grepLines(pattern: string, posts: BlogPost[]): string[] {
  if (!pattern) return ["grep: missing pattern"];
  const out: string[] = [];
  const hay = site.about;
  const reAbout = new RegExp(escRe(pattern), "gi");
  if (reAbout.test(hay)) {
    const line = hay.split(/\r?\n/).find((l) => new RegExp(escRe(pattern), "i").test(l));
    if (line) out.push(`about: ${line.slice(0, 200)}`);
  }
  for (const p of posts) {
    const re = new RegExp(escRe(pattern), "gi");
    if (re.test(p.bodyMd) || re.test(p.title)) {
      out.push(`${p.slug}.md: ${p.title}`);
    }
  }
  return out.length ? out : ["(no matches)"];
}

function findLines(args: string[], posts: BlogPost[]): string[] {
  if (args.length === 0) {
    return [".", "./about", "./blog", "./contact", "./projects"];
  }
  if (args[0] !== ".") {
    return [`find: try 'find .' or 'find . -name \"*.md\"'`];
  }
  if (args.length === 1) {
    return [".", "./about", "./blog", "./contact", "./projects"];
  }
  if (args[1] === "-name" && args[2]) {
    const raw = args[2].replace(/^["']|["']$/g, "");
    if (raw === "*.md") {
      return posts.map((p) => `./blog/${p.slug}.md`);
    }
    const name = raw.replace(/\.md$/i, "");
    const hit = posts.filter(
      (p) => p.slug.includes(name) || p.title.includes(name),
    );
    return hit.length ? hit.map((p) => `./blog/${p.slug}.md`) : ["find: no matches"];
  }
  return ["find: syntax not supported"];
}

export function runShellLine(
  raw: string,
  menuView: MenuViewId,
  posts: BlogPost[],
): ShellRunResult {
  const input = raw.trim();
  if (!input) return { lines: [] };

  if (input === "/") {
    return { lines: [], next: "home" };
  }

  const parts = input.split(/\s+/);
  const cmd0 = parts[0] ?? "";
  const cmd = cmd0.toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
    case "?":
      return { lines: [...SHELL_HELP] };
    case "clear":
    case "cls":
      return { lines: [], clear: true };
    case "pwd":
      return { lines: [shellPathForView(menuView)] };
    case "ls": {
      return { lines: lsLines(menuView, args[0], posts) };
    }
    case "cd": {
      const target = args.join(" ").trim() || "~";
      if (target === "/" || target === "~" || target === "~/" || target === ".") {
        return { lines: [], next: "home" };
      }
      const r = resolveMenuId(target);
      if (r === "..") {
        return { lines: [], next: parentOf(menuView) };
      }
      if (r && r !== "home") {
        return { lines: [], next: r };
      }
      if (r === "home") {
        return { lines: [], next: "home" };
      }
      return { lines: [`cd: ${target}: No such file or directory`] };
    }
    case "cat":
      return { lines: catLines(args.join(" ") || undefined, posts) };
    case "grep":
      return { lines: grepLines(args.join(" ") || "", posts) };
    case "find":
      return { lines: findLines(args, posts) };
    default:
      return {
        lines: [`${cmd0}: command not found (try help)`],
      };
  }
}
