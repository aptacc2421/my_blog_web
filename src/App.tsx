import { useLayoutEffect, useState } from "react";
import "./App.css";
import { site } from "./site";
import {
  MENU_ORDER,
  MENU_STORAGE_KEY,
  MENU_DEF,
  atmosphereForMenu,
  isMenuViewId,
  type MenuViewId,
} from "./menu";
import { AsciiBackdrop } from "./AsciiBackdrop";
import { BlogPanel } from "./blog/BlogPanel";
import { getAtmosphereDef, type AtmosphereId } from "./themes";

function TermBanner({ atmosphere }: { atmosphere: AtmosphereId }) {
  const { banner } = getAtmosphereDef(atmosphere);
  return (
    <pre className="term-banner" aria-hidden="true">
      {banner.map((line, i) => (
        <span
          key={i}
          className="term-banner__line"
          style={{ color: line.color }}
        >
          {line.text}
        </span>
      ))}
    </pre>
  );
}

function readMenuView(): MenuViewId {
  if (typeof window === "undefined") return "home";
  const h = window.location.hash.replace(/^#/, "");
  if (h && isMenuViewId(h)) return h;
  try {
    const m = localStorage.getItem(MENU_STORAGE_KEY);
    if (m && isMenuViewId(m)) return m;
  } catch {
    /* ignore */
  }
  return "home";
}

function App() {
  const year = new Date().getFullYear();
  const { system, bootLog, sections, status } = site;
  const [menuView, setMenuView] = useState<MenuViewId>(readMenuView);

  const goMenu = (id: MenuViewId) => {
    setMenuView(id);
    try {
      localStorage.setItem(MENU_STORAGE_KEY, id);
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      /* ignore */
    }
  };

  useLayoutEffect(() => {
    document.body.dataset.atmosphere = atmosphereForMenu(menuView);
  }, [menuView]);

  const atm = atmosphereForMenu(menuView);

  return (
    <div className="shell">
      <AsciiBackdrop atmosphere={atm} />
      <div className="shell-front">
      <nav className="nav" aria-label="站点与终端提示">
        <div className="nav__prompt">
          <span className="user">{site.name}</span>
          <span>@</span>
          <span className="path">{system.host}</span>
          <span>:~$ </span>
          <span className="nav__hint">main_menu</span>
        </div>
      </nav>

      <div className="atm-toolbar" role="tablist" aria-label="主菜单">
        <span className="atm-toolbar__prompt" aria-hidden="true">
          $ menu --select
        </span>
        <div className="atm-toolbar__tabs">
          {MENU_ORDER.map((id) => (
            <button
              type="button"
              key={id}
              role="tab"
              aria-selected={menuView === id}
              className={
                menuView === id ? "atm-tab atm-tab--active" : "atm-tab"
              }
              onClick={() => goMenu(id)}
            >
              [{MENU_DEF[id].tab}]
            </button>
          ))}
        </div>
      </div>

      <div className="frame" role="presentation">
        <div className="frame__bar">
          <span className="frame__bar-left">
            <strong>{system.name}</strong> // v{system.version} //{" "}
            <span className="frame__ok">ok</span>
          </span>
          <span className="frame__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className="frame__body">
          <TermBanner atmosphere={atm} />
          <div className="window-horizon" aria-hidden="true" />

          <main id="top" className="menu-main">
            {menuView === "home" && (
              <section
                className="menu-panel"
                aria-labelledby="hero-title"
              >
                <div className="hero hero--solo">
                  <div>
                    <p className="hero__seq">{sections.hero}</p>
                    <pre className="boot" aria-label="启动日志">
                      {bootLog.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </pre>
                    <p className="hero__cmd">
                      <span className="hero__prompt">~ $</span>{" "}
                      <kbd>whoami</kbd>
                    </p>
                    <h1 id="hero-title" className="hero__title">
                      你好，我是 <em>{site.name}</em>
                    </h1>
                    <p className="hero__role">{site.role}</p>
                    <p className="hero__lead">{site.tagline}</p>
                    <div className="hero__actions">
                      <a
                        className="btn btn--primary"
                        href={`mailto:${site.email}`}
                      >
                        mail -s contact
                      </a>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => goMenu("projects")}
                      >
                        open ./projects
                      </button>
                    </div>
                  </div>

                  <aside className="panel" aria-label="状态面板">
                    <div className="panel__head">
                      <span>
                        STATUS // <strong>OK</strong>
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
                </div>
              </section>
            )}

            {menuView === "about" && (
              <section
                id="about"
                className="menu-panel section section--solo"
                aria-labelledby="about-title"
              >
                <div className="section__head">
                  <p className="section__tag">{sections.about}</p>
                  <h2 id="about-title" className="section__title">
                    $ cat ./about.md
                  </h2>
                </div>
                <div className="grid-2">
                  <div className="prose">
                    <p>{site.about}</p>
                    <p>
                      本站使用 <code>Vite</code>、<code>React</code> 与{" "}
                      <code>TypeScript</code>{" "}
                      构建；修改个人介绍请编辑 <code>src/site.ts</code>。
                    </p>
                  </div>
                  <div>
                    <p className="atmo-tag">{sections.skills}</p>
                    <p className="skills-heading">技能</p>
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
            )}

            {menuView === "projects" && (
              <section
                id="projects"
                className="menu-panel section section--solo"
                aria-labelledby="projects-title"
              >
                <div className="section__head">
                  <p className="section__tag">{sections.projects}</p>
                  <h2 id="projects-title" className="section__title">
                    $ ls -1 ./projects
                  </h2>
                  <p className="section__hint">
                    链接指向仓库或线上演示即可。
                  </p>
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
                        查看详情 →
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {menuView === "blog" && <BlogPanel />}

            {menuView === "contact" && (
              <section
                id="contact"
                className="menu-panel section section--solo"
                aria-labelledby="contact-title"
              >
                <div className="section__head">
                  <p className="section__tag">{sections.contact}</p>
                  <h2 id="contact-title" className="section__title">
                    $ mail -a contact
                  </h2>
                  <p className="section__hint">
                    外链按钮悬停可看等价命令（title）。
                  </p>
                </div>
                <div className="contact">
                  <div className="contact__text">
                    <h3>{site.contactTitle}</h3>
                    <p>{site.contactLead}</p>
                  </div>
                  <div className="contact__actions">
                    <a
                      className="btn btn--primary"
                      href={`mailto:${site.email}`}
                    >
                      {site.email}
                    </a>
                    {site.links.map((l) => (
                      <a
                        key={l.href + l.label}
                        className="btn"
                        href={l.href}
                        title={l.cmd}
                        rel="noreferrer"
                        target={
                          l.href.startsWith("http") ? "_blank" : undefined
                        }
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>

          <footer className="footer">
            <span>
              © {year} {site.name} · {system.name}
            </span>
            <span>
              <button
                type="button"
                className="footer__btn"
                onClick={() => goMenu("home")}
              >
                返回主页菜单
              </button>
            </span>
          </footer>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
