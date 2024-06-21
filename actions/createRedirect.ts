"use server";

import { db, RedirectTable, SlugTable } from "@/lib/drizzle";
import { redirectFormSchema } from "@/lib/schemas";
import { nanoid } from "nanoid";
import { z } from "zod";

export default async function createRedirect(
  values: z.infer<typeof redirectFormSchema>
) {
  const transaction = await db
    .transaction(async (db) => {
      const slug = (
        await db
          .insert(SlugTable)
          .values({ id: values.slug || nanoid(6) })
          .returning()
      )[0];

      const redirect = (
        await db
          .insert(RedirectTable)
          .values({
            slugId: slug.id,
            url: values.url,
          })
          .returning()
      )[0];

      return { slug, redirect };
    })
    .catch((error) => {
      return { error: error.message };
    });

  return transaction;
}
