export type BlogPost = {
  slug: string;
  title: string;
  date?: string;
  bodyMd: string;
};

export function splitFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw.trim() };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([\w-]+)\s*:\s*(.+)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, body: m[2].trim() };
}

export function slugFromPath(path: string): string {
  const base = path.split("/").pop() ?? "post";
  return base.replace(/\.md$/i, "");
}
