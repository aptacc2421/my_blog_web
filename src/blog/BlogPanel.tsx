import { useMemo, useState } from "react";
import { loadBlogPosts } from "./posts";
import { basicMarkdownToHtml } from "./mdHtml";

export function BlogPanel() {
  const posts = useMemo(() => loadBlogPosts(), []);
  const [slug, setSlug] = useState<string | null>(null);

  const active = slug ? posts.find((p) => p.slug === slug) : null;
  const html = useMemo(
    () => (active ? basicMarkdownToHtml(active.bodyMd) : ""),
    [active],
  );

  return (
    <section
      className="menu-panel section section--solo blog"
      aria-labelledby="blog-title"
    >
      <div className="section__head">
        <p className="section__tag">博客</p>
        <h2 id="blog-title" className="section__title">
          ~/blog
        </h2>
        <p className="section__hint">
          在 <code>src/content/blog/</code> 添加 <code>.md</code>（顶部{" "}
          <code>---</code> 里写 <code>title</code> / <code>date</code>
          ），保存后 dev 热更新 / build 后上线。
        </p>
      </div>

      <div className="blog-layout">
        <nav className="blog-index" aria-label="文章列表">
          {posts.length === 0 ? (
            <p className="blog-empty">暂无文章。</p>
          ) : (
            <ul className="blog-list">
              {posts.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    className={
                      slug === p.slug ? "blog-list__btn blog-list__btn--on" : "blog-list__btn"
                    }
                    onClick={() => setSlug(p.slug)}
                  >
                    {p.title}
                    {p.date ? (
                      <span className="blog-list__date"> · {p.date}</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <article className="blog-article prose" aria-live="polite">
          {!active ? (
            <p className="blog-placeholder">左侧选择一篇文章。</p>
          ) : (
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </article>
      </div>
    </section>
  );
}
