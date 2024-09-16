type RouteHandler<T = void> = () => T;

interface Route<T = void> {
  path: string;
  handler: RouteHandler<T>;
  children?: Route<T>[];
}

export class Router<T = void> {
  private routes: Route<T>[] = [];
  private rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    window.addEventListener("popstate", this.render.bind(this));
  }

  addRoute(
    path: string,
    handler: RouteHandler<T>,
    children?: Route<T>[]
  ): void {
    this.routes.push({ path, handler, children });
  }

  navigate(path: string): void {
    history.pushState(null, "", path);
    this.render();
  }

  private findRoute(
    path: string,
    routes: Route<T>[] = this.routes
  ): Route<T> | undefined {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }
      if (route.children) {
        const childRoute = this.findRoute(path, route.children);
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return undefined;
  }

  render(): void {
    const path = window.location.pathname;
    const route = this.findRoute(path);

    if (!this.rootElement) {
      console.error("Root element not found");
      return;
    }

    if (route) {
      this.rootElement.innerHTML = "";
      const contentElement = document.createElement("div");
      contentElement.id = "content";
      this.rootElement.appendChild(contentElement);
      route.handler();
    } else {
      this.rootElement.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
  }
}
