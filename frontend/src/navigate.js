import { markProgrammaticNavigation } from "./router.js";

/**
 * Navigate by updating the hash. Sets a guard flag so the router
 * doesn't re-dispatch when the hashchange is caused by a load function
 * that's already running.
 */
export function navigate(path) {
  const target = `#${path}`;
  if (window.location.hash !== target) {
    markProgrammaticNavigation();
    window.location.hash = path;
  }
}
