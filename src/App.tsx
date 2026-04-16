import { useCallback, useEffect, useLayoutEffect, useState } from "react";
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

const TITLE_MENU_ORDER = MENU_ORDER.filter((id) => id !== "home");

const TITLE_BOOT_HOME = `SELF-CHECK ........................... OK
MEMORY MAP ........................... OK
CHAPTER SELECT ....................... [1][2][3][4]

Tip: number keys jump like an old game menu; mouse also works.`;

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

function TitleBootHome() {
  return (
    <pre className="title-screen__boot" aria-hidden="true">
      {TITLE_BOOT_HOME}
    </pre>
  );
}

function TitleScreen({ onPick }: { onPick: (id: MenuViewId) => void }) {
  const { system } = site;
  const boxW = 45;
  const row = (text: string) => {
    const t =
      text.length > boxW ? text.slice(0, boxW) : text.padEnd(boxW, " ");
    return `║${t}║`;
  };
  const mid = `  ${system.name}  //  ${system.host}  //  v${system.version}  `;
  return (
    <section className="title-screen title-screen--atlas" aria-labelledby="title-main">
      <pre className="title-screen__marquee" aria-hidden="true">
        {`╔${"═".repeat(18)}  TITLE  ${"═".repeat(18)}╗
${row(mid)}
╚${"═".repeat(boxW)}╝`}
      </pre>
      <h1 id="title-main" className="title-screen__name">
        {site.name}
      </h1>
      <p className="title-screen__role">{site.role}</p>
      <p className="title-screen__tag">{site.tagline}</p>
      <p className="title-screen__prompt" aria-hidden="true">
        ▶ 选择章节 — 键盘 1–4 或点击（切栏目会换背景氛围）
      </p>
      <nav className="title-menu title-menu--chapter" aria-label="开始菜单">
        {TITLE_MENU_ORDER.map((id, i) => (
          <button
            key={id}
            type="button"
            className="title-menu__btn"
            onClick={() => onPick(id)}
          >
            <span className="title-menu__idx">{i + 1}</span>
            <span className="title-menu__lbl">{MENU_DEF[id].tab}</span>
            <span className="title-menu__chev" aria-hidden="true">
              &gt;&gt;
            </span>
          </button>
        ))}
      </nav>
      <TitleBootHome />
    </section>
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

  useEffect(() => {
    if (menuView !== "home") return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) {
        return;
      }
      const n = Number.parseInt(e.key, 10);
      if (
        Number.isNaN(n) ||
        n < 1 ||
        n > TITLE_MENU_ORDER.length
      ) {
        return;
      }
      e.preventDefault();
      goMenu(TITLE_MENU_ORDER[n - 1]!);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuView, goMenu]);

  const atm = atmosphereForMenu(menuView);

  return (
    <div className="shell">
      <AsciiBackdrop atmosphere={atm} />
      <div className="shell-front">
      <nav className="nav nav--shell" aria-label="站点状态">
        <div className="nav__cloud-line">
          <span className="nav__cloud-badge">
            {menuView === "home" ? "[TITLE]" : `[${MENU_DEF[menuView].tab}]`}
          </span>
          <span className="nav__cloud-user">{site.name}</span>
          <span>@</span>
          <span className="nav__cloud-host">{system.host}</span>
          <span className="nav__cloud-tilde">:~$ </span>
          <span className="nav__cloud-hint">
            {menuView === "home"
              ? "title_screen — 选章节进入；意象在背景与装饰条"
              : "子页面 · 页脚可回标题画面"}
          </span>
        </div>
      </nav>

      {menuView !== "home" ? (
        <div className="atm-toolbar" role="tablist" aria-label="章节切换">
          <button
            type="button"
            className="atm-tab atm-tab--home"
            onClick={() => goMenu("home")}
          >
            « MAIN MENU
          </button>
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
      ) : null}

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
          {menuView === "home" ? null : <TermBanner atmosphere={atm} />}
          {menuView === "home" ? null : (
            <div className="window-horizon" aria-hidden="true" />
          )}

          <main id="top" className="menu-main">
            {menuView === "home" && <TitleScreen onPick={goMenu} />}

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
                      open ./projects
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
                « MAIN MENU / 标题画面
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
