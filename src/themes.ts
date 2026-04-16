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
    tab: "LAWN",
    banner: [
      { text: "╔══════════════════════════════════════╗", color: "#558b2f" },
      { text: "║   BACKYARD · SUNNY · SEEDS READY     ║", color: "#fff8e1" },
      { text: "╚══════════════════════════════════════╝", color: "#33691e" },
    ],
  },
  storm: {
    tab: "RAIN",
    banner: [
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "#5c6b7a" },
      { text: "  DRIZZLE DAY · PUDDLES · WARM COAT   ", color: "#eceff1" },
      { text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "#455a64" },
    ],
  },
  midsummer: {
    tab: "HEAT",
    banner: [
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", color: "#ff9800" },
      { text: "  LONG AFTERNOON · ICE TEA · SHADE    ", color: "#fff3e0" },
      { text: "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈", color: "#f57c00" },
    ],
  },
  redwell: {
    tab: "NIGHT",
    banner: [
      { text: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", color: "#5d4037" },
      { text: "  PORCH LIGHT · CRICKETS · QUIET ROAD ", color: "#ffccbc" },
      { text: "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░", color: "#3e2723" },
    ],
  },
  window: {
    tab: "ROOM",
    banner: [
      { text: "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", color: "#cfd8dc" },
      { text: "  WINDOW SEAT · STREET LAMPS BELOW    ", color: "#e3f2fd" },
      { text: "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔", color: "#b0bec5" },
    ],
  },
};

export function isAtmosphereId(s: string): s is AtmosphereId {
  return (ATMOSPHERE_ORDER as readonly string[]).includes(s);
}

export function getAtmosphereDef(id: AtmosphereId): AtmosphereDef {
  return ATMOSPHERE_DEF[id];
}
