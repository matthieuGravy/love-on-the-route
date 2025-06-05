type RouteHandler = () => void;

interface Route {
  path: string;
  handler: RouteHandler;
  title: string;
  children?: Route[];
}

export class Router {
  private routes: Route[] = [];
  private contentElement: HTMLElement;
  private defaultLanguage?: string;
  private supportedLanguages?: string[];

  constructor(private rootElement: HTMLElement) {
    // Créer et ajouter l'élément de contenu
    this.contentElement = document.createElement("main");
    this.contentElement.id = "content";
    this.rootElement.appendChild(this.contentElement);

    window.addEventListener("popstate", this.render.bind(this));
    this.setupNavigationListener();
  }

  addRoute(
    path: string,
    handler: RouteHandler,
    title: string,
    parentPath?: string
  ): void {
    if (!path || !handler || !title) {
      console.error("Router: Invalid route parameters", {
        path,
        handler: !!handler,
        title,
      });
      return;
    }
    const route: Route = { path, handler, title };

    if (parentPath) {
      const parent = this.findRoute(parentPath);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(route);
      }
    } else {
      this.routes.push(route);
    }
  }

  autoGenerateRoutes(
    components: Record<string, { default: RouteHandler }>
  ): void {
    Object.entries(components).forEach(([name, component]) => {
      const path = `/${name.toLowerCase()}`;
      const title = name.replace(/([A-Z])/g, " $1").trim();
      this.addRoute(path, component.default, title);
    });
  }

  private findRoute(path: string): Route | undefined {
    const route = this.routes.find((route) => route.path === path);
    return route;
  }

  navigate(path: string): void {
    if (!path || typeof path !== "string") {
      console.error("Router: Invalid path for navigation", path);
      return;
    }
    window.history.pushState({}, "", path);
    this.render();
  }

  render(): void {
    const path = window.location.pathname;

    if (!this.contentElement) {
      console.error("Router: Content element not found");
      return;
    }

    // Vérifier si une redirection multilingue est nécessaire
    if (this.handleMultilingualRedirect(path)) {
      return; // La redirection va déclencher un nouveau render()
    }

    const route = this.findRoute(path);

    // Vider uniquement l'élément de contenu, pas tout le rootElement
    this.contentElement.innerHTML = "";

    if (route) {
      route.handler();
    } else {
      this.contentElement.innerHTML = "<h1>404 - Page Not Found</h1>";
    }

    // Dispatcher un événement personnalisé pour informer la navigation
    window.dispatchEvent(
      new CustomEvent("routeChanged", {
        detail: { path },
      })
    );
  }

  private setupNavigationListener(): void {
    document.body.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        this.navigate(e.target.pathname);
      }
    });
  }

  // Méthode pour configurer le mode multilingue
  setMultilingualConfig(
    supportedLanguages: string[],
    defaultLanguage?: string
  ): void {
    if (
      !supportedLanguages ||
      !Array.isArray(supportedLanguages) ||
      supportedLanguages.length === 0
    ) {
      console.error(
        "[Love On The Route] Router: Valid supported languages array is required"
      );
      return;
    }

    this.supportedLanguages = supportedLanguages;
    this.defaultLanguage = defaultLanguage || supportedLanguages[0];
  }

  // Méthode pour détecter si une redirection multilingue est nécessaire
  private handleMultilingualRedirect(path: string): boolean {
    // Si pas en mode multilingue, pas de redirection
    if (!this.supportedLanguages || !this.defaultLanguage) {
      return false;
    }

    // Si on est sur "/" et qu'on a des routes multilingues
    if (path === "/") {
      // Vérifier s'il y a des routes qui commencent par des codes de langue
      const hasLanguageRoutes = this.routes.some((route) =>
        this.supportedLanguages!.some((lang) =>
          route.path.startsWith(`/${lang}`)
        )
      );

      if (hasLanguageRoutes) {
        this.navigate(`/${this.defaultLanguage}`);
        return true;
      }
    }

    return false;
  }

  // Méthode utilitaire pour obtenir les routes (pour génération de nav externe)
  getRoutes(): Route[] {
    return this.routes;
  }
}

// Factory function pour une API plus simple
export function createRouter(rootElement: HTMLElement): Router {
  return new Router(rootElement);
}
