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

    if (this.logoConfig) {
      console.log(
        "[Love On The Route] DEBUG: LoveNav initialisé avec logo:",
        this.logoConfig
      );
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

      let content = "";

      // Gestion du logo si configuré et non séparé
      if (this.logoConfig && !this.options.separateLogoFromNav) {
        const logoHref = this.logoConfig.href || "/";
        const logoClass = this.logoConfig.linkClass || "logo-link";
        const logoContainerClass = this.logoConfig.containerClass || "";

        console.log("[Love On The Route] DEBUG: Ajout du logo intégré:", {
          logoHref,
          logoClass,
          logoContainerClass,
          replacesHome: this.logoConfig.replacesHome,
        });

        content += `<div class="${logoContainerClass}">
          <a href="${logoHref}" class="${logoClass}" data-route="${logoHref}" data-logo="true">
            ${this.logoConfig.html}
          </a>
        </div>`;
      }

      // Filtrer les routes en fonction de la configuration du logo
      let routesToRender = this.routes;

      if (this.logoConfig?.replacesHome) {
        console.log(
          "[Love On The Route] DEBUG: Logo replacesHome activé, routes avant filtrage:",
          this.routes
        );

        // Si le logo remplace home, exclure les routes "home"
        routesToRender = this.routes.filter((route) => {
          const path = route.path.toLowerCase();
          const title = route.title.toLowerCase();

          const isHomeRoute =
            path === "/" ||
            path.match(/^\/[a-z]{2}$/) || // /en, /fr, etc.
            title === "home" ||
            title === "accueil";

          if (isHomeRoute) {
            console.log("[Love On The Route] DEBUG: Route home exclue:", route);
          }

          // Exclure les routes home: "/", "/en", "/fr", etc. et les titres "home"/"accueil"
          return !isHomeRoute;
        });

        console.log(
          "[Love On The Route] DEBUG: Routes après filtrage:",
          routesToRender
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

      // Ajouter les événements de clic après avoir mis à jour le contenu
      this.setupClickHandlers();
    } catch (error) {
      console.error(
        "[Love On The Route] LoveNav: Error updating content",
        error
      );
      this.element.innerHTML = "";
    }
  }

  private setupClickHandlers(): void {
    // Configurer les événements de clic pour tous les liens
    const links = this.element.querySelectorAll("a");

    console.log(
      "[Love On The Route] DEBUG: Configuration des clics pour",
      links.length,
      "liens"
    );

    links.forEach((link, index) => {
      const routePath = link.getAttribute("data-route");
      const isLogo = link.getAttribute("data-logo") === "true";

      console.log(`[Love On The Route] DEBUG: Lien ${index}:`, {
        routePath,
        isLogo,
        innerHTML: link.innerHTML.substring(0, 50),
      });

      if (routePath) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          console.log(
            "[Love On The Route] DEBUG: Clic sur",
            isLogo ? "logo" : "lien",
            "vers:",
            routePath
          );

          // Utiliser l'événement navigate standard du router
          window.history.pushState(null, "", routePath);
          window.dispatchEvent(new PopStateEvent("popstate"));

          console.log(
            "[Love On The Route] DEBUG: Navigation déclenchée vers:",
            routePath
          );
        });
      } else {
        console.error("[Love On The Route] ERROR: Lien sans data-route:", link);
      }
    });
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
      console.log(
        "[Love On The Route] DEBUG: Configuration du clic logo séparé vers:",
        logoHref
      );

      logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(
          "[Love On The Route] DEBUG: Clic sur logo séparé vers:",
          logoHref
        );

        // Utiliser l'événement navigate standard du router
        window.history.pushState(null, "", logoHref);
        window.dispatchEvent(new PopStateEvent("popstate"));

        console.log(
          "[Love On The Route] DEBUG: Navigation logo séparé déclenchée vers:",
          logoHref
        );
      });
    } else {
      console.error(
        "[Love On The Route] ERROR: Logo séparé créé mais lien non trouvé"
      );
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
