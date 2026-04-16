import { ASCII_SCENES } from "./asciiScenes";
import type { AtmosphereId } from "./themes";

type Props = { atmosphere: AtmosphereId };

export function AsciiBackdrop({ atmosphere }: Props) {
  const lines = ASCII_SCENES[atmosphere];
  if (!lines?.length) return null;

  return (
    <div className="ascii-backdrop" aria-hidden="true">
      <pre className="ascii-backdrop__pre">
        {lines.map((row, i) => (
          <span key={i} className="ascii-backdrop__row">
            {row.map((s, j) => (
              <span key={j} style={{ color: s.c }}>
                {s.t}
              </span>
            ))}
          </span>
        ))}
      </pre>
    </div>
  );
}
