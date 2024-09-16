export class PanicButton {
  private element: HTMLButtonElement | HTMLAnchorElement;

  constructor(
    text: string,
    tag: "a" | "button",
    type: "primary" | "secondary" | "ternary",
    title?: string,
    href?: string,
    onClick?: () => void
  ) {
    this.element = document.createElement(tag);
    this.element.textContent = text;

    switch (type) {
      case "primary":
        this.element.classList.add("btn", "btn-primary");
        break;
      case "secondary":
        this.element.classList.add("btn", "btn-secondary");
        break;
      case "ternary":
        this.element.classList.add("btn", "btn-ternary");
        break;
      default:
        this.element.classList.add("btn");
    }

    if (title) {
      this.element.setAttribute("title", title);
    }

    if (tag === "a" && href) {
      (this.element as HTMLAnchorElement).href = href;
    }

    if (tag === "button" && onClick) {
      (this.element as HTMLButtonElement).onclick = onClick;
    }
  }

  render = () => {
    return this.element;
  };
}
