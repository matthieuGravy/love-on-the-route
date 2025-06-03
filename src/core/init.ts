import { createRouter } from "../router/Router";
import { autoDiscoverPages, generateRoutes } from "../utils/routeGenerator";
import { LoveNav } from "../components/LoveNav";
import { updateSEO } from "../utils/seo";

interface LoveOnTheRouteConfig {
  container: string | HTMLElement;
  generateNav?: boolean;
  navOptions?: {
    tagName?: string;
    linkClass?: string;
    activeClass?: string;
    containerClass?: string;
    insertBefore?: string | HTMLElement;
  };
  seoDefaults?: {
    siteName?: string;
    image?: string;
    type?: string;
  };
  pages?: Record<string, { default: () => HTMLElement }>;
}

interface LoveOnTheRouteInstance {
  router: ReturnType<typeof createRouter>;
  nav?: LoveNav;
  updateSEO: typeof updateSEO;
}

export function loveOnTheRoute(
  config: LoveOnTheRouteConfig
): LoveOnTheRouteInstance {
  // Obtenir l'élément conteneur
  const container =
    typeof config.container === "string"
      ? (document.querySelector(config.container) as HTMLElement)
      : config.container;

  if (!container) {
    throw new Error(`Container not found: ${config.container}`);
  }

  // Créer le router
  const router = createRouter(container);

  // Vérifier que les pages sont fournies
  if (!config.pages) {
    throw new Error(
      "Pages are required. Use import.meta.glob('./pages/**/*.ts', { eager: true }) and pass the result to loveOnTheRoute({ pages: ... })"
    );
  }

  const routes = autoDiscoverPages(config.pages);

  // Configuration des routes avec SEO
  const routeConfigs = routes.map((route) => ({
    ...route,
    component: () => {
      // SEO automatique
      if (config.seoDefaults) {
        updateSEO({
          title: `${config.seoDefaults.siteName || ""} | ${route.title}`.trim(),
          url: window.location.href,
          type: config.seoDefaults.type || "website",
          image: config.seoDefaults.image,
          siteName: config.seoDefaults.siteName,
        });
      }

      return route.component();
    },
  }));

  // Générer les routes
  generateRoutes(router, routeConfigs);

  // Navigation automatique (optionnelle)
  let nav: LoveNav | undefined;
  if (config.generateNav) {
    const routesForNav = routes.map((r) => ({ path: r.path, title: r.title }));
    nav = new LoveNav(routesForNav, config.navOptions || {});

    // Insérer la navigation
    if (config.navOptions?.insertBefore) {
      const insertTarget =
        typeof config.navOptions.insertBefore === "string"
          ? document.querySelector(config.navOptions.insertBefore)
          : config.navOptions.insertBefore;

      if (insertTarget && insertTarget.parentNode) {
        insertTarget.parentNode.insertBefore(nav.render(), insertTarget);
      }
    } else {
      // Par défaut, insérer avant le container
      if (container.parentNode) {
        container.parentNode.insertBefore(nav.render(), container);
      }
    }
  }

  // Démarrer le router
  router.render();

  // Navigation initiale
  if (window.location.pathname === "/") {
    router.navigate("/");
  }

  return {
    router,
    nav,
    updateSEO,
  };
}
