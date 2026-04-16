import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadBlogPosts } from "./blog/posts";
import type { MenuViewId } from "./menu";
import { site } from "./site";
import { runShellLine, shellPathForView } from "./shellExec";

function initialMotd(): string[] {
  return [
    `${site.name} — ${site.role}`,
    `逻辑路径与上方内容区同步；除链接/按钮/输入框外，点击任意处可聚焦命令行。`,
    `输入 help 查看 ls / cd / cat / grep / find。`,
    "",
  ];
}

type Props = {
  menuView: MenuViewId;
  goMenu: (id: MenuViewId) => void;
};

export function ShellTerminal({ menuView, goMenu }: Props) {
  const posts = useMemo(() => loadBlogPosts(), []);
  const [lines, setLines] = useState<string[]>(() => initialMotd());
  const [input, setInput] = useState("");
  const outRef = useRef<HTMLPreElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = useCallback(
    () =>
      `${site.name}@${site.system.host}:${shellPathForView(menuView)}$ `,
    [menuView],
  );

  useEffect(() => {
    const el = outRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const interactive =
      "a, button, input, textarea, select, summary, option, label, [contenteditable=\"true\"], [role=\"button\"], [role=\"tab\"]";

    const onWindowClick = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(interactive)) return;
      inputRef.current?.focus({ preventScroll: true });
    };

    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;
      setLines((prev) => [...prev, `${prompt()}${cmd}`]);
      const { lines: out, next, clear } = runShellLine(cmd, menuView, posts);
      if (clear) {
        setLines(initialMotd());
        return;
      }
      if (out.length) setLines((prev) => [...prev, ...out]);
      if (next !== undefined) goMenu(next);
    },
    [goMenu, menuView, posts, prompt],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const v = input;
      setInput("");
      run(v);
    },
    [input, run],
  );

  return (
    <div className="site-shell" aria-label="站点 shell">
      <pre
        ref={outRef}
        className="site-shell__output"
        aria-live="polite"
        aria-relevant="additions"
      >
        {lines.map((line, i) => (
          <span key={i} className="site-shell__line">
            {line}
            {"\n"}
          </span>
        ))}
      </pre>
      <form className="site-shell__form" onSubmit={onSubmit} aria-label="Shell">
        <span className="site-shell__prompt" aria-hidden="true">
          {prompt()}
        </span>
        <input
          ref={inputRef}
          id="site-shell-input"
          className="site-shell__input"
          type="text"
          autoComplete="off"
          spellCheck={false}
          aria-label="命令行"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ls · cd about · help"
        />
      </form>
      <p className="site-shell__hint" aria-hidden="true">
        点击页面（非链接/按钮）聚焦此处 · help / ls / cd ~ / pwd / cat README / grep
        / find .
      </p>
    </div>
  );
}
