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
  /** 早期游戏标题感：彩色多行字符串，仅占装饰层 */
  banner: BannerLine[];
};

export const ATMOSPHERE_DEF: Record<AtmosphereId, AtmosphereDef> = {
  default: {
    tab: "RAIN",
    banner: [
      { text: "╔══════════════════════════════════════╗", color: "#3ee89a" },
      { text: "║   NIGHT LINK · TOKYO / TERMINAL      ║", color: "#8fd4ff" },
      { text: "╚══════════════════════════════════════╝", color: "#3ee89a" },
    ],
  },
  storm: {
    tab: "STORM",
    banner: [
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "#4a6a8a" },
      { text: "  HEAVY RAIN · LOW VISIBILITY · COLD  ", color: "#a8c8e8" },
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "#3a5a78" },
    ],
  },
  midsummer: {
    tab: "RUN",
    banner: [
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", color: "#ffb347" },
      { text: "  MIDSUMMER ESCAPE · HEAT HAZE · ROAD  ", color: "#ffe566" },
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", color: "#ff8844" },
    ],
  },
  redwell: {
    tab: "WELL",
    banner: [
      { text: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", color: "#5a1018" },
      { text: "  DEEP RED · SUBWAY STEAM · WARNING   ", color: "#ff6b6b" },
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
