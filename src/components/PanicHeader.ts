interface Link {
  href: string;
  content: string;
}

export class PanicHeader {
  private element: HTMLElement;

  constructor(private logo: string, private links: Link[]) {
    this.element = document.createElement("header");
    this.element.classList.add("flex", "bg-base-100", "navbar");
  }

  render = () => {
    const linksHtml = this.links
      .map((link) => `<li><a href="${link.href}">${link.content}</a></li>`)
      .join("");

    this.element.innerHTML = `
        <a href="/"><h1 class="ps-4 flex-1">${this.logo}</h1></a>
        <nav class="pe-4 flex-1 flex justify-end">
            <ul class="grid grid-cols-${this.links.length}">
                ${linksHtml}
            </ul>
        </nav>
        `;
    return this.element;
  };
}
