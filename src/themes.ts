export type AtmosphereId =
  | "default"
  | "storm"
  | "midsummer"
  | "redwell"
  | "window";

/** 横向选项卡顺序（终端里像 `[ MODE ]`） */
export const ATMOSPHERE_ORDER: AtmosphereId[] = [
  "default",
  "storm",
  "midsummer",
  "redwell",
  "window",
];

/** 装饰条用 tone 上色，颜色随 body[data-atmosphere] 在 themes.css 里变 */
export type BannerTone = "edge" | "mid";

export type BannerLine = { text: string; tone: BannerTone };

export type AtmosphereDef = {
  tab: string;
  /** 装饰条：意象在背景与 Ascii；颜色走 CSS 变量 --phosphor / --gold */
  banner: BannerLine[];
};

export const ATMOSPHERE_DEF: Record<AtmosphereId, AtmosphereDef> = {
  default: {
    tab: "RAIN",
    banner: [
      { text: "╔══════════════════════════════════════╗", tone: "edge" },
      { text: "║   NIGHT LINK · TOKYO / GLASS REFL.   ║", tone: "mid" },
      { text: "╚══════════════════════════════════════╝", tone: "edge" },
    ],
  },
  storm: {
    tab: "STORM",
    banner: [
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", tone: "edge" },
      { text: "  HEAVY RAIN · LOW VIS · WET STREET   ", tone: "mid" },
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", tone: "edge" },
    ],
  },
  midsummer: {
    tab: "RUN",
    banner: [
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", tone: "edge" },
      { text: "  MIDSUMMER ROAD · HEAT HAZE · ESCAPE  ", tone: "mid" },
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", tone: "edge" },
    ],
  },
  redwell: {
    tab: "WELL",
    banner: [
      { text: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", tone: "edge" },
      { text: "  DEEP RED · SUBWAY STEAM · WARNING    ", tone: "mid" },
      { text: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", tone: "edge" },
    ],
  },
  window: {
    tab: "GLASS",
    banner: [
      { text: "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", tone: "edge" },
      { text: "  FLOOR-TO-CEILING · CITY GLOW BELOW  ", tone: "mid" },
      { text: "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔", tone: "edge" },
    ],
  },
};

export function isAtmosphereId(s: string): s is AtmosphereId {
  return (ATMOSPHERE_ORDER as readonly string[]).includes(s);
}

export function getAtmosphereDef(id: AtmosphereId): AtmosphereDef {
  return ATMOSPHERE_DEF[id];
}
