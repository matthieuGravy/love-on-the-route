interface Route {
  path: string;
  title: string;
}

export class LoveNav {
  private element: HTMLElement;

  constructor(
    private routes: Route[],
    private options: {
      tagName?: string;
      linkClass?: string;
      activeClass?: string;
      containerClass?: string;
    } = {}
  ) {
    this.element = document.createElement(this.options.tagName || "nav");
    if (this.options.containerClass) {
      this.element.className = this.options.containerClass;
    }
    this.updateContent();
    this.setupActiveStateListener();
  }

  private updateContent(): void {
    const links = this.routes
      .map((route) => {
        const linkClass = this.options.linkClass || "";
        return `<a href="${route.path}" class="${linkClass}" data-route="${route.path}">${route.title}</a>`;
      })
      .join("");

    this.element.innerHTML = links;
  }

  private setupActiveStateListener(): void {
    // Mettre à jour l'état actif lors des changements de route
    const updateActiveState = () => {
      const currentPath = window.location.pathname;
      const links = this.element.querySelectorAll("a");

      links.forEach((link) => {
        const routePath = link.getAttribute("data-route");
        if (this.options.activeClass) {
          if (routePath === currentPath) {
            link.classList.add(this.options.activeClass);
          } else {
            link.classList.remove(this.options.activeClass);
          }
        }
      });
    };

    // Écouter les changements de route (bouton retour/avant)
    window.addEventListener("popstate", updateActiveState);

    // Écouter les changements de route programmatiques
    window.addEventListener("routeChanged", updateActiveState);

    updateActiveState(); // État initial
  }

  render(): HTMLElement {
    return this.element;
  }

  updateRoutes(newRoutes: Route[]): void {
    this.routes = newRoutes;
    this.updateContent();
  }
}
