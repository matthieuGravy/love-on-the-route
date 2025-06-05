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
  // Validation du config principal
  if (!config || typeof config !== "object") {
    console.error(
      "[Love On The Route] loveOnTheRoute: Configuration object is required"
    );
    throw new Error("Configuration object is required");
  }

  if (!config.container) {
    console.error("[Love On The Route] loveOnTheRoute: Container is required");
    throw new Error("Container is required");
  }

  // Obtenir l'élément conteneur
  const container =
    typeof config.container === "string"
      ? (document.querySelector(config.container) as HTMLElement)
      : config.container;

  if (!container) {
    console.error(
      "[Love On The Route] loveOnTheRoute: Container not found",
      config.container
    );
    throw new Error(`Container not found: ${config.container}`);
  }

  // Créer le router
  const router = createRouter(container);

  // Vérifier que les pages sont fournies
  if (!config.pages) {
    console.error("[Love On The Route] loveOnTheRoute: Pages are required");
    throw new Error(
      "Pages are required. Use import.meta.glob('./pages/**/*.ts', { eager: true }) and pass the result to loveOnTheRoute({ pages: ... })"
    );
  }

  if (
    typeof config.pages !== "object" ||
    Object.keys(config.pages).length === 0
  ) {
    console.error(
      "[Love On The Route] loveOnTheRoute: Pages object is empty or invalid",
      config.pages
    );
    throw new Error("Pages object must contain at least one page component");
  }

  const routes = autoDiscoverPages(config.pages);

  // Configuration des routes avec SEO
  const routeConfigs = routes.map((route) => ({
    ...route,
    component: () => {
      try {
        // SEO automatique
        if (config.seoDefaults) {
          updateSEO({
            title: `${config.seoDefaults.siteName || ""} | ${
              route.title
            }`.trim(),
            url: window.location.href,
            type: config.seoDefaults.type || "website",
            image: config.seoDefaults.image,
            siteName: config.seoDefaults.siteName,
          });
        }

        const element = route.component();
        if (!element || !(element instanceof HTMLElement)) {
          console.error(
            "[Love On The Route] Component must return a valid HTMLElement",
            route.path
          );
          return document.createElement("div"); // Fallback
        }
        return element;
      } catch (error) {
        console.error(
          "[Love On The Route] Error in route component",
          route.path,
          error
        );
        const errorDiv = document.createElement("div");
        errorDiv.innerHTML = `<h1>Error loading page</h1><p>Route: ${route.path}</p>`;
        return errorDiv;
      }
    },
  }));

  // Générer les routes
  generateRoutes(router, routeConfigs);

  // Navigation automatique (optionnelle)
  let nav: LoveNav | undefined;
  if (config.generateNav) {
    try {
      const routesForNav = routes.map((r) => ({
        path: r.path,
        title: r.title,
      }));
      nav = new LoveNav(routesForNav, config.navOptions || {});

      // Insérer la navigation
      if (config.navOptions?.insertBefore) {
        const insertTarget =
          typeof config.navOptions.insertBefore === "string"
            ? document.querySelector(config.navOptions.insertBefore)
            : config.navOptions.insertBefore;

        if (insertTarget && insertTarget.parentNode) {
          insertTarget.parentNode.insertBefore(nav.render(), insertTarget);
        } else {
          console.warn(
            "[Love On The Route] insertBefore target not found, inserting before container instead"
          );
          if (container.parentNode) {
            container.parentNode.insertBefore(nav.render(), container);
          }
        }
      } else {
        // Par défaut, insérer avant le container
        if (container.parentNode) {
          container.parentNode.insertBefore(nav.render(), container);
        } else {
          console.warn(
            "[Love On The Route] Container has no parent, navigation cannot be inserted"
          );
        }
      }
    } catch (error) {
      console.error("[Love On The Route] Error creating navigation", error);
      nav = undefined;
    }
  }

  // Démarrer le router
  try {
    router.render();

    // Navigation initiale
    if (window.location.pathname === "/") {
      router.navigate("/");
    }
  } catch (error) {
    console.error(
      "[Love On The Route] Error during router initialization",
      error
    );
    throw error;
  }

  return {
    router,
    nav,
    updateSEO,
  };
}
