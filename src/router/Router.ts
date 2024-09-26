import { PanicHeader } from "../components/PanicHeader";

type RouteHandler = () => void;

interface Route {
  path: string;
  handler: RouteHandler;
  title: string;
}

export class Router {
  private routes: Route[] = [];
  private contentElement: HTMLElement;

  constructor(private rootElement: HTMLElement, private header: PanicHeader) {
    // Insérer le header en premier
    this.rootElement.insertBefore(
      this.header.render(),
      this.rootElement.firstChild
    );

    // Créer et ajouter l'élément de contenu
    this.contentElement = document.createElement("div");
    this.contentElement.id = "content";
    this.rootElement.appendChild(this.contentElement);

    window.addEventListener("popstate", this.render.bind(this));
    this.setupNavigationListener();
  }

  addRoute(path: string, handler: RouteHandler, title: string): void {
    this.routes.push({ path, handler, title });
    this.updateHeaderLinks();
  }

  private updateHeaderLinks(): void {
    const links = this.routes.map(({ path, title }) => ({
      href: path,
      content: title,
    }));
    this.header.updateLinks(links);
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

    if (!this.contentElement) {
      console.error("Router: Content element not found");
      return;
    }

    // Vider uniquement l'élément de contenu, pas tout le rootElement
    this.contentElement.innerHTML = "";

    if (route) {
      route.handler();
    } else {
      this.contentElement.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
  }

  private setupNavigationListener(): void {
    document.body.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        this.navigate(e.target.pathname);
      }
    });
  }
}
