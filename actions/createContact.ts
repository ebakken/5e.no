"use server";

import { db, ContactTable, SlugTable } from "@/lib/drizzle";
import { nanoid } from "nanoid";

export default async function createContact({
  url,
  slugId,
  name,
  email,
  message,
  phone,
}: {
  url?: string;
  slugId?: string;
  name: string;
  email: string;
  message?: string;
  phone: string;
}) {
  const transaction = await db
    .transaction(async (db) => {
      const slug = (
        await db
          .insert(SlugTable)
          .values({ id: slugId || nanoid(6) })
          .returning()
      )[0];

      const contact = (
        await db
          .insert(ContactTable)
          .values({
            slugId: slug.id,
            url,
            name,
            email,
            message,
            phone,
          })
          .returning()
      )[0];

      return { slug, contact };
    })
    .catch((error) => {
      return { error: error.message };
    });

  return transaction;
}
