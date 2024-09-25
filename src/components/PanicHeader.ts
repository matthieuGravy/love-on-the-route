export class PanicHeader {
  private element: HTMLElement;
  private dropdownCheckbox: HTMLInputElement | null = null;

  constructor(
    private title: string,
    private links: Array<{ href: string; content: string }> = []
  ) {
    console.log("PanicHeader: Initializing with title:", title);
    this.element = document.createElement("header");
    this.element.classList.add("navbar", "bg-base-200");
    this.updateContent();
    this.setupEventListeners();
  }

  private updateContent(): void {
    console.log("PanicHeader: Updating content");
    const linksHtml = this.links
      .map(
        (link, index) =>
          `<li><a href="${link.href}" data-link-index="${index}">${link.content}</a></li>`
      )
      .join("");

    this.element.innerHTML = `
      <div class="navbar-start">
        <div class="dropdown lg:hidden">
          <input type="checkbox" id="mobile-menu-checkbox" class="hidden" />
          <label for="mobile-menu-checkbox" tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            ${linksHtml}
          </ul>
        </div>
        <h1 class="btn btn-ghost normal-case text-xl lg:flex">${this.title}</h1>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          ${linksHtml}
        </ul>
      </div>
      <div class="navbar-end">
        <!-- You can add additional elements here if needed -->
      </div>
    `;
    console.log(
      "PanicHeader: Content updated. New innerHTML:",
      this.element.innerHTML
    );

    this.dropdownCheckbox = this.element.querySelector("#mobile-menu-checkbox");
  }

  private setupEventListeners(): void {
    this.element.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A" && target.closest(".dropdown-content")) {
        if (this.dropdownCheckbox) {
          this.dropdownCheckbox.checked = false;
        }
      }
    });
  }

  render(): HTMLElement {
    console.log("PanicHeader: Rendering");
    return this.element;
  }

  updateLinks(newLinks: Array<{ href: string; content: string }>): void {
    console.log("PanicHeader: Updating links:", newLinks);
    this.links = newLinks;
    this.updateContent();
    this.setupEventListeners();
  }
}
