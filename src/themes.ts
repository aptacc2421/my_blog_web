export type AtmosphereId =
  | "default"
  | "storm"
  | "midsummer"
  | "redwell"
  | "window";

/** 可选：与氛围 id 顺序一致，供以后扩展用 */
export const ATMOSPHERE_ORDER: AtmosphereId[] = [
  "default",
  "storm",
  "midsummer",
  "redwell",
  "window",
];

export type AtmosphereDef = {
  /** 内部标签（调试/未来 UI），当前不渲染到页面 */
  tab: string;
};

export const ATMOSPHERE_DEF: Record<AtmosphereId, AtmosphereDef> = {
  default: { tab: "RAIN" },
  storm: { tab: "STORM" },
  midsummer: { tab: "RUN" },
  redwell: { tab: "WELL" },
  window: { tab: "GLASS" },
};

export function isAtmosphereId(s: string): s is AtmosphereId {
  return (ATMOSPHERE_ORDER as readonly string[]).includes(s);
}

export function getAtmosphereDef(id: AtmosphereId): AtmosphereDef {
  return ATMOSPHERE_DEF[id];
}
