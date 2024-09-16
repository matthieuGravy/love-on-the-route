export class PanicHeader {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement("header");
    this.element.classList.add("flex", "bg-base-100", "navbar");
  }

  render = () => {
    this.element.innerHTML = `
        <a href="/"><h1 class="ps-4 flex-1">panicMode</h1></a>
        <nav class="pe-4 flex-1 flex justify-end">
            <ul class="grid grid-cols-2 ">
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
        `;
    return this.element;
  };
}
