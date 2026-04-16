/**
 * 视图 id：`home` = 标题画面（开始菜单）；其余栏目在子页面切换。
 * `document.body.dataset.menuView` 与 `index.css` 里各 `[data-menu-view]` 字体栈对应。
 *
 * 扩展新栏目（例如「相册」「友链」）：
 * 1. 在本文件把 id 加进 MenuViewId、MENU_ORDER、MENU_DEF（并选一个 atmosphere 控制 ASCII 背景）。
 * 2. App.tsx：`TITLE_MENU_ORDER` 自动排除 home；若新栏目要出现在开始菜单，确保在 MENU_ORDER 里且在 home 之后。
 * 3. 在 <main className="menu-main"> 里增加 {menuView === "你的id" && ( ... )}。
 *
 * 博客文章：往 src/content/blog/*.md 丢文件即可（需 frontmatter 的 title / date），无需改 menu。
 */
import type { AtmosphereId } from "./themes";

export type MenuViewId = "home" | "about" | "projects" | "blog" | "contact";

export const MENU_STORAGE_KEY = "my_blog_web_menu";

export const MENU_ORDER: MenuViewId[] = [
  "home",
  "about",
  "projects",
  "blog",
  "contact",
];

export const MENU_DEF: Record<
  MenuViewId,
  { tab: string; atmosphere: AtmosphereId }
> = {
  home: { tab: "主页", atmosphere: "default" },
  about: { tab: "关于", atmosphere: "storm" },
  projects: { tab: "项目", atmosphere: "redwell" },
  blog: { tab: "博客", atmosphere: "midsummer" },
  contact: { tab: "联系", atmosphere: "window" },
};

export function isMenuViewId(s: string): s is MenuViewId {
  return (MENU_ORDER as readonly string[]).includes(s);
}

export function atmosphereForMenu(view: MenuViewId): AtmosphereId {
  return MENU_DEF[view].atmosphere;
}
