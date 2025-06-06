import { Router } from "../router/Router";

export interface RouteConfig {
  path: string;
  component: () => HTMLElement;
  title: string;
  language?: string;
  children?: RouteConfig[];
}

export function generateRoutes(
  router: Router,
  configs: RouteConfig[],
  parentPath: string = ""
): void {
  // Validation des paramètres
  if (!router) {
    console.error(
      "[Love On The Route] generateRoutes: Router instance is required"
    );
    return;
  }

  if (!configs || !Array.isArray(configs)) {
    console.error(
      "[Love On The Route] generateRoutes: Valid route configs array is required"
    );
    return;
  }

  if (configs.length === 0) {
    console.warn("[Love On The Route] generateRoutes: No routes provided");
    return;
  }

  configs.forEach((config) => {
    // Validation de chaque config
    if (!config || typeof config !== "object") {
      console.error(
        "[Love On The Route] generateRoutes: Invalid route config",
        config
      );
      return;
    }

    if (!config.path || typeof config.path !== "string") {
      console.error(
        "[Love On The Route] generateRoutes: Route config must have a valid path",
        config
      );
      return;
    }

    if (!config.component || typeof config.component !== "function") {
      console.error(
        "[Love On The Route] generateRoutes: Route config must have a valid component function",
        config
      );
      return;
    }

    const fullPath = parentPath + config.path;
    router.addRoute(
      fullPath,
      () => {
        try {
          const element = config.component();
          if (!element || !(element instanceof HTMLElement)) {
            console.error(
              "[Love On The Route] Component must return a valid HTMLElement",
              config.path
            );
            return;
          }

          // Obtenir l'élément de contenu du router et y ajouter l'élément
          const contentElement = document.getElementById("content");
          if (contentElement) {
            contentElement.appendChild(element);
          } else {
            console.error(
              "[Love On The Route] Content element '#content' not found in DOM"
            );
          }
        } catch (error) {
          console.error(
            "[Love On The Route] Error executing component for route",
            config.path,
            error
          );
        }
      },
      config.title,
      parentPath || undefined
    );

    if (config.children) {
      generateRoutes(router, config.children, fullPath);
    }
  });

  // Configuration automatique du multilingue si détecté
  autoConfigureMultilingual(router, configs);
}

// Helper pour configurer automatiquement le multilingue
function autoConfigureMultilingual(
  router: Router,
  configs: RouteConfig[]
): void {
  try {
    // Détecter les langues présentes dans les routes
    const languagesFound = new Set<string>();

    configs.forEach((config) => {
      if (config.language) {
        languagesFound.add(config.language);
      }
      // Ou détecter depuis le chemin comme /en, /fr, /en/, /fr/
      const langMatch = config.path.match(/^\/([a-z]{2})(?:\/|$)/);
      if (langMatch) {
        languagesFound.add(langMatch[1]);
      }
    });

    // Si on a détecté des langues, configurer le router
    if (languagesFound.size > 0) {
      const supportedLanguages = Array.from(languagesFound).sort();
      const defaultLanguage = supportedLanguages[0];

      // Configuration du router pour le multilingue
      if (typeof (router as any).setMultilingualConfig === "function") {
        (router as any).setMultilingualConfig(
          supportedLanguages,
          defaultLanguage
        );
      }
    }
  } catch (error) {
    console.error(
      "[Love On The Route] Error auto-configuring multilingual mode",
      error
    );
  }
}

export function autoDiscoverPages(
  components: Record<string, { default: () => HTMLElement }>
): RouteConfig[] {
  // Validation des paramètres
  if (!components || typeof components !== "object") {
    console.error(
      "[Love On The Route] autoDiscoverPages: Components object is required"
    );
    return [];
  }

  if (Object.keys(components).length === 0) {
    console.warn("[Love On The Route] autoDiscoverPages: No components found");
    return [];
  }

  // Liste des fichiers à ignorer
  const ignoredFiles = ["index.ts", "PanicHeader.ts"];

  const routes = Object.entries(components)
    .filter(([path]) => {
      // Ignorer les fichiers de la liste
      const fileName = path.split("/").pop() || "";
      return !ignoredFiles.includes(fileName);
    })
    .map(([path, component]) => {
      // Extraire le nom du composant du chemin
      const pathParts = path.split("/");
      const fileName = pathParts.pop()?.replace(".ts", "") || "";
      const folderName = pathParts[pathParts.length - 1];

      // Utiliser le nom du dossier comme chemin si le fichier est dans un sous-dossier
      let routePath;
      if (fileName.toLowerCase() === "home") {
        routePath = "/";
      } else {
        routePath =
          folderName && folderName !== "pages"
            ? `/${folderName.toLowerCase()}`
            : `/${fileName.toLowerCase()}`;
      }

      return {
        path: routePath,
        component: component.default,
        title: fileName.replace(/([A-Z])/g, " $1").trim(),
      };
    });

  // Trier les routes : Home en premier, puis par ordre alphabétique
  return routes.sort((a, b) => {
    // Home toujours en premier
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;

    // Ensuite par ordre alphabétique du titre
    return a.title.localeCompare(b.title);
  });
}

export function autoDiscoverMultilingualPages(
  components: Record<string, { default: () => HTMLElement }>,
  supportedLanguages: string[] = ["en", "fr"]
): { routes: RouteConfig[]; languages: string[] } {
  // Liste des fichiers à ignorer
  const ignoredFiles = ["index.ts", "PanicHeader.ts"];
  const detectedLanguages = new Set<string>();

  const routes = Object.entries(components)
    .filter(([path]) => {
      // Ignorer les fichiers de la liste
      const fileName = path.split("/").pop() || "";
      return !ignoredFiles.includes(fileName);
    })
    .map(([path, component]) => {
      // Extraire les parties du chemin : ./pages/en/Home.ts
      const pathParts = path.split("/");
      const fileName = pathParts.pop()?.replace(".ts", "") || "";

      // Chercher la langue dans les parties du chemin
      let language: string | null = null;
      let folderStructure: string[] = [];

      for (let i = pathParts.length - 1; i >= 0; i--) {
        const part = pathParts[i];
        if (supportedLanguages.includes(part)) {
          language = part;
          // Tout ce qui vient après la langue fait partie de la structure
          folderStructure = pathParts.slice(i + 1);
          break;
        }
      }

      // Si pas de langue trouvée, utiliser la première langue par défaut
      if (!language) {
        language = supportedLanguages[0];
      }

      detectedLanguages.add(language);

      // Construire le chemin de route
      let routePath;
      if (fileName.toLowerCase() === "home") {
        // Page d'accueil : /en, /fr, etc.
        routePath = `/${language}`;
      } else {
        // Autres pages : /en/about, /fr/about, etc.
        const pagePath =
          folderStructure.length > 0
            ? folderStructure.join("/").toLowerCase()
            : fileName.toLowerCase();
        routePath = `/${language}/${pagePath}`;
      }

      return {
        path: routePath,
        component: component.default,
        title: fileName.replace(/([A-Z])/g, " $1").trim(),
        language: language as string,
      };
    });

  // Trier les routes : par langue d'abord, puis Home en premier pour chaque langue
  const sortedRoutes = routes.sort((a, b) => {
    // Trier par langue d'abord
    if (a.language !== b.language) {
      return a.language!.localeCompare(b.language!);
    }

    // Dans la même langue : Home en premier (les routes qui finissent exactement par /langue)
    const aIsHome = a.path === `/${a.language}`;
    const bIsHome = b.path === `/${b.language}`;

    if (aIsHome && !bIsHome) return -1;
    if (!aIsHome && bIsHome) return 1;

    // Ensuite par ordre alphabétique du titre
    return a.title.localeCompare(b.title);
  });

  return {
    routes: sortedRoutes,
    languages: Array.from(detectedLanguages).sort(),
  };
}

export function autoDiscoverPagesIntelligent(
  components: Record<string, { default: () => HTMLElement }>,
  supportedLanguages: string[] = ["en", "fr"]
): { routes: RouteConfig[]; languages?: string[]; isMultilingual: boolean } {
  // Analyser la structure pour détecter si c'est multilingue
  const paths = Object.keys(components);
  const hasLanguageFolders = paths.some((path) => {
    const parts = path.split("/");
    return parts.some((part) => supportedLanguages.includes(part));
  });

  if (hasLanguageFolders) {
    // Mode multilingue détecté
    const { routes, languages } = autoDiscoverMultilingualPages(
      components,
      supportedLanguages
    );
    return { routes, languages, isMultilingual: true };
  } else {
    // Mode classique détecté
    const routes = autoDiscoverPages(components);
    return { routes, isMultilingual: false };
  }
}

export function autoDiscoverPagesFlexible(
  components: Record<string, { default: () => HTMLElement }>,
  options: {
    homeNames?: string[]; // Noms de fichiers qui deviennent la route "/"
    supportedLanguages?: string[];
  } = {}
): { routes: RouteConfig[]; languages?: string[]; isMultilingual: boolean } {
  const {
    homeNames = ["home", "index", "accueil", "main"],
    supportedLanguages = ["en", "fr"],
  } = options;

  // Analyser la structure pour détecter si c'est multilingue
  const paths = Object.keys(components);
  const hasLanguageFolders = paths.some((path) => {
    const parts = path.split("/");
    return parts.some((part) => supportedLanguages.includes(part));
  });

  if (hasLanguageFolders) {
    // Mode multilingue détecté
    const detectedLanguages = new Set<string>();
    const routes = Object.entries(components).map(([path, component]) => {
      const pathParts = path.split("/");
      const fileName = pathParts.pop()?.replace(".ts", "") || "";

      // Chercher la langue dans les parties du chemin
      let language: string | null = null;
      let folderStructure: string[] = [];

      for (let i = pathParts.length - 1; i >= 0; i--) {
        const part = pathParts[i];
        if (supportedLanguages.includes(part)) {
          language = part;
          folderStructure = pathParts.slice(i + 1);
          break;
        }
      }

      if (!language) {
        language = supportedLanguages[0];
      }

      detectedLanguages.add(language);

      // Construire le chemin de route (plus flexible)
      let routePath;
      if (
        homeNames.some((name) => fileName.toLowerCase() === name.toLowerCase())
      ) {
        // Pages d'accueil : /en, /fr, etc.
        routePath = `/${language}`;
      } else {
        // Autres pages : /en/about, /fr/about, etc.
        const pagePath =
          folderStructure.length > 0
            ? folderStructure.join("/").toLowerCase()
            : fileName.toLowerCase();
        routePath = `/${language}/${pagePath}`;
      }

      return {
        path: routePath,
        component: component.default,
        title: fileName.replace(/([A-Z])/g, " $1").trim(),
        language: language as string,
      };
    });

    return {
      routes: routes.sort((a, b) => {
        if (a.language !== b.language) {
          return a.language!.localeCompare(b.language!);
        }
        const aIsHome = a.path === `/${a.language}`;
        const bIsHome = b.path === `/${b.language}`;
        if (aIsHome && !bIsHome) return -1;
        if (!aIsHome && bIsHome) return 1;
        return a.title.localeCompare(b.title);
      }),
      languages: Array.from(detectedLanguages).sort(),
      isMultilingual: true,
    };
  } else {
    const routes = Object.entries(components).map(([path, component]) => {
      const pathParts = path.split("/");
      const fileName = pathParts.pop()?.replace(".ts", "") || "";
      const folderName = pathParts[pathParts.length - 1];

      // Utiliser le nom du dossier comme chemin si le fichier est dans un sous-dossier
      let routePath;
      if (
        homeNames.some((name) => fileName.toLowerCase() === name.toLowerCase())
      ) {
        routePath = "/";
      } else {
        routePath =
          folderName && folderName !== "pages"
            ? `/${folderName.toLowerCase()}`
            : `/${fileName.toLowerCase()}`;
      }

      return {
        path: routePath,
        component: component.default,
        title: fileName.replace(/([A-Z])/g, " $1").trim(),
      };
    });

    return {
      routes: routes.sort((a, b) => {
        if (a.path === "/") return -1;
        if (b.path === "/") return 1;
        return a.title.localeCompare(b.title);
      }),
      isMultilingual: false,
    };
  }
}
