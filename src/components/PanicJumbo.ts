import { PanicButton } from "./PanicButton";
import { PanicTypography } from "./PanicTypography";

export class PanicJumbo {
  private element: HTMLElement;

  constructor(
    private headerContent: string,
    private tagHeader: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    private tagParagraph: "p" | "small" | "label",
    private paragraphContent: string,
    private text: string,
    private tag: "a" | "button",
    private type: "primary" | "secondary" | "ternary",
    private title?: string,
    private href?: string,
    private onClick?: () => void
  ) {
    this.element = document.createElement("section");
    this.element.classList.add("bg-base-100", "text-center", "py-20");
  }

  render = () => {
    this.element.appendChild(
      new PanicTypography(this.tagHeader, "h1", this.headerContent).render()
    );
    this.element.appendChild(
      new PanicTypography(
        this.tagParagraph,
        "p",
        this.paragraphContent,
        "pb-2"
      ).render()
    );
    this.element.appendChild(
      new PanicButton(
        this.text,
        this.tag,
        this.type,
        this.title,
        this.href,
        this.onClick
      ).render()
    );
    return this.element;
  };
}
