"use server";

import { SlugTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export default async function validateSlug(slugId: string) {
  const slugExistst = await db
    .selectDistinct()
    .from(SlugTable)
    .where(eq(SlugTable.id, slugId))
    .then((rows) => rows.length > 0);

  return !slugExistst;
}
