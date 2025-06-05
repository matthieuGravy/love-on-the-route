interface LangOption {
  code: string;
  label: string;
  flag?: string;
}

export class LangSelector {
  private element: HTMLElement;
  private currentLang: string = "en"; // Default value

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
    // Validation des paramètres
    if (!languages || !Array.isArray(languages) || languages.length === 0) {
      console.error(
        "[Love On The Route] LangSelector: Languages array is required and cannot be empty"
      );
      this.languages = [{ code: "en", label: "English" }]; // Fallback
    }

    if (!options || typeof options !== "object") {
      console.error(
        "[Love On The Route] LangSelector: Options should be an object"
      );
      this.options = {};
    }

    try {
      this.currentLang = this.detectCurrentLanguage();
      this.element = document.createElement(this.options.tagName || "div");

      if (this.options.containerClass) {
        this.element.className = this.options.containerClass;
      }

      this.updateContent();
      this.setupLanguageListener();
    } catch (error) {
      console.error(
        "[Love On The Route] LangSelector: Error during initialization",
        error
      );
      // Create fallback element
      this.element = document.createElement("div");
    }
  }

  private detectCurrentLanguage(): string {
    try {
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
    } catch (error) {
      console.error(
        "[Love On The Route] LangSelector: Error detecting current language",
        error
      );
      return "en"; // Fallback
    }
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
    if (!langCode || typeof langCode !== "string") {
      console.error(
        "[Love On The Route] LangSelector: Valid language code is required"
      );
      return;
    }

    if (!this.languages.some((lang) => lang.code === langCode)) {
      console.error(
        "[Love On The Route] LangSelector: Language code not found in supported languages",
        langCode
      );
      return;
    }

    try {
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
    } catch (error) {
      console.error(
        "[Love On The Route] LangSelector: Error switching language",
        error
      );
    }
  }

  render(): HTMLElement {
    return this.element;
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }

  updateLanguages(newLanguages: LangOption[]): void {
    if (
      !newLanguages ||
      !Array.isArray(newLanguages) ||
      newLanguages.length === 0
    ) {
      console.error(
        "[Love On The Route] LangSelector: updateLanguages requires a valid, non-empty languages array"
      );
      return;
    }

    try {
      this.languages = newLanguages;
      this.updateContent();
    } catch (error) {
      console.error(
        "[Love On The Route] LangSelector: Error updating languages",
        error
      );
    }
  }
}
