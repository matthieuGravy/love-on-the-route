export function updateHead(
  title: string,
  metaDescription: string,
  faviconUrl: string
) {
  // Update title
  document.title = title;

  // Update meta description
  updateMetaTag("description", metaDescription);

  // Update favicon
  updateLinkTag("icon", faviconUrl);

  // Update Open Graph metadata
  updateMetaTag("og:title", title);
  updateMetaTag("og:description", metaDescription);
  updateMetaTag("og:url", window.location.href);

  // Update Twitter Card metadata
  updateMetaTag("twitter:title", title);
  updateMetaTag("twitter:description", metaDescription);

  // Update canonical URL
  updateLinkTag("canonical", window.location.href);
}

function updateMetaTag(name: string, content: string) {
  let metaTag = document.querySelector(
    `meta[name="${name}"]`
  ) as HTMLMetaElement;
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.name = name;
    document.head.appendChild(metaTag);
  }
  metaTag.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let linkTag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!linkTag) {
    linkTag = document.createElement("link");
    linkTag.rel = rel;
    document.head.appendChild(linkTag);
  }
  linkTag.href = href;
}
