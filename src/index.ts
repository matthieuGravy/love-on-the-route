// Export de la fonction d'initialisation simple
export { loveOnTheRoute } from "./core/init";

// Export des utilitaires de routing
export { createRouter } from "./router";
export {
  generateRoutes,
  autoDiscoverPages,
  autoDiscoverMultilingualPages,
  autoDiscoverPagesIntelligent,
  autoDiscoverPagesFlexible,
} from "./utils/routeGenerator";

// Export de l'utilitaire SEO
export {
  updateSEO,
  resetSEO,
  detectCurrentLanguage,
  getCurrentLanguage,
  watchLanguageChanges,
  filterRoutesByCurrentLanguage,
} from "./utils/seo";

// Export de la navigation
export { LoveNav, LangSelector, type LogoConfig } from "./components";

// Export des types
export type { RouteConfig } from "./utils/routeGenerator";
