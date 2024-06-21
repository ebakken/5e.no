"use server";

import getItem from "@/actions/getItem";
import ContactCard from "@/components/contact-card";
import { notFound, redirect } from "next/navigation";

export default async function ViewOrRedirect({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const item = await getItem({ slugId: slug });

  // If the item doesn't exist, return a 404.
  if (!item) notFound();

  // If the item has a URL, redirect to it.
  if (item.redirects) redirect(item.redirects.url);

  // If the item has contact information, render a contact card.
  if (item.contacts) return <ContactCard contact={item.contacts} />;

  return notFound();
}
