import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./themes.css";
import App from "./App";
import { atmosphereForMenu, readInitialMenuView } from "./menu";

try {
  const m = readInitialMenuView();
  document.body.dataset.atmosphere = atmosphereForMenu(m);
  document.body.dataset.menuView = m;
} catch {
  /* private mode etc. */
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
