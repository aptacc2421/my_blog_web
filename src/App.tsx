import { useCallback, useLayoutEffect, useState } from "react";
import "./App.css";
import { site } from "./site";
import {
  MENU_STORAGE_KEY,
  MENU_DEF,
  atmosphereForMenu,
  readInitialMenuView,
  type MenuViewId,
} from "./menu";
import { AsciiBackdrop } from "./AsciiBackdrop";
import { BlogPanel } from "./blog/BlogPanel";
import { ShellTerminal } from "./ShellTerminal";

function App() {
  const year = new Date().getFullYear();
  const { system, bootLog, sections, status } = site;
  const [menuView, setMenuView] = useState<MenuViewId>(readInitialMenuView);

  const goMenu = useCallback((id: MenuViewId) => {
    setMenuView(id);
    try {
      localStorage.setItem(MENU_STORAGE_KEY, id);
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      /* ignore */
    }
  }, []);

  useLayoutEffect(() => {
    document.body.dataset.atmosphere = atmosphereForMenu(menuView);
    document.body.dataset.menuView = menuView;
  }, [menuView]);

  const atm = atmosphereForMenu(menuView);

  return (
    <div className="shell">
      <AsciiBackdrop atmosphere={atm} />
      <div className="shell-front">
        <nav className="nav nav--shell" aria-label="站点状态">
          <div className="nav__cloud-line">
            <span className="nav__cloud-badge">
              {menuView === "home" ? "[~]" : `[${MENU_DEF[menuView].tab}]`}
            </span>
            <span className="nav__cloud-user">{site.name}</span>
            <span>@</span>
            <span className="nav__cloud-host">{system.host}</span>
            <span className="nav__cloud-tilde"> </span>
            <span className="nav__cloud-hint">
              主导航在底部 shell：ls / cd / cat / grep / find；意象仍在全屏背景
            </span>
          </div>
        </nav>

        <div className="frame" role="presentation">
          <div className="frame__body frame__body--shell">
            {menuView !== "home" && atm === "window" ? (
              <div className="window-horizon" aria-hidden="true" />
            ) : null}

            <div className="site-view">
              <main id="top" key={menuView} className="menu-main menu-main--ut-fade">
                {menuView === "home" && (
                  <section
                    className="menu-panel section section--solo home-shell-intro"
                    aria-labelledby="home-welcome"
                  >
                    <h2 id="home-welcome" className="section__title">
                      ~/
                    </h2>
                    <p className="prose">{site.tagline}</p>
                    <p className="prose">
                      输入 <code>ls</code> 查看目录，<code>cd about</code>{" "}
                      进入版面；<code>help</code> 列出全部命令。
                    </p>
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
                        ~/about
                      </h2>
                    </div>
                    <div className="about-hero card-pixel">
                      <p className="about-hero__seq">{sections.hero}</p>
                      <pre className="boot boot--compact" aria-label="启动日志">
                        {bootLog.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </pre>
                      <p className="about-hero__cmd">
                        <span className="about-hero__prompt">~ $</span>{" "}
                        <kbd>whoami</kbd>
                      </p>
                      <h3 className="about-hero__title">
                        你好，我是 <em>{site.name}</em>
                      </h3>
                      <p className="about-hero__role">{site.role}</p>
                      <p className="about-hero__lead">{site.tagline}</p>
                      <div className="about-hero__actions">
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
                          cd ../projects
                        </button>
                      </div>
                      <aside className="panel panel--about" aria-label="状态面板">
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
                        ~/projects
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
                        ~/contact
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
                    cd ~（回首页）
                  </button>
                </span>
              </footer>
            </div>

            <ShellTerminal menuView={menuView} goMenu={goMenu} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
