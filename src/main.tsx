import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./themes.css";
import App from "./App";
import { ATMOSPHERE_STORAGE_KEY, isAtmosphereId } from "./themes";

try {
  const v = localStorage.getItem(ATMOSPHERE_STORAGE_KEY);
  if (v && isAtmosphereId(v)) {
    document.documentElement.dataset.atmosphere = v;
  }
} catch {
  /* private mode etc. */
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
