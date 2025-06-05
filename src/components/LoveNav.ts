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
    // Validation des paramètres
    if (!routes || !Array.isArray(routes)) {
      console.error("[Love On The Route] LoveNav: Routes array is required");
      this.routes = [];
    }

    if (!options || typeof options !== "object") {
      console.error("[Love On The Route] LoveNav: Options should be an object");
      this.options = {};
    }

    try {
      this.element = document.createElement(this.options.tagName || "nav");
      if (this.options.containerClass) {
        this.element.className = this.options.containerClass;
      }
      this.updateContent();
      this.setupActiveStateListener();
    } catch (error) {
      console.error(
        "[Love On The Route] LoveNav: Error during initialization",
        error
      );
      // Create fallback element
      this.element = document.createElement("nav");
    }
  }

  private updateContent(): void {
    try {
      if (!this.routes || this.routes.length === 0) {
        console.warn(
          "[Love On The Route] LoveNav: No routes provided for navigation"
        );
        this.element.innerHTML = "";
        return;
      }

      const links = this.routes
        .filter((route) => route && route.path && route.title) // Filter valid routes
        .map((route) => {
          const linkClass = this.options.linkClass || "";
          const safePath = route.path.replace(/"/g, "&quot;"); // Escape quotes
          const safeTitle = route.title
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;"); // Escape HTML
          return `<a href="${safePath}" class="${linkClass}" data-route="${safePath}">${safeTitle}</a>`;
        })
        .join("");

      this.element.innerHTML = links;
    } catch (error) {
      console.error(
        "[Love On The Route] LoveNav: Error updating content",
        error
      );
      this.element.innerHTML = "";
    }
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
    if (!newRoutes || !Array.isArray(newRoutes)) {
      console.error(
        "[Love On The Route] LoveNav: updateRoutes requires a valid routes array"
      );
      return;
    }

    try {
      this.routes = newRoutes;
      this.updateContent();
    } catch (error) {
      console.error(
        "[Love On The Route] LoveNav: Error updating routes",
        error
      );
    }
  }
}
