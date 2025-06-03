# Love On The Route

<!-- Sélecteur de langue -->

**🌍 Language / Langue:**

- [🇬🇧 English](#english)
- [🇫🇷 Français](#français)

---

## English

<img src="assets/love-on-the-route.png" alt="Love On The Route" width="200" />

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

const pages = import.meta.glob("./pages/**/*.ts", { eager: true });
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.querySelector("#app"));
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
- Navigation updated
- SEO configured

### Usage levels

#### 1. Ultra Simple (4 lines)

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true });
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.querySelector("#app"));
generateRoutes(router, routes);
router.render();
```

#### 2. With Navigation (7 lines)

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  LoveNav,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true });
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.querySelector("#app"));
const nav = new LoveNav(routes.map((r) => ({ path: r.path, title: r.title })));
document.body.insertBefore(nav.render(), document.querySelector("#app"));
generateRoutes(router, routes);
router.render();
```

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

const pages = import.meta.glob("./pages/**/*.ts", { eager: true });
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.querySelector("#app"));
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
- Navigation mise à jour
- SEO configuré

### Niveaux d'usage

#### 1. Ultra Simple (4 lignes)

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true });
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.querySelector("#app"));
generateRoutes(router, routes);
router.render();
```

#### 2. Avec Navigation (7 lignes)

```typescript
import {
  createRouter,
  autoDiscoverPagesIntelligent,
  generateRoutes,
  LoveNav,
} from "love-on-the-route";

const pages = import.meta.glob("./pages/**/*.ts", { eager: true });
const { routes } = autoDiscoverPagesIntelligent(pages);
const router = createRouter(document.querySelector("#app"));
const nav = new LoveNav(routes.map((r) => ({ path: r.path, title: r.title })));
document.body.insertBefore(nav.render(), document.querySelector("#app"));
generateRoutes(router, routes);
router.render();
```

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
