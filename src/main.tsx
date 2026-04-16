import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./themes.css";
import App from "./App";
import {
  MENU_STORAGE_KEY,
  atmosphereForMenu,
  isMenuViewId,
} from "./menu";

try {
  const m = localStorage.getItem(MENU_STORAGE_KEY);
  if (m && isMenuViewId(m)) {
    document.body.dataset.atmosphere = atmosphereForMenu(m);
  }
} catch {
  /* private mode etc. */
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
