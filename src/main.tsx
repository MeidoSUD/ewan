import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from './contexts/LanguageContext';

// Suppress noisy 'Failed to fetch' errors coming from 3rd-party scripts (e.g. FullStory) or dev tooling (Vite HMR ping)
// while still allowing normal fetch behavior and proper error handling in application code.
if (typeof window !== 'undefined') {
  const origFetch = window.fetch.bind(window);
  window.fetch = (...args: Parameters<typeof fetch>) =>
    origFetch(...args).catch((err) => {
      if (err instanceof Error && /Failed to fetch/i.test(String(err.message))) {
        // Log for debugging but avoid unhandledrejection noise in the console
        console.debug('[fetch] suppressed error:', err);
        throw err;
      }
      throw err;
    });

  window.addEventListener('unhandledrejection', (ev) => {
    const reason: any = ev.reason;
    const msg = (reason && reason.message) || String(reason || '');
    const stack = (reason && reason.stack) || '';

    // If this looks like the benign 'Failed to fetch' coming from dev tooling or FullStory, prevent default logging.
    if (/Failed to fetch/i.test(msg) || /fullstory/i.test(stack) || /vite/i.test(stack)) {
      ev.preventDefault();
      console.debug('[unhandledrejection] suppressed:', reason);
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
