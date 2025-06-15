<div align="center">

<img src="assets/love-on-the-route.png" alt="Love On The Route logo" width="200" />

[![npm version](https://img.shields.io/npm/v/love-on-the-route?style=flat-square&logo=npm&label=version)](https://www.npmjs.com/package/love-on-the-route)
[![npm downloads](https://img.shields.io/npm/dm/love-on-the-route?style=flat-square&logo=npm)](https://www.npmjs.com/package/love-on-the-route)
[![license](https://img.shields.io/npm/l/love-on-the-route?style=flat-square)](https://github.com/matthieuGravy/love-on-the-route/blob/main/LICENSE)

# <b>Love On The Route</b>

<sub>The 3 annoying things solved for vanilla JS/TS SPAs: <b>routing, navigation & SEO</b></sub>

[📚 Documentation](https://love-on-the-route.matthieugravy.dev/fr) | [💻 GitHub](https://github.com/matthieuGravy/love-on-the-route)

<!-- Sélecteur de langue -->

**🌍 Language / Langue:**

[🇬🇧 English](#english)
[🇫🇷 Français](#français)

</div>

---

## English

**The 3 annoying things solved for your vanilla JS/TS SPAs: routing, navigation, SEO, multi-language**

### What it solves

- **File-based routing** - Create `pages/About.ts` → Route `/about` automatically
- **Automatic navigation** - Generate menus without imposed CSS
- **SEO helpers** - Meta tags in one line

### Installation

```bash
npm install love-on-the-route
```

### Ultra Simple Usage - 4 lines

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.body);
generateRoutes(router, routes);
router.render();
```

**That's it!** Your pages in `pages/` become navigable routes.

### File structure

```
src/
├── pages/
│   ├── Home.ts      # → Route "/"
│   ├── About.ts     # → Route "/about"
│   └── Contact.ts   # → Route "/contact"
└── main.ts
```

### Creating a page

```typescript
// pages/Services.ts
export default function Services(): HTMLElement {
  const container = document.createElement("div");
  container.innerHTML = `
    <h1>Our Services</h1>
    <p>List of our services...</p>
  `;
  return container;
}
```

**Automatically:**

- Route `/services` created
- Ready for navigation and SEO (if you add them)

### Usage levels

#### 1. Ultra Simple (4 lines) - Just Routing

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.body);
generateRoutes(router, routes);
router.render();
```

✅ **What you get:** File-based routing  
❌ **What you don't get:** Navigation, SEO (you add them if needed)

#### 2. With Navigation (7 lines) - Routing + Nav

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  LoveNav,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
    title?: string;
    description?: string;
    keywords?: string[];
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.body);
const nav = new LoveNav(routes.map((r) => ({ path: r.path, title: r.title })));
document.body.insertBefore(nav.render(), document.querySelector("#content"));
generateRoutes(router, routes);
router.render();
```

✅ **What you get:** File-based routing + Automatic navigation  
❌ **What you don't get:** SEO (you add it if needed)

#### 3. With SEO - Manual SEO Control

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  updateSEO,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
    title?: string;
    description?: string;
    keywords?: string[];
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);

const routesWithSEO = routes.map((route) => ({
  ...route,
  component: () => {
    const pageModule = Object.values(pages).find(
      (module) => module.default.name === route.component.name
    );

    updateSEO({
      title: pageModule?.title || route.title,
      description: pageModule?.description,
      url: window.location.href,
      keywords: pageModule?.keywords,
    });

    return route.component();
  },
}));

const router = createRouter(document.body);
generateRoutes(router, routesWithSEO);
router.render();
```

**Simpler alternative - Add SEO directly to your pages:**

```typescript
// pages/About.ts
import { updateSEO } from "love-on-the-route";

export const title = "About";
export const description = "Learn more about our company";
export const keywords = ["company", "history", "team"];

export default function About(): HTMLElement {
  updateSEO({
    title,
    description,
    url: window.location.href,
    keywords,
  });

  const container = document.createElement("div");
  container.innerHTML = `
    <h1>${title}</h1>
    <p>Discover our story...</p>
  `;
  return container;
}
```

✅ **What you get:** File-based routing + Manual SEO control  
✅ **What you control:** Exactly when and how SEO is updated

### Multilingual support

#### Multilingual structure

```
pages/
├── en/
│   ├── Home.ts     # → Route "/en"
│   └── About.ts    # → Route "/en/about"
└── fr/
    ├── Home.ts     # → Route "/fr"
    └── About.ts    # → Route "/fr/about"
```

#### Automatic detection

```typescript
const { routes, languages, isMultilingual } =
  autoDiscoverPagesIntelligent(pages);

if (isMultilingual) {
  console.log("Detected languages:", languages); // ["en", "fr"]
  // Automatic language selector configuration
}
```

#### Full multilingual usage

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  updateSEO,
  LoveNav,
  LangSelector,
  filterRoutesByCurrentLanguage,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
    title?: string;
    description?: string;
    keywords?: string[];
  }
>;

const { routes, languages, isMultilingual } =
  autoDiscoverPagesIntelligent(pages);

const routesWithSEO = routes.map((route) => ({
  ...route,
  component: () => {
    const pageModule = Object.values(pages).find(
      (module) => module.default.name === route.component.name
    );

    updateSEO({
      title: pageModule?.title || route.title,
      description: pageModule?.description,
      url: window.location.href,
      keywords: pageModule?.keywords,
    });

    return route.component();
  },
}));

const router = createRouter(document.body);
generateRoutes(router, routesWithSEO);

let nav: LoveNav;
const updateNavigation = () => {
  const currentLanguageRoutes = filterRoutesByCurrentLanguage(
    routes,
    languages
  );
  const navRoutes = currentLanguageRoutes.map((r) => ({
    path: r.path,
    title: r.title,
  }));

  if (nav) {
    nav.updateRoutes(navRoutes);
  } else {
    nav = new LoveNav(navRoutes);
    document.body.insertBefore(
      nav.render(),
      document.querySelector("#content")
    );
  }
};

updateNavigation();

if (isMultilingual && languages) {
  const langOptions = languages.map((lang) => ({
    code: lang,
    label: lang === "en" ? "English" : lang === "fr" ? "Français" : lang,
    flag: lang === "en" ? "🇬🇧" : lang === "fr" ? "🇫🇷" : undefined,
  }));

  const langSelector = new LangSelector(langOptions, {
    containerClass: "language-selector",
    linkClass: "lang-link",
    activeClass: "active",
    showFlags: true,
  });

  document.body.insertBefore(
    langSelector.render(),
    document.querySelector("#content")
  );

  window.addEventListener("routeChanged", updateNavigation);
}

router.render();

if (isMultilingual && window.location.pathname === "/") {
  const defaultLang = languages?.[0] || "en";
  router.navigate(`/${defaultLang}`);
}
```

**Alternative with SVG/images :**

```typescript
if (isMultilingual && languages) {
  const langOptions = languages.map((lang) => ({
    code: lang,
    label: lang === "en" ? "English" : lang === "fr" ? "Français" : lang,
    flag:
      lang === "en"
        ? `<img src="/flags/en.svg" alt="EN" width="16" height="12" style="margin-right: 4px;">`
        : lang === "fr"
        ? `<svg width="16" height="12" style="margin-right: 4px;"><rect width="16" height="4" fill="#0055A4"/><rect y="4" width="16" height="4" fill="white"/><rect y="8" width="16" height="4" fill="#EF4135"/></svg>`
        : undefined,
  }));

  const langSelector = new LangSelector(langOptions, {
    containerClass: "language-selector",
    linkClass: "lang-link",
    activeClass: "active",
    showFlags: true,
  });

  document.body.insertBefore(
    langSelector.render(),
    document.querySelector("#content")
  );

  window.addEventListener("routeChanged", updateNavigation);
}
```

### Logo Configuration with LoveNav

**New:** LoveNav now supports native logo integration with multiple configuration options.

#### Option 1: Logo integrated in navigation (replaces Home)

```typescript
import { LoveNav } from "love-on-the-route";

const routes = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
  { path: "/contact", title: "Contact" },
];

const nav = new LoveNav(routes, {
  containerClass: "main-navigation",
  linkClass: "nav-link",
  activeClass: "active",
  logo: {
    html: `<img src="/logo.svg" alt="My Site" width="120" height="40">`,
    href: "/",
    replacesHome: true, // Logo replaces the "Home" link
    linkClass: "logo-link",
    containerClass: "logo-container",
  },
});

document.body.appendChild(nav.render());
```

#### Option 2: Logo separated from navigation

```typescript
const nav = new LoveNav(routes, {
  containerClass: "main-navigation",
  linkClass: "nav-link",
  activeClass: "active",
  separateLogoFromNav: true, // Logo rendered separately
  logo: {
    html: `<img src="/logo.svg" alt="My Site" width="120" height="40">`,
    href: "/",
    linkClass: "logo-link",
    containerClass: "logo-container",
  },
});

const { logo, nav: navElement } = nav.renderSeparate();

// Full control over placement
const header = document.createElement("header");
header.style.cssText =
  "display: flex; justify-content: space-between; align-items: center; padding: 1rem;";

if (logo) header.appendChild(logo);
header.appendChild(navElement);
document.body.appendChild(header);
```

#### Option 3: Logo coexisting with Home

```typescript
const nav = new LoveNav(routes, {
  logo: {
    html: `<img src="/logo.svg" alt="My Site" width="80" height="30">`,
    href: "/",
    replacesHome: false, // Logo AND Home link (default)
    linkClass: "logo-link",
  },
});
```

#### Language Detection & Dynamic Components

**New:** Access current language for dynamic component localization.

```typescript
import {
  getCurrentLanguage,
  detectCurrentLanguage,
  watchLanguageChanges,
} from "love-on-the-route";

// Simple current language detection
const currentLang = getCurrentLanguage();
console.log(currentLang); // 'fr', 'en', etc.

// Language detection with supported languages
const lang = detectCurrentLanguage(["en", "fr", "es"]);
console.log(lang); // With guaranteed fallback

// Watch for language changes (reactive components)
const unsubscribe = watchLanguageChanges((newLang) => {
  console.log("Language changed to:", newLang);
  // Update your component...
});

// Stop watching
unsubscribe();
```

**Example: Localized Component**

```typescript
import { getCurrentLanguage, watchLanguageChanges } from "love-on-the-route";

class LocalizedComponent {
  private currentLang: string;
  private translations = {
    en: { welcome: "Welcome", button: "Click me" },
    fr: { welcome: "Bienvenue", button: "Cliquez-moi" },
    es: { welcome: "Bienvenido", button: "Haz clic" },
  };

  constructor() {
    this.currentLang = getCurrentLanguage();
    this.render();

    // Auto-update on language changes
    watchLanguageChanges((newLang) => {
      this.currentLang = newLang;
      this.render();
    });
  }

  render() {
    const t = this.translations[this.currentLang] || this.translations.en;
    const container = document.createElement("div");
    container.innerHTML = `
      <h1>${t.welcome}</h1>
      <button>${t.button}</button>
    `;
    return container;
  }
}
```

#### Multilingual configuration with logo

```typescript
const { routes, languages, isMultilingual } =
  autoDiscoverPagesIntelligent(pages);

if (isMultilingual) {
  const getHomePath = (): string => {
    const currentPath = window.location.pathname;
    const currentLang = languages.find((lang) =>
      currentPath.startsWith(`/${lang}`)
    );
    return `/${currentLang || languages[0]}`;
  };

  let nav: LoveNav;
  const updateNavigation = () => {
    const currentLanguageRoutes = filterRoutesByCurrentLanguage(
      routes,
      languages
    );
    const navRoutes = currentLanguageRoutes.map((r) => ({
      path: r.path,
      title: r.title,
    }));

    if (nav) {
      nav.updateRoutes(navRoutes);
      // Update logo href for current language
      nav.updateLogo({
        html: `<img src="/logo.svg" alt="My Site" width="120" height="40">`,
        href: getHomePath(),
        replacesHome: true,
        linkClass: "logo-link",
      });
    } else {
      nav = new LoveNav(navRoutes, {
        logo: {
          html: `<img src="/logo.svg" alt="My Site" width="120" height="40">`,
          href: getHomePath(),
          replacesHome: true,
          linkClass: "logo-link",
        },
      });
      document.body.appendChild(nav.render());
    }
  };

  updateNavigation();
  window.addEventListener("routeChanged", updateNavigation);
}
```

#### Logo API

```typescript
interface LogoConfig {
  html: string; // Logo HTML (img, svg, text...)
  href?: string; // Destination URL (default: "/")
  replacesHome?: boolean; // If true, replaces "Home" links (default: false)
  containerClass?: string; // Container CSS class
  linkClass?: string; // Link CSS class
}
```

**Available methods:**

- `nav.render()` - Normal rendering (logo integrated if configured)
- `nav.renderSeparate()` - Separate rendering `{ logo?, nav }`
- `nav.updateLogo(logoConfig)` - Dynamic logo update

#### Option 4: Manual home filtering (when logo is managed separately)

If you're managing your logo separately from LoveNav, you can manually filter home routes:

```typescript
const updateNavigation = () => {
  const currentLanguageRoutes = filterRoutesByCurrentLanguage(
    routes,
    languages
  );

  // Manually filter out home routes
  const navRoutes = currentLanguageRoutes
    .filter((r) => {
      const path = r.path.toLowerCase();
      const title = r.title.toLowerCase();

      // Exclude home routes
      const isHomeRoute =
        path === "/" ||
        path.match(/^\/[a-z]{2}$/) || // /en, /fr, etc.
        title === "home" ||
        title === "accueil";

      return !isHomeRoute;
    })
    .map((r) => ({ path: r.path, title: r.title }));

  // Your separate logo management
  logoLink.href = getHomePath();

  if (nav) {
    nav.updateRoutes(navRoutes);
  } else {
    nav = new LoveNav(navRoutes, {
      containerClass: "main-navigation",
      linkClass: "nav-link",
      activeClass: "active",
    });
    navContainer.appendChild(nav.render());
  }
};
```

This approach is useful when:

- You have a complex logo setup
- You want full control over logo positioning
- You're using a separate navigation container

### Language Hooks

Access and react to language changes in your components with these 3 simple hooks:

#### 1. Simple current language detection

```typescript
import { getCurrentLanguage } from "love-on-the-route";

const lang = getCurrentLanguage();
console.log(lang); // 'fr', 'en', etc.
```

#### 2. Language detection with supported languages

```typescript
import { detectCurrentLanguage } from "love-on-the-route";

const lang = detectCurrentLanguage(["en", "fr", "es"]);
console.log(lang); // With guaranteed fallback
```

#### 3. 🆕 Watch for language changes

```typescript
import { watchLanguageChanges } from "love-on-the-route";

// Listen to changes
const unsubscribe = watchLanguageChanges((newLang) => {
  console.log("Language changed to:", newLang);
  // Update your component...
});

// Stop listening
unsubscribe();
```

### Why Love On The Route?

- **Ultra simple** - 4 lines to start
- **Zero imposed CSS** - Your design, your classes
- **File-based routing** - Like Next.js but vanilla
- **SEO ready** - Automatic meta tags
- **TypeScript** - Full support
- **Multilingual** - Automatic detection
- **Flexible names** - No constraints on file names

---

## Français

**Les 3 trucs chiants en moins pour vos SPAs vanilla JS/TS : routing, navigation, SEO, multi langue**

### Ce que ça résout

- **Routing file-based** - Créez `pages/About.ts` → Route `/about` automatique
- **Navigation automatique** - Génération des menus sans CSS imposé
- **SEO helpers** - Meta tags en une ligne

### Installation

```bash
npm install love-on-the-route
```

### Usage Ultra Simple - 4 lignes

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.body);
generateRoutes(router, routes);
router.render();
```

**C'est tout !** Vos pages dans `pages/` deviennent des routes navigables.

### Structure des fichiers

```
src/
├── pages/
│   ├── Home.ts      # → Route "/"
│   ├── About.ts     # → Route "/about"
│   └── Contact.ts   # → Route "/contact"
└── main.ts
```

### Créer une page

```typescript
// pages/Services.ts
export default function Services(): HTMLElement {
  const container = document.createElement("div");
  container.innerHTML = `
    <h1>Nos Services</h1>
    <p>Liste de nos services...</p>
  `;
  return container;
}
```

**Automatiquement :**

- Route `/services` créée
- Prêt pour navigation et SEO (si vous les ajoutez)

### Niveaux d'usage

#### 1. Ultra Simple (4 lignes) - Juste le Routing

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.body);
generateRoutes(router, routes);
router.render();
```

✅ **Ce que vous obtenez :** Routing file-based  
❌ **Ce que vous n'obtenez pas :** Navigation, SEO (vous les ajoutez si besoin)

#### 2. Avec Navigation (7 lignes) - Routing + Nav

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  LoveNav,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
    title?: string;
    description?: string;
    keywords?: string[];
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.body);
const nav = new LoveNav(routes.map((r) => ({ path: r.path, title: r.title })));
document.body.insertBefore(nav.render(), document.querySelector("#content"));
generateRoutes(router, routes);
router.render();
```

✅ **Ce que vous obtenez :** Routing file-based + Navigation automatique  
❌ **Ce que vous n'obtenez pas :** SEO (vous l'ajoutez si besoin)

#### 3. Avec SEO - Contrôle manuel du SEO

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  updateSEO,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
    title?: string;
    description?: string;
    keywords?: string[];
  }
>;
const { routes } = autoDiscoverPagesIntelligent(pages);

const routesWithSEO = routes.map((route) => ({
  ...route,
  component: () => {
    const pageModule = Object.values(pages).find(
      (module) => module.default.name === route.component.name
    );

    updateSEO({
      title: pageModule?.title || route.title,
      description: pageModule?.description,
      url: window.location.href,
      keywords: pageModule?.keywords,
    });

    return route.component();
  },
}));

const router = createRouter(document.body);
generateRoutes(router, routesWithSEO);
router.render();
```

**Alternative plus simple - Ajouter SEO directement dans vos pages :**

```typescript
// pages/About.ts
import { updateSEO } from "love-on-the-route";

export const title = "À propos";
export const description = "En savoir plus sur notre entreprise";
export const keywords = ["entreprise", "histoire", "équipe"];

export default function About(): HTMLElement {
  updateSEO({
    title,
    description,
    url: window.location.href,
    keywords,
  });

  const container = document.createElement("div");
  container.innerHTML = `
    <h1>${title}</h1>
    <p>Découvrez notre histoire...</p>
  `;
  return container;
}
```

✅ **Ce que vous obtenez :** Routing file-based + Manual SEO control  
✅ **Ce que vous contrôlez :** Exactement quand et comment le SEO est mis à jour

### Support multilingue

#### Structure multilingue

```
pages/
├── en/
│   ├── Home.ts     # → Route "/en"
│   └── About.ts    # → Route "/en/about"
└── fr/
    ├── Home.ts     # → Route "/fr"
    └── About.ts    # → Route "/fr/about"
```

#### Détection automatique

```typescript
const { routes, languages, isMultilingual } =
  autoDiscoverPagesIntelligent(pages);

if (isMultilingual) {
  console.log("Langues détectées :", languages); // ["en", "fr"]
  // Configuration automatique du sélecteur de langue
}
```

#### Usage complet multilingue

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  updateSEO,
  LoveNav,
  LangSelector,
  filterRoutesByCurrentLanguage,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true }) as Record<
  string,
  {
    default: () => HTMLElement;
    title?: string;
    description?: string;
    keywords?: string[];
  }
>;

const { routes, languages, isMultilingual } =
  autoDiscoverPagesIntelligent(pages);

const routesWithSEO = routes.map((route) => ({
  ...route,
  component: () => {
    const pageModule = Object.values(pages).find(
      (module) => module.default.name === route.component.name
    );

    updateSEO({
      title: pageModule?.title || route.title,
      description: pageModule?.description,
      url: window.location.href,
      keywords: pageModule?.keywords,
    });

    return route.component();
  },
}));

const router = createRouter(document.body);
generateRoutes(router, routesWithSEO);

let nav: LoveNav;
const updateNavigation = () => {
  const currentLanguageRoutes = filterRoutesByCurrentLanguage(
    routes,
    languages
  );
  const navRoutes = currentLanguageRoutes.map((r) => ({
    path: r.path,
    title: r.title,
  }));

  if (nav) {
    nav.updateRoutes(navRoutes);
  } else {
    nav = new LoveNav(navRoutes);
    document.body.insertBefore(
      nav.render(),
      document.querySelector("#content")
    );
  }
};

updateNavigation();

if (isMultilingual && languages) {
  const langOptions = languages.map((lang) => ({
    code: lang,
    label: lang === "en" ? "English" : lang === "fr" ? "Français" : lang,
    flag: lang === "en" ? "🇬🇧" : lang === "fr" ? "🇫🇷" : undefined,
  }));

  const langSelector = new LangSelector(langOptions, {
    containerClass: "language-selector",
    linkClass: "lang-link",
    activeClass: "active",
    showFlags: true,
  });

  document.body.insertBefore(
    langSelector.render(),
    document.querySelector("#content")
  );

  window.addEventListener("routeChanged", updateNavigation);
}

router.render();

if (isMultilingual && window.location.pathname === "/") {
  const defaultLang = languages?.[0] || "en";
  router.navigate(`/${defaultLang}`);
}
```

**Alternative avec SVG/images :**

```typescript
if (isMultilingual && languages) {
  const langOptions = languages.map((lang) => ({
    code: lang,
    label: lang === "en" ? "English" : lang === "fr" ? "Français" : lang,
    flag:
      lang === "en"
        ? `<img src="/flags/en.svg" alt="EN" width="16" height="12" style="margin-right: 4px;">`
        : lang === "fr"
        ? `<svg width="16" height="12" style="margin-right: 4px;"><rect width="16" height="4" fill="#0055A4"/><rect y="4" width="16" height="4" fill="white"/><rect y="8" width="16" height="4" fill="#EF4135"/></svg>`
        : undefined,
  }));

  const langSelector = new LangSelector(langOptions, {
    containerClass: "language-selector",
    linkClass: "lang-link",
    activeClass: "active",
    showFlags: true,
  });

  document.body.insertBefore(
    langSelector.render(),
    document.querySelector("#content")
  );

  window.addEventListener("routeChanged", updateNavigation);
}
```

### Configuration Logo avec LoveNav

**Nouveau :** LoveNav supporte maintenant l'intégration native du logo avec plusieurs options de configuration.

#### Option 1: Logo intégré dans la navigation (remplace Home)

```typescript
import { LoveNav } from "love-on-the-route";

const routes = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
  { path: "/contact", title: "Contact" },
];

const nav = new LoveNav(routes, {
  containerClass: "main-navigation",
  linkClass: "nav-link",
  activeClass: "active",
  logo: {
    html: `<img src="/logo.svg" alt="Mon Site" width="120" height="40">`,
    href: "/",
    replacesHome: true, // Le logo remplace le lien "Home"
    linkClass: "logo-link",
    containerClass: "logo-container",
  },
});

document.body.appendChild(nav.render());
```

#### Option 2: Logo séparé de la navigation

```typescript
const nav = new LoveNav(routes, {
  containerClass: "main-navigation",
  linkClass: "nav-link",
  activeClass: "active",
  separateLogoFromNav: true, // Logo rendu séparément
  logo: {
    html: `<img src="/logo.svg" alt="Mon Site" width="120" height="40">`,
    href: "/",
    linkClass: "logo-link",
    containerClass: "logo-container",
  },
});

const { logo, nav: navElement } = nav.renderSeparate();

// Contrôle total sur le placement
const header = document.createElement("header");
header.style.cssText =
  "display: flex; justify-content: space-between; align-items: center; padding: 1rem;";

if (logo) header.appendChild(logo);
header.appendChild(navElement);
document.body.appendChild(header);
```

#### Option 3: Logo coexistant avec Home

```typescript
const nav = new LoveNav(routes, {
  logo: {
    html: `<img src="/logo.svg" alt="Mon Site" width="80" height="30">`,
    href: "/",
    replacesHome: false, // Logo ET lien Home (défaut)
    linkClass: "logo-link",
  },
});
```

#### Détection de Langue & Composants Dynamiques

**Nouveau :** Accédez à la langue courante pour localiser dynamiquement vos composants.

```typescript
import {
  getCurrentLanguage,
  detectCurrentLanguage,
  watchLanguageChanges,
} from "love-on-the-route";

// Détection simple de la langue courante
const currentLang = getCurrentLanguage();
console.log(currentLang); // 'fr', 'en', etc.

// Détection avec langues supportées
const lang = detectCurrentLanguage(["en", "fr", "es"]);
console.log(lang); // Avec fallback garanti

// Surveiller les changements de langue (composants réactifs)
const unsubscribe = watchLanguageChanges((newLang) => {
  console.log("Langue changée vers :", newLang);
  // Mettre à jour votre composant...
});

// Arrêter la surveillance
unsubscribe();
```

**Exemple : Composant Localisé**

```typescript
import { getCurrentLanguage, watchLanguageChanges } from "love-on-the-route";

class ComposantLocalise {
  private currentLang: string;
  private translations = {
    en: { welcome: "Welcome", button: "Click me" },
    fr: { welcome: "Bienvenue", button: "Cliquez-moi" },
    es: { welcome: "Bienvenido", button: "Haz clic" },
  };

  constructor() {
    this.currentLang = getCurrentLanguage();
    this.render();

    // Mise à jour automatique lors des changements de langue
    watchLanguageChanges((newLang) => {
      this.currentLang = newLang;
      this.render();
    });
  }

  render() {
    const t = this.translations[this.currentLang] || this.translations.fr;
    const container = document.createElement("div");
    container.innerHTML = `
      <h1>${t.welcome}</h1>
      <button>${t.button}</button>
    `;
    return container;
  }
}
```

#### Configuration multilingue avec logo

```typescript
const { routes, languages, isMultilingual } =
  autoDiscoverPagesIntelligent(pages);

if (isMultilingual) {
  const getHomePath = (): string => {
    const currentPath = window.location.pathname;
    const currentLang = languages.find((lang) =>
      currentPath.startsWith(`/${lang}`)
    );
    return `/${currentLang || languages[0]}`;
  };

  let nav: LoveNav;
  const updateNavigation = () => {
    const currentLanguageRoutes = filterRoutesByCurrentLanguage(
      routes,
      languages
    );
    const navRoutes = currentLanguageRoutes.map((r) => ({
      path: r.path,
      title: r.title,
    }));

    if (nav) {
      nav.updateRoutes(navRoutes);
      // Mettre à jour le href du logo pour la langue courante
      nav.updateLogo({
        html: `<img src="/logo.svg" alt="Mon Site" width="120" height="40">`,
        href: getHomePath(),
        replacesHome: true,
        linkClass: "logo-link",
      });
    } else {
      nav = new LoveNav(navRoutes, {
        logo: {
          html: `<img src="/logo.svg" alt="Mon Site" width="120" height="40">`,
          href: getHomePath(),
          replacesHome: true,
          linkClass: "logo-link",
        },
      });
      document.body.appendChild(nav.render());
    }
  };

  updateNavigation();
  window.addEventListener("routeChanged", updateNavigation);
}
```

#### API Logo

```typescript
interface LogoConfig {
  html: string; // HTML du logo (img, svg, text...)
  href?: string; // URL de destination (défaut: "/")
  replacesHome?: boolean; // Si true, remplace les liens "Home"/"Accueil" (défaut: false)
  containerClass?: string; // Classe CSS du conteneur
  linkClass?: string; // Classe CSS du lien
}
```

**Méthodes disponibles :**

- `nav.render()` - Rendu normal (logo intégré si configuré)
- `nav.renderSeparate()` - Rendu séparé `{ logo?, nav }`
- `nav.updateLogo(logoConfig)` - Mise à jour dynamique du logo

#### Option 4 : Filtrage manuel des routes home (quand le logo est géré séparément)

Si vous gérez votre logo séparément de LoveNav, vous pouvez filtrer manuellement les routes home :

```typescript
const updateNavigation = () => {
  const currentLanguageRoutes = filterRoutesByCurrentLanguage(
    routes,
    languages
  );

  // Filtrer manuellement les routes home
  const navRoutes = currentLanguageRoutes
    .filter((r) => {
      const path = r.path.toLowerCase();
      const title = r.title.toLowerCase();

      // Exclure les routes home
      const isHomeRoute =
        path === "/" ||
        path.match(/^\/[a-z]{2}$/) || // /en, /fr, etc.
        title === "home" ||
        title === "accueil";

      return !isHomeRoute;
    })
    .map((r) => ({ path: r.path, title: r.title }));

  // Votre gestion séparée du logo
  logoLink.href = getHomePath();

  if (nav) {
    nav.updateRoutes(navRoutes);
  } else {
    nav = new LoveNav(navRoutes, {
      containerClass: "main-navigation",
      linkClass: "nav-link",
      activeClass: "active",
    });
    navContainer.appendChild(nav.render());
  }
};
```

Cette approche est utile quand :

- Vous avez une configuration de logo complexe
- Vous voulez un contrôle total sur le positionnement du logo
- Vous utilisez un conteneur de navigation séparé

### Hooks de Langue

Accédez et réagissez aux changements de langue dans vos composants avec ces 3 hooks simples :

#### 1. Récupération simple de la langue actuelle

```typescript
import { getCurrentLanguage } from "love-on-the-route";

const lang = getCurrentLanguage();
console.log(lang); // 'fr', 'en', etc.
```

#### 2. Récupération avec langues supportées

```typescript
import { detectCurrentLanguage } from "love-on-the-route";

const lang = detectCurrentLanguage(["en", "fr", "es"]);
console.log(lang); // Avec fallback garanti
```

#### 3. 🆕 Surveillance des changements de langue

```typescript
import { watchLanguageChanges } from "love-on-the-route";

// Écouter les changements
const unsubscribe = watchLanguageChanges((newLang) => {
  console.log("Langue changée vers :", newLang);
  // Mettre à jour votre composant...
});

// Arrêter l'écoute
unsubscribe();
```

### Pourquoi Love On The Route ?

- **Ultra simple** - 4 lignes pour démarrer
- **Zero CSS imposé** - Votre design, vos classes
- **File-based routing** - Comme Next.js mais vanilla
- **SEO ready** - Meta tags automatiques
- **TypeScript** - Support complet
- **Multilingue** - Détection automatique
- **Noms flexibles** - Pas de contraintes sur les noms de fichiers

---

**Love On The Route** - The 3 annoying things solved! / Les 3 trucs chiants en moins !

_From connection lines to routing lines_ 🎶 | Inspired by [Kormak](https://open.spotify.com/intl-fr/album/48e1TU9d2D5Y25wwTWmudM)
