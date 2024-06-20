"use server";

import { db, RedirectTable, SlugTable } from "@/lib/drizzle";
import { nanoid } from "nanoid";

export default async function createRedirect({
  url,
  slugId,
}: {
  url: string;
  slugId?: string;
}) {
  const transaction = await db
    .transaction(async (db) => {
      const slug = (
        await dbs
          .insert(SlugTable)
          .values({ id: slugId || nanoid(6) })
          .returning()
      )[0];

      const redirect = (
        await db
          .insert(RedirectTable)
          .values({
            slugId: slug.id,
            url,
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
