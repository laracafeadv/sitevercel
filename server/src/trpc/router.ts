import { router } from "./trpc.js";
import { authRouter } from "./routers/auth.js";
import { categoriesRouter } from "./routers/categories.js";
import { articlesRouter } from "./routers/articles.js";
import { contactsRouter } from "./routers/contacts.js";
import { testimonialsRouter } from "./routers/testimonials.js";
import { dashboardRouter } from "./routers/dashboard.js";
import { siteContentRouter } from "./routers/siteContent.js";

export const appRouter = router({
  auth: authRouter,
  categories: categoriesRouter,
  articles: articlesRouter,
  contacts: contactsRouter,
  testimonials: testimonialsRouter,
  dashboard: dashboardRouter,
  siteContent: siteContentRouter,
});

export type AppRouter = typeof appRouter;
