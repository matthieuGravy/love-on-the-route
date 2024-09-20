import "./style.css";

export * from "./components";
export * from "./router";
export * from "./utils";

if (import.meta.env.DEV) {
  // Initialisez votre application ici
  console.log("Application initialisée en mode développement");
}
