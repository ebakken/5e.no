"use server";

import { contacts, redirects, slugs, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export default async function getItem({ slugId }: { slugId: string }) {
  const item = await db
    .selectDistinct()
    .from(slugs)
    .where(eq(slugs.id, slugId))
    .leftJoin(redirects, eq(slugs.id, redirects.slugId))
    .leftJoin(contacts, eq(slugs.id, contacts.slugId))
    .then((rows) => rows[0]);

  return item;
}
