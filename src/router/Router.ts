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
    window.history.pushState({}, "", path);
    this.render();
  }

  render(): void {
    const path = window.location.pathname;
    const route = this.findRoute(path);

    console.log(`🔍 Router.render() - Path: ${path}`);
    console.log(
      `📋 Routes disponibles:`,
      this.routes.map((r) => r.path)
    );
    console.log(`🎯 Route trouvée:`, route);

    if (!this.contentElement) {
      console.error("Router: Content element not found");
      return;
    }

    // Vider uniquement l'élément de contenu, pas tout le rootElement
    this.contentElement.innerHTML = "";

    if (route) {
      console.log(`✅ Exécution du handler pour: ${route.path}`);
      route.handler();
    } else {
      console.log(`❌ Aucune route trouvée pour: ${path}`);
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

  // Méthode utilitaire pour obtenir les routes (pour génération de nav externe)
  getRoutes(): Route[] {
    return this.routes;
  }
}

// Factory function pour une API plus simple
export function createRouter(rootElement: HTMLElement): Router {
  return new Router(rootElement);
}
