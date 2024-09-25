export class PanicHeader {
  private element: HTMLElement;

  constructor(
    private title: string,
    private links: Array<{ href: string; content: string }> = []
  ) {
    console.log("PanicHeader: Initializing with title:", title);
    this.element = document.createElement("header");
    this.element.classList.add("flex", "bg-base-100", "navbar");
    this.updateContent();
  }

  private updateContent(): void {
    console.log("PanicHeader: Updating content");
    const linksHtml = this.links
      .map((link) => `<li><a href="${link.href}">${link.content}</a></li>`)
      .join("");

    this.element.innerHTML = `
      <h1 class="ps-4 flex-1">${this.title}</h1>
      <nav class="pe-4 flex-1 flex justify-end">
        <ul class="grid grid-cols-${this.links.length} gap-4">
          ${linksHtml}
        </ul>
      </nav>
    `;
    console.log(
      "PanicHeader: Content updated. New innerHTML:",
      this.element.innerHTML
    );
  }

  render(): HTMLElement {
    console.log("PanicHeader: Rendering");
    return this.element;
  }

  updateLinks(newLinks: Array<{ href: string; content: string }>): void {
    console.log("PanicHeader: Updating links:", newLinks);
    this.links = newLinks;
    this.updateContent();
  }
}
