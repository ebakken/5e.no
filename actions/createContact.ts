"use server";

import { db, ContactTable, SlugTable } from "@/lib/drizzle";
import { contactFormSchema } from "@/lib/schemas";
import { nanoid } from "nanoid";
import { z } from "zod";

export default async function createContact(
  values: z.infer<typeof contactFormSchema>
) {
  const transaction = await db
    .transaction(async (db) => {
      const slug = (
        await db
          .insert(SlugTable)
          .values({ id: values.slug || nanoid(6) })
          .returning()
      )[0];

      const contact = (
        await db
          .insert(ContactTable)
          .values({
            slugId: slug.id,
            url: values.url,
            name: values.name,
            email: values.email,
            message: values.message,
            phone: values.phone,
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
