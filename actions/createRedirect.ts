"use server";

import { db, redirects, slugs } from "@/lib/drizzle";
import { redirectFormSchema } from "@/lib/schemas";
import { nanoid } from "nanoid";
import { z } from "zod";

export default async function createRedirect(
  values: z.infer<typeof redirectFormSchema>
) {
  const validatedFields = await redirectFormSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return {
      vaildation_errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const transaction = await db
    .transaction(async (db) => {
      const slug = (
        await db
          .insert(slugs)
          .values({ id: values.slug || nanoid(6) })
          .returning()
      )[0];

      const redirect = (
        await db
          .insert(redirects)
          .values({
            slugId: slug.id,
            url: values.url,
          })
          .returning()
      )[0];

      return { slug, redirect };
    })
    .catch((error) => {
      return { database_error: error.message };
    });

  return transaction;
}
