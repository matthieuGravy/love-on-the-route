<div align="center">

<img src="assets/love-on-the-route.png" alt="Love On The Route logo" width="200" />

[![npm version](https://img.shields.io/npm/v/love-on-the-route?style=flat-square&logo=npm&label=version)](https://www.npmjs.com/package/love-on-the-route)
[![npm downloads](https://img.shields.io/npm/dm/love-on-the-route?style=flat-square&logo=npm)](https://www.npmjs.com/package/love-on-the-route)
[![license](https://img.shields.io/npm/l/love-on-the-route?style=flat-square)](https://github.com/matthieuGravy/love-on-the-route/blob/main/LICENSE)

# <b>Love On The Route</b>

<sub>The 3 annoying things solved for vanilla JS/TS SPAs: <b>routing, navigation & SEO</b></sub>

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

<img src="assets/love-on-the-route.png" alt="Love On The Route" width="200" />

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
