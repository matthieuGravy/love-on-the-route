# 🚨 PanicMode

![npm version](https://img.shields.io/npm/v/panicmode.svg)
![npm downloads](https://img.shields.io/npm/dt/panicmode.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/panicmode.svg)

**PanicMode** is a lightweight package currently under development, designed to simplify the creation of static sites. It aims to provide easy integration of Tailwind CSS and DaisyUI components without the complexity of heavier frameworks like React. 

> ⚠️ **Note:** PanicMode is in its early stages of development. Features and API may change as the project evolves.

## 🔗 Useful Links

- 📦 [npm - panicmode](https://www.npmjs.com/package/panicmode)
- 🐙 [GitHub - panicmode](https://github.com/matthieuGravy/panicmode)
- 📚 [Documentation (Coming Soon)](https://github.com/matthieuGravy/panicmode-doc)
- 🖥️ [Live Demo](https://panicmode-example.vercel.app/)

## ✨ Current Features

PanicMode is still in its early stages, with two main functionalities currently available:

1. 🧭 **Simple Routing**: Easy-to-use routing system for single-page applications.
2. 🏗️ **Basic UI Components**: Currently includes:
   - `PanicHeader`: For creating a header component
   - `PanicJumbo`: For creating a hero/jumbotron section
   - `PanicCard`: For creating card components

> 🚀 More features are planned and will be added as the project develops.

## 💻 Installation

```sh
npm install panicmode
# or
pnpm add panicmode
```

## 🚀 Quick Start

Here's a basic example of how to use PanicMode in your `main.ts`:

```typescript
import "panicmode/dist/panicmode.css";
import { PanicRouter, PanicHeader, PanicJumbo, PanicCard } from "panicmode";

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

// Add more routes as needed

router.render();
```

## 🛠️ Development

PanicMode is actively being developed. We're working on expanding its feature set and improving existing functionalities. Stay tuned for updates!

## 🤝 Contributing

While PanicMode is still in its early stages, we welcome ideas and suggestions. If you're interested in contributing or have feedback, please check our [Contributing Guide](CONTRIBUTING.md) and feel free to open an issue on our [GitHub repository](https://github.com/matthieuGravy/panicmode/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [DaisyUI](https://daisyui.com/).
