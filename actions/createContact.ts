"use server";

import { db, ContactTable, SlugTable } from "@/lib/drizzle";
import { transporter } from "@/lib/email";
import { contactFormSchema } from "@/lib/schemas";
import { nanoid } from "nanoid";
import { z } from "zod";

export default async function createContact(
  values: z.infer<typeof contactFormSchema>
) {
  const validatedFields = await contactFormSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return {
      vaildation_errors: validatedFields.error.flatten().fieldErrors,
    };
  }

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
      return { database_error: error.message };
    });

  if (
    "contact" in transaction &&
    process.env.EMAIL_RECEIPT_ADDRESS &&
    process.env.EMAIL_REGISTRATION_FILTER &&
    transaction.contact.email.includes(process.env.EMAIL_REGISTRATION_FILTER)
  ) {
    try {
      const mail = await transporter.sendMail({
        from: '"5e.no" <noreply@5e.no>',
        to: process.env.EMAIL_RECEIPT_ADDRESS,
        subject: "5e.no | Contact Creation Notification",
        text: `A new contact has been created at https:\/\/5e.no/${
          transaction.slug.id
        } with the following details: ${JSON.stringify(transaction)}`,
        html: `<p>A new contact has been created at <a href="https:\/\/5e.no/${
          transaction.slug.id
        }">https:\/\/5e.no/${
          transaction.slug.id
        }</a> with the following details:</p><pre>${JSON.stringify(
          transaction,
          null,
          2
        )}</pre>`,
      });

      console.log("Message sent: %s", mail.messageId);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
    }
  }

  return transaction;
}
