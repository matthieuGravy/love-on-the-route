interface Route {
  path: string;
  title: string;
}

export interface LogoConfig {
  html: string;
  href?: string;
  replacesHome?: boolean;
  containerClass?: string;
  linkClass?: string;
}

export class LoveNav {
  private element: HTMLElement;
  private logoConfig?: LogoConfig;

  constructor(
    private routes: Route[],
    private options: {
      tagName?: string;
      linkClass?: string;
      activeClass?: string;
      containerClass?: string;
      logo?: LogoConfig;
      separateLogoFromNav?: boolean;
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

    this.logoConfig = this.options.logo;

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

      let content = "";

      // Gestion du logo si configuré et non séparé
      if (this.logoConfig && !this.options.separateLogoFromNav) {
        const logoHref = this.logoConfig.href || "/";
        const logoClass = this.logoConfig.linkClass || "logo-link";
        const logoContainerClass = this.logoConfig.containerClass || "";

        content += `<div class="${logoContainerClass}">
          <a href="${logoHref}" class="${logoClass}" data-route="${logoHref}" data-logo="true">
            ${this.logoConfig.html}
          </a>
        </div>`;
      }

      // Filtrer les routes en fonction de la configuration du logo
      let routesToRender = this.routes;

      if (this.logoConfig?.replacesHome) {
        // Si le logo remplace home, exclure les routes "home" (path === "/" ou title === "Home")
        routesToRender = this.routes.filter(
          (route) =>
            route.path !== "/" &&
            route.title.toLowerCase() !== "home" &&
            route.title.toLowerCase() !== "accueil"
        );
      }

      const links = routesToRender
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

      content += links;
      this.element.innerHTML = content;
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
        const isLogo = link.getAttribute("data-logo") === "true";

        if (this.options.activeClass) {
          // Pour le logo, vérifier si on est sur la page d'accueil
          if (isLogo) {
            const isHomePage =
              currentPath === "/" ||
              currentPath === routePath ||
              (this.logoConfig?.href && currentPath === this.logoConfig.href);
            if (isHomePage) {
              link.classList.add(this.options.activeClass);
            } else {
              link.classList.remove(this.options.activeClass);
            }
          } else {
            // Pour les liens normaux
            if (routePath === currentPath) {
              link.classList.add(this.options.activeClass);
            } else {
              link.classList.remove(this.options.activeClass);
            }
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

  renderSeparate(): { logo?: HTMLElement; nav: HTMLElement } {
    if (!this.logoConfig || !this.options.separateLogoFromNav) {
      return { nav: this.element };
    }

    // Créer un élément logo séparé
    const logoElement = document.createElement("div");
    logoElement.className = this.logoConfig.containerClass || "logo-container";

    const logoHref = this.logoConfig.href || "/";
    const logoClass = this.logoConfig.linkClass || "logo-link";

    logoElement.innerHTML = `
      <a href="${logoHref}" class="${logoClass}" data-route="${logoHref}" data-logo="true">
        ${this.logoConfig.html}
      </a>
    `;

    // Configurer la navigation du logo
    const logoLink = logoElement.querySelector("a");
    if (logoLink) {
      logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        // Déclencher la navigation via le router
        window.dispatchEvent(
          new CustomEvent("navigateToRoute", {
            detail: { path: logoHref },
          })
        );
      });
    }

    return { logo: logoElement, nav: this.element };
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

  updateLogo(logoConfig: LogoConfig): void {
    this.logoConfig = logoConfig;
    this.updateContent();
  }
}
