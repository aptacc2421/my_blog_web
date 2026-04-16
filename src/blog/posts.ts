import { slugFromPath, splitFrontmatter, type BlogPost } from "./parsePost";

const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

/** 构建时收集 src/content/blog 下所有 .md */
export function loadBlogPosts(): BlogPost[] {
  const out: BlogPost[] = [];
  for (const [path, raw] of Object.entries(modules)) {
    const { meta, body } = splitFrontmatter(raw);
    const slug = slugFromPath(path);
    out.push({
      slug,
      title: meta.title ?? slug,
      date: meta.date,
      bodyMd: body,
    });
  }
  return out.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
