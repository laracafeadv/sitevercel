import { useEffect } from "react";

const SITE_URL = "https://laracafeadvocacia.com.br";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/lara-foto.png`;

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMetaByAttr(attr: "name" | "property", key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function SEO({ title, description, path, image, type = "website", jsonLd }: SEOProps) {
  useEffect(() => {
    document.title = title;

    if (description) {
      setMetaByAttr("name", "description", description);
      setMetaByAttr("property", "og:description", description);
    }

    const canonicalUrl = `${SITE_URL}${path ?? window.location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    setMetaByAttr("property", "og:title", title);
    setMetaByAttr("property", "og:type", type);
    setMetaByAttr("property", "og:url", canonicalUrl);
    setMetaByAttr("property", "og:image", image ?? DEFAULT_OG_IMAGE);
    setMetaByAttr("property", "og:locale", "pt_BR");
    setMetaByAttr("name", "twitter:card", "summary_large_image");
    setMetaByAttr("name", "twitter:title", title);
    if (description) setMetaByAttr("name", "twitter:description", description);

    const scriptId = "seo-json-ld";
    document.getElementById(scriptId)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [title, description, path, image, type, jsonLd]);

  return null;
}
