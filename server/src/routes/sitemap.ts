import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, schema } from "../db/index.js";

const SITE_URL = process.env.SITE_URL || "https://laracafeadvocacia.com.br";

export const sitemapRouter = Router();

sitemapRouter.get("/", async (_req, res) => {
  const articles = await db
    .select({ slug: schema.blogArticles.slug, publishedAt: schema.blogArticles.publishedAt })
    .from(schema.blogArticles)
    .where(eq(schema.blogArticles.status, "published"));

  const categories = await db.select({ slug: schema.blogCategories.slug }).from(schema.blogCategories);

  const staticUrls = [
    { loc: "/", changefreq: "monthly", priority: "1.0" },
    { loc: "/blog", changefreq: "weekly", priority: "0.8" },
    { loc: "/politica-de-privacidade", changefreq: "yearly", priority: "0.3" },
  ];

  const categoryUrls = categories.map((c) => ({
    loc: `/blog/categoria/${c.slug}`,
    changefreq: "weekly",
    priority: "0.5",
  }));

  const articleUrls = articles.map((a) => ({
    loc: `/blog/${a.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    lastmod: a.publishedAt ? new Date(a.publishedAt).toISOString().slice(0, 10) : undefined,
  }));

  const entries = [...staticUrls, ...categoryUrls, ...articleUrls]
    .map(
      (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    ${"lastmod" in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>\n    ` : ""}<changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  res.setHeader("Content-Type", "application/xml");
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
  );
});
