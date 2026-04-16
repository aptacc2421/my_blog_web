/** 本地存储键：切换后刷新仍保留 */
export const ATMOSPHERE_STORAGE_KEY = "my_blog_web_atmosphere";

/** 顶部选项：只驱动背景/氛围，与正文无关。id 对应 document.documentElement[data-atmosphere] */
export const atmospheres = [
  { id: "default", label: "默认 · 雨夜终端" },
  { id: "storm", label: "雨落狂流之暗" },
  { id: "midsummer", label: "迎着盛夏大逃亡" },
  { id: "redwell", label: "东京 · 红井" },
  { id: "window", label: "落地窗与反光" },
] as const;

export type AtmosphereId = (typeof atmospheres)[number]["id"];

export function isAtmosphereId(s: string): s is AtmosphereId {
  return atmospheres.some((a) => a.id === s);
}
