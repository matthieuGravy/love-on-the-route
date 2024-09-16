export function updateHead(
  title: string,
  metaDescription: string,
  faviconUrl: string
) {
  // update title
  document.title = title;

  // update meta description
  let metaDescriptionElement = document.querySelector(
    'meta[name="description"]'
  );
  if (!metaDescriptionElement) {
    metaDescriptionElement = document.createElement("meta");
    metaDescriptionElement.setAttribute("name", "description");
    document.head.appendChild(metaDescriptionElement);
  }
  metaDescriptionElement.setAttribute("content", metaDescription);

  // update favicon
  let faviconElement = document.querySelector('link[rel="icon"]');
  if (!faviconElement) {
    faviconElement = document.createElement("link");
    faviconElement.setAttribute("rel", "icon");
    document.head.appendChild(faviconElement);
  }
  faviconElement.setAttribute("href", faviconUrl);
}
