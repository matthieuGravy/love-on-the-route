# PanicMode

![npm version](https://img.shields.io/npm/v/panicmode.svg)
![npm downloads](https://img.shields.io/npm/dt/panicmode.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/panicmode.svg)

**PanicMode** is a lightweight package designed to simplify the creation of static sites. It provides easy integration of Tailwind CSS and DaisyUI components without the complexity of heavier frameworks like React. Ideal for small projects and rapid prototyping, PanicMode offers a developer-friendly solution for those who want to focus on building rather than configuring.

## Useful Links

- [npm - panicmode](https://www.npmjs.com/package/panicmode)
- [GitHub - panicmode](https://github.com/matthieuGravy/panicmode)
- [GitHub - Documentation (Coming Soon)](https://github.com/matthieuGravy/panicmode-doc)
- [Live Demo](https://panicmode-example.vercel.app/)

## Features

- Easy integration with Tailwind CSS and DaisyUI
- Lightweight and fast
- Simple routing system
- Ready-to-use UI components
- Perfect for quick prototyping and small projects

## Installation

```sh
npm install panicmode
# or
pnpm add panicmode
```

## Quick Start

Here's a basic example of how to use PanicMode in your `main.ts`:

```ts
import "panicmode/dist/panicmode.css";
import { PanicRouter } from "panicmode";
import { PanicHeader } from "panicmode";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Root element not found");

const header = new PanicHeader("<a href='/'>panicMode</a>");
const router = new PanicRouter(rootElement, header);

rootElement.appendChild(header.render());

const contentElement = document.createElement("div");
contentElement.id = "content";
rootElement.appendChild(contentElement);

router.addRoute(
  "/",
  () => {
    const panicJumbo = new PanicJumbo(
      "Welcome to panicMode",
      "h2",
      "p",
      "This is a panic jumbo",
      "Learn More",
      "a",
      "primary",
      "About PanicMode",
      "/about"
    );

    const panicCard = new PanicCard(
      "Panic Card",
      "This is a panic card",
      "/vite.svg",
      "PanicMode logo",
      "View Details",
      "/contact",
      "primary"
    );
    contentElement.innerHTML = "";
    contentElement.appendChild(panicJumbo.render());
    contentElement.appendChild(panicCard.render());
  },
  "Home"
);

router.addRoute(
  "/about",
  () => {
    contentElement.innerHTML =
      "<h1>About PanicMode</h1><p>PanicMode is a UI component library for quick prototyping.</p>";
  },
  "About"
);

router.addRoute(
  "/contact",
  () => {
    contentElement.innerHTML =
      "<h1>Contact Us</h1><p>Get in touch with the PanicMode team.</p>";
  },
  "Contact"
);

router.render();
```

## Contributing

We welcome contributions to PanicMode! Please see our [Contributing Guide](CONTRIBUTE.md) for more details on how to get started.

