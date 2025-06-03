interface LangOption {
  code: string;
  label: string;
  flag?: string;
}

export class LangSelector {
  private element: HTMLElement;
  private currentLang: string;

  constructor(
    private languages: LangOption[],
    private options: {
      tagName?: string;
      containerClass?: string;
      linkClass?: string;
      activeClass?: string;
      showFlags?: boolean;
    } = {}
  ) {
    this.currentLang = this.detectCurrentLanguage();
    this.element = document.createElement(this.options.tagName || "div");

    if (this.options.containerClass) {
      this.element.className = this.options.containerClass;
    }

    this.updateContent();
    this.setupLanguageListener();
  }

  private detectCurrentLanguage(): string {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);

    // Check if first segment is a language code
    if (segments.length > 0) {
      const possibleLang = segments[0];
      if (this.languages.some((lang) => lang.code === possibleLang)) {
        return possibleLang;
      }
    }

    // Default to first language if no language in URL
    return this.languages[0]?.code || "en";
  }

  private updateContent(): void {
    const links = this.languages
      .map((lang) => {
        const linkClass = this.options.linkClass || "";
        const activeClass =
          lang.code === this.currentLang ? this.options.activeClass || "" : "";
        const combinedClass = `${linkClass} ${activeClass}`.trim();

        const flag = this.options.showFlags && lang.flag ? lang.flag + " " : "";
        const label = `${flag}${lang.label}`;

        return `<a href="/${lang.code}" class="${combinedClass}" data-lang="${lang.code}">${label}</a>`;
      })
      .join("");

    this.element.innerHTML = links;
  }

  private setupLanguageListener(): void {
    // Update active state when route changes
    const updateActiveState = () => {
      this.currentLang = this.detectCurrentLanguage();
      this.updateContent();
    };

    // Listen for route changes
    window.addEventListener("popstate", updateActiveState);
    window.addEventListener("routeChanged", updateActiveState);

    // Handle language switching clicks
    this.element.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        const langCode = e.target.getAttribute("data-lang");
        if (langCode) {
          e.preventDefault();
          this.switchLanguage(langCode);
        }
      }
    });
  }

  private switchLanguage(langCode: string): void {
    const currentPath = window.location.pathname;
    const segments = currentPath.split("/").filter(Boolean);

    // Remove current language from path if present
    if (
      segments.length > 0 &&
      this.languages.some((lang) => lang.code === segments[0])
    ) {
      segments.shift(); // Remove first segment (current language)
    }

    // Build new path with new language
    const newPath = `/${langCode}${
      segments.length > 0 ? "/" + segments.join("/") : ""
    }`;

    // Navigate to new path
    window.history.pushState({}, "", newPath);
    window.dispatchEvent(
      new CustomEvent("routeChanged", {
        detail: { path: newPath, lang: langCode },
      })
    );
  }

  render(): HTMLElement {
    return this.element;
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }

  updateLanguages(newLanguages: LangOption[]): void {
    this.languages = newLanguages;
    this.updateContent();
  }
}
