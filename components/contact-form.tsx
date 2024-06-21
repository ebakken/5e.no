"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { addItemToLocalStorage } from "@/lib/localstorage";
import validateSlug from "@/actions/validateSlug";
import debounce from "awesome-debounce-promise";
import createContact from "@/actions/createContact";
import { Textarea } from "./ui/textarea";

const debouncedValidateSlug = debounce(validateSlug, 300);

const formSchema = z.object({
  name: z
    .string({
      message: "Please enter a valid name.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z
    .string({
      message: "Please enter a valid phone number.",
    })
    .regex(/^[0-9]+$/, {
      message: "Phone number must only contain numbers.",
    })
    .min(8, {
      message: "Phone number must be at least 8 characters.",
    })
    .max(8, {
      message: "Message must be at most 8 characters.",
    }),
  description: z
    .string({
      message: "Please enter a valid description.",
    })
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(200, {
      message: "Description must be at most 50 characters.",
    })
    .optional()
    .or(z.literal("")),
  url: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  message: z
    .string({
      message: "Please enter a valid message.",
    })
    .max(200, {
      message: "Message must be at most 200 characters.",
    })
    .optional()
    .or(z.literal("")),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .max(50, {
      message: "Slug must be at most 50 characters.",
    })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message:
        "Slug must only contain alphanumeric characters (letters and numbers), underscores and dashes.",
    })
    .refine(async (slug) => await debouncedValidateSlug(slug), {
      message: "Slug is already taken.",
    })
    .optional()
    .or(z.literal("")),
});

export function ContactForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      url: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);

    const transaction = await createContact({
      url: values.url,
      slugId: values.slug,
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    });

    if ("error" in transaction) {
      if (
        transaction.error ===
        `duplicate key value violates unique constraint "slugs_pkey"`
      ) {
        form.setError("slug", {
          type: "manual",
          message: "Slug is already taken.",
        });
      } else {
        console.error(transaction.error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      addItemToLocalStorage(transaction.contact);
      toast.success("Link created successfully.");
    }

    setPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    placeholder="custom-url-slug"
                    className="pl-[6.25rem]"
                    {...field}
                  />
                  <span className="absolute pl-2 pt-[0.625rem] text-muted-foreground/50 text-sm pointer-events-none">
                    https://5e.no/
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                This will be the custom URL for your link (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ola Nordmann" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="999 99 999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="ola@exmaple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="exmaple.com" {...field} />
              </FormControl>
              <FormDescription>
                URL to your website, linkedin profile or other social media
                (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Hi! I'm Ola..." {...field} />
              </FormControl>
              <FormDescription>
                A short description to your contact card (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
