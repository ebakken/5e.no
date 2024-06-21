"use server";

import { ContactTable, RedirectTable, SlugTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export default async function getItem({ slugId }: { slugId: string }) {
  const item = await db
    .selectDistinct()
    .from(SlugTable)
    .where(eq(SlugTable.id, slugId))
    .leftJoin(RedirectTable, eq(SlugTable.id, RedirectTable.slugId))
    .leftJoin(ContactTable, eq(SlugTable.id, ContactTable.slugId))
    .then((rows) => rows[0]);

  return item;
}
