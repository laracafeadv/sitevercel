import { z } from "zod";
import { eq } from "drizzle-orm";
import { router, publicProcedure, adminProcedure } from "../trpc.js";
import { schema } from "../../db/index.js";

export const siteContentRouter = router({
  get: publicProcedure.input(z.object({ key: z.string() })).query(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select()
      .from(schema.siteContent)
      .where(eq(schema.siteContent.key, input.key));
    return row ? row.data : null;
  }),

  adminGetAll: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(schema.siteContent);
  }),

  update: adminProcedure
    .input(z.object({ key: z.string(), data: z.record(z.string(), z.unknown()) }))
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db
        .select()
        .from(schema.siteContent)
        .where(eq(schema.siteContent.key, input.key));

      if (existing) {
        const [updated] = await ctx.db
          .update(schema.siteContent)
          .set({ data: input.data, updatedAt: new Date() })
          .where(eq(schema.siteContent.key, input.key))
          .returning();
        return updated;
      }

      const [created] = await ctx.db
        .insert(schema.siteContent)
        .values({ key: input.key, data: input.data })
        .returning();
      return created;
    }),
});
