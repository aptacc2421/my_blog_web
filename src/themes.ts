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

export type BannerLine = { text: string; color: string };

export type AtmosphereDef = {
  tab: string;
  /** 装饰条：意象在背景与 Ascii，此处仅占一行氛围，正文仍保持克制 */
  banner: BannerLine[];
};

export const ATMOSPHERE_DEF: Record<AtmosphereId, AtmosphereDef> = {
  default: {
    tab: "RAIN",
    banner: [
      { text: "╔══════════════════════════════════════╗", color: "#4db892" },
      { text: "║   NIGHT LINK · TOKYO / GLASS REFL.   ║", color: "#9fd4ff" },
      { text: "╚══════════════════════════════════════╝", color: "#3a9f7a" },
    ],
  },
  storm: {
    tab: "STORM",
    banner: [
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "#4a6a8a" },
      { text: "  HEAVY RAIN · LOW VIS · WET STREET   ", color: "#b8d4f0" },
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "#3a5a78" },
    ],
  },
  midsummer: {
    tab: "RUN",
    banner: [
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", color: "#e89a4a" },
      { text: "  MIDSUMMER ROAD · HEAT HAZE · ESCAPE  ", color: "#ffe9a8" },
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", color: "#c86a30" },
    ],
  },
  redwell: {
    tab: "WELL",
    banner: [
      { text: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", color: "#5a1820" },
      { text: "  DEEP RED · SUBWAY STEAM · WARNING    ", color: "#ff8a8a" },
      { text: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", color: "#3a080c" },
    ],
  },
  window: {
    tab: "GLASS",
    banner: [
      { text: "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", color: "#fff3dc" },
      { text: "  FLOOR-TO-CEILING · CITY GLOW BELOW  ", color: "#c8ddff" },
      { text: "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔", color: "#ffe8c8" },
    ],
  },
};

export function isAtmosphereId(s: string): s is AtmosphereId {
  return (ATMOSPHERE_ORDER as readonly string[]).includes(s);
}

export function getAtmosphereDef(id: AtmosphereId): AtmosphereDef {
  return ATMOSPHERE_DEF[id];
}
