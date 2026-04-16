/** 轻量 Markdown → HTML（无依赖）。需要表格等可再接入 marked。 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMd(s: string): string {
  return escapeHtml(s).replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>",
  );
}

export function basicMarkdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const blocks: string[] = [];
  let buf: string[] = [];

  const flushPara = () => {
    if (!buf.length) return;
    const text = buf.join(" ").trim();
    if (text) blocks.push(`<p>${inlineMd(text)}</p>`);
    buf = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.trim() === "") {
      flushPara();
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      blocks.push(`<h3>${inlineMd(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      blocks.push(`<h2>${inlineMd(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      flushPara();
      blocks.push(`<h1>${inlineMd(line.slice(2))}</h1>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      blocks.push(`<p>• ${inlineMd(line.replace(/^[-*]\s+/, ""))}</p>`);
      continue;
    }
    buf.push(line.trim());
  }
  flushPara();
  return blocks.join("\n");
}
