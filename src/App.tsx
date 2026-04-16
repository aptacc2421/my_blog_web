import "./App.css";
import { site } from "./site";

const ASCII_DRAGON =
  "                         ██████                        \n" +
  "                 ████░░░░░░░░░░████                    \n" +
  "             ████░░░░░░░░░░░░░░░░░░████                \n" +
  "           ██░░░░░░░░░░░░░░░░░░░░░░░░░░██              \n" +
  "         ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██            \n" +
  "       ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██          \n" +
  "       ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██        \n" +
  "     ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██      \n" +
  "     ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██      \n" +
  "     ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██      \n" +
  "       ████████████████████████████████████████        ";

function App() {
  const year = new Date().getFullYear();
  const { system, bootLog, sections, status } = site;

  return (
    <div className="shell">
      <nav className="nav" aria-label="主导航">
        <div className="nav__prompt">
          <span className="user">{site.name}</span>
          <span>@</span>
          <span className="path">{system.host}</span>
          <span>:~$ </span>
          <span style={{ color: "var(--text-muted)" }}># ./enter_site</span>
        </div>
        <div className="nav__links">
          <a href="#about">./about</a>
          <a href="#projects">./quests</a>
          <a href="#contact">./contact</a>
        </div>
      </nav>

      <div className="frame" role="presentation">
        <div className="frame__bar">
          <span>
            <strong>{system.name}</strong> // v{system.version} //{" "}
            <span style={{ color: "var(--blood)" }}>secure</span>
          </span>
          <span className="frame__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className="frame__body">
          <pre className="ascii" aria-hidden="true">
            {ASCII_DRAGON}
          </pre>

          <main id="top">
            <section className="hero" aria-labelledby="hero-title">
              <div>
                <p className="hero__seq">{sections.hero}</p>
                <pre className="boot" aria-label="系统启动日志">
                  {bootLog.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </pre>
                <p className="hero__cmd">
                  <span style={{ color: "var(--text-muted)" }}>~ $</span>{" "}
                  <kbd>whoami</kbd>
                </p>
                <h1 id="hero-title" className="hero__title">
                  输出：<em>{site.name}</em>
                </h1>
                <p className="hero__role">{site.role}</p>
                <p className="hero__lead">{site.tagline}</p>
                <div className="hero__actions">
                  <a className="btn btn--primary" href={`mailto:${site.email}`}>
                    mail -s hi
                  </a>
                  <a className="btn" href="#projects">
                    ls ./quests
                  </a>
                </div>
              </div>

              <aside className="panel" aria-label="状态面板">
                <div className="panel__head">
                  <span>
                    STATUS // <strong>LIVE</strong>
                  </span>
                  <span>{site.location}</span>
                </div>
                <div className="panel__grid">
                  {status.map((s) => (
                    <div key={s.label} className="panel__cell">
                      <div className="panel__label">{s.label}</div>
                      <div className="panel__value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </aside>
            </section>

            <section id="about" className="section" aria-labelledby="about-title">
              <div className="section__head">
                <p className="section__tag">{sections.about}</p>
                <h2 id="about-title" className="section__title">
                  $ cat ./profile.txt
                </h2>
                <p className="section__hint">
                  // 改文案：src/site.ts · 版式：src/App.css
                </p>
              </div>
              <div className="grid-2">
                <div className="prose">
                  <p>{site.about}</p>
                  <p>
                    栈：<code>Vite</code> + <code>React</code> +{" "}
                    <code>TypeScript</code>。像旧游戏读档一样，刷新就能回到这条时间线。
                  </p>
                </div>
                <div>
                  <p className="skills-label">{sections.skills}</p>
                  <div className="tag-row" role="list">
                    {site.skills.map((s) => (
                      <span key={s} className="tag" role="listitem">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              id="projects"
              className="section"
              aria-labelledby="projects-title"
            >
              <div className="section__head">
                <p className="section__tag">{sections.projects}</p>
                <h2 id="projects-title" className="section__title">
                  $ ls -l ./quests
                </h2>
                <p className="section__hint">// 每项 href 指向真实链接</p>
              </div>
              <div className="projects">
                {site.projects.map((p) => (
                  <article key={p.title} className="project">
                    <h3 className="project__title">{p.title}</h3>
                    <p className="project__desc">{p.desc}</p>
                    <div className="project__tags">
                      {p.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a className="project__link" href={p.href}>
                      RUN ./open →
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="contact"
              className="section"
              aria-labelledby="contact-title"
            >
              <div className="section__head">
                <p className="section__tag">{sections.contact}</p>
                <h2 id="contact-title" className="section__title">
                  $ nc -zv fate 443
                </h2>
                <p className="section__hint">// 悬停外链可看到伪命令（title）</p>
              </div>
              <div className="contact">
                <div className="contact__text">
                  <h3>握手包已就绪</h3>
                  <p>发邮件，或在另一个窗口里敲你的命令。我会读日志。</p>
                </div>
                <div className="contact__actions">
                  <a className="btn btn--primary" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  {site.links.map((l) => (
                    <a
                      key={l.href + l.label}
                      className="btn"
                      href={l.href}
                      title={l.cmd}
                      rel="noreferrer"
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <footer className="footer">
            <span>
              [EOF] © {year} {site.name} · {system.name}
            </span>
            <span>
              <a href="#top">jmp TOP</a>
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
