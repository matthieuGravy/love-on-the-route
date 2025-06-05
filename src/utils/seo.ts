interface SEOConfig {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  siteName?: string;
  type?: string;
  keywords?: string[];
}

export function updateSEO(config: SEOConfig): void {
  // Validation des paramètres
  if (!config || typeof config !== "object") {
    console.error(
      "[Love On The Route] updateSEO: Configuration object is required"
    );
    return;
  }

  try {
    // Title
    if (config.title) {
      document.title = config.title;
      updateMetaTag("og:title", config.title);
      updateMetaTag("twitter:title", config.title);
    }

    // Description
    if (config.description) {
      updateMetaTag("description", config.description);
      updateMetaTag("og:description", config.description);
      updateMetaTag("twitter:description", config.description);
    }

    // URL
    if (config.url) {
      updateMetaTag("og:url", config.url);
      updateCanonicalLink(config.url);
    }

    // Image
    if (config.image) {
      updateMetaTag("og:image", config.image);
      updateMetaTag("twitter:image", config.image);
    }

    // Site name
    if (config.siteName) {
      updateMetaTag("og:site_name", config.siteName);
    }

    // Type
    if (config.type) {
      updateMetaTag("og:type", config.type);
    }

    // Keywords
    if (config.keywords && config.keywords.length > 0) {
      updateMetaTag("keywords", config.keywords.join(", "));
    }
  } catch (error) {
    console.error(
      "[Love On The Route] updateSEO: Error updating SEO tags",
      error
    );
  }
}

function updateMetaTag(name: string, content: string): void {
  // Validation des paramètres
  if (!name || typeof name !== "string") {
    console.error("[Love On The Route] updateMetaTag: Valid name is required");
    return;
  }

  if (content === undefined || content === null) {
    console.error("[Love On The Route] updateMetaTag: Content is required");
    return;
  }

  try {
    // Chercher par name ou property
    let metaTag = document.querySelector(
      `meta[name="${name}"]`
    ) as HTMLMetaElement;
    if (!metaTag) {
      metaTag = document.querySelector(
        `meta[property="${name}"]`
      ) as HTMLMetaElement;
    }

    if (!metaTag) {
      metaTag = document.createElement("meta");
      // Open Graph tags utilisent property, les autres utilisent name
      if (name.startsWith("og:") || name.startsWith("twitter:")) {
        metaTag.setAttribute("property", name);
      } else {
        metaTag.setAttribute("name", name);
      }
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", content);
  } catch (error) {
    console.error(
      "[Love On The Route] updateMetaTag: Error updating meta tag",
      name,
      error
    );
  }
}

function updateCanonicalLink(url: string): void {
  // Validation des paramètres
  if (!url || typeof url !== "string") {
    console.error(
      "[Love On The Route] updateCanonicalLink: Valid URL is required"
    );
    return;
  }

  try {
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.href = url;
  } catch (error) {
    console.error(
      "[Love On The Route] updateCanonicalLink: Error updating canonical link",
      error
    );
  }
}

// Helper pour réinitialiser les meta tags
export function resetSEO(): void {
  try {
    const metaTags = document.querySelectorAll("meta[name], meta[property]");
    const canonicalLink = document.querySelector('link[rel="canonical"]');

    metaTags.forEach((tag) => {
      const name = tag.getAttribute("name") || tag.getAttribute("property");
      if (
        name &&
        (name.startsWith("og:") ||
          name.startsWith("twitter:") ||
          ["description", "keywords"].includes(name))
      ) {
        tag.remove();
      }
    });

    if (canonicalLink) {
      canonicalLink.remove();
    }
  } catch (error) {
    console.error(
      "[Love On The Route] resetSEO: Error resetting SEO tags",
      error
    );
  }
}

// Helper pour détecter la langue actuelle depuis l'URL
export function detectCurrentLanguage(
  supportedLanguages: string[] = ["en", "fr"]
): string {
  // Validation des paramètres
  if (
    !supportedLanguages ||
    !Array.isArray(supportedLanguages) ||
    supportedLanguages.length === 0
  ) {
    console.error(
      "[Love On The Route] detectCurrentLanguage: Valid supported languages array is required"
    );
    return "en"; // Fallback
  }

  try {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);

    // Check if first segment is a language code
    if (segments.length > 0) {
      const possibleLang = segments[0];
      if (supportedLanguages.includes(possibleLang)) {
        return possibleLang;
      }
    }

    // Default to first language if no language in URL
    return supportedLanguages[0] || "en";
  } catch (error) {
    console.error(
      "[Love On The Route] detectCurrentLanguage: Error detecting language",
      error
    );
    return "en"; // Fallback
  }
}

// Helper pour filtrer les routes par langue actuelle
export function filterRoutesByCurrentLanguage<
  T extends { path: string; language?: string }
>(routes: T[], supportedLanguages?: string[]): T[] {
  // Validation des paramètres
  if (!routes || !Array.isArray(routes)) {
    console.error(
      "[Love On The Route] filterRoutesByCurrentLanguage: Valid routes array is required"
    );
    return [];
  }

  if (!supportedLanguages || supportedLanguages.length === 0) {
    return routes; // Pas multilingue, retourner toutes les routes
  }

  try {
    const currentLang = detectCurrentLanguage(supportedLanguages);

    return routes.filter((route) => {
      if (!route.language) {
        // Routes sans langue spécifiée, probablement mode non-multilingue
        return true;
      }

      return route.language === currentLang;
    });
  } catch (error) {
    console.error(
      "[Love On The Route] filterRoutesByCurrentLanguage: Error filtering routes",
      error
    );
    return routes; // Fallback to all routes
  }
}
