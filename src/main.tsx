import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system">
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
