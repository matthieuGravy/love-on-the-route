export class PanicTypography {
  private element: HTMLElement;

  constructor(
    as: keyof HTMLElementTagNameMap,
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "label",
    children: string,
    className: string = ""
  ) {
    this.element = document.createElement(as);
    this.element.className = this.computeClassName(variant, className);
    this.element.textContent = children;
  }

  private computeClassName(
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "label",
    className: string
  ): string {
    const baseClass = className ? `${className} ` : "";
    switch (variant) {
      case "h1":
        return `${baseClass} text-4xl`;
      case "h2":
        return `${baseClass} text-red-400`;
      case "h3":
        return `${baseClass} text-red-400`;
      case "h4":
        return `${baseClass} text-red-400`;
      case "h5":
        return `${baseClass} text-red-400`;
      case "h6":
        return `${baseClass} text-red-400`;
      case "p":
        return `${baseClass}  text-lg`;
      case "small":
        return `${baseClass} text-red-400`;
      case "label":
        return `${baseClass} text-red-400`;
      default:
        return className;
    }
  }

  render(): HTMLElement {
    return this.element;
  }
}
