import { Contact } from "@/lib/drizzle";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Link2Icon, Mail, Phone } from "lucide-react";

export default function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{contact.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {contact.message && (
          <div className="pb-2 space-y-4">
            {contact.message.split("\n").map((line, index) => (
              <p key={index} className="text-sm font-medium leading-none">
                {line}
              </p>
            ))}
          </div>
        )}
        {contact.url && (
          <div className="flex items-center justify-between space-x-4 p-4 rounded-md border">
            <Link2Icon />
            <Link
              href={contact.url}
              className="text-sm font-medium leading-none hover:underline underline-offset-2"
            >
              {contact.url}
            </Link>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center justify-between space-x-4 p-4 rounded-md border">
            <Mail />
            <Link
              href={`mailto:${contact.email}`}
              className="text-sm font-medium leading-none"
            >
              {contact.email}
            </Link>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center justify-between space-x-4 p-4 rounded-md border">
            <Phone />
            <Link
              href={`tel:${contact.phone}`}
              className="text-sm font-medium leading-none"
            >
              {contact.phone}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
