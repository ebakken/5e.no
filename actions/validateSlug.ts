"use server";

import { slugs, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export default async function validateSlug(slugId: string) {
  const slugExistst = await db
    .selectDistinct()
    .from(slugs)
    .where(eq(slugs.id, slugId))
    .then((rows) => rows.length > 0);

  return !slugExistst;
}
