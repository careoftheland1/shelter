import { useEffect } from "react";

const SITE_URL = "https://shelter.onthe.land";

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [name, content] = attribute;
    element.setAttribute(name, content);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function PageMeta({ title, description, path = "/" }) {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE_URL).href;
    document.title = title;
    setMeta('meta[name="description"]', ["name", "description"], description);
    setMeta('meta[property="og:title"]', ["property", "og:title"], title);
    setMeta('meta[property="og:description"]', ["property", "og:description"], description);
    setMeta('meta[property="og:url"]', ["property", "og:url"], canonicalUrl);
    setMeta('meta[name="twitter:title"]', ["name", "twitter:title"], title);
    setMeta('meta[name="twitter:description"]', ["name", "twitter:description"], description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, path]);

  return null;
}

export default PageMeta;
