"use server";

import getItem from "@/actions/getItem";
import { notFound, redirect } from "next/navigation";

export default async function ViewOrRedirect({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const item = await getItem({ slugId: slug });

  if (!item) notFound();

  if (item.redirects?.url) redirect(item.redirects.url);

  return <div>View something</div>;
}
