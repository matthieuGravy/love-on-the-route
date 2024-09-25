import { PanicButton } from "./PanicButton";

export class PanicCard {
  private element: HTMLDivElement;

  constructor(
    title: string,
    content: string,
    src: string,
    alt: string,
    contentButton: string,
    href: string,
    type: "primary" | "secondary" | "ternary"
  ) {
    const link = new PanicButton(contentButton, "a", type, contentButton, href);
    this.element = document.createElement("div");
    this.element.classList.add("card");
    this.element.innerHTML = `
      <article class="card bg-base-100 w-72 lg:w-96 shadow-xl">
        <figure>
          <img src="${src}" alt="${alt}" />
        </figure>
        <figcaption class="card-body">
          <h2>${title}</h2>
          <p>${content}</p>
          <div class="card-actions justify-end">
            ${link.render().outerHTML}
          </div>
        </figcaption>
      </article>
    `;
  }

  render = () => {
    return this.element;
  };
}
