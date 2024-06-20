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
import createRedirect from "@/actions/createRedirect";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { addItemToLocalStorage } from "@/lib/localstorage";

const formSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
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
        "Slug must only contain alphanumeric characters (letters and numbers) and dashes.",
    })
    .refine(
      (slug) => {
        // TODO: Check if slug is already taken.
        return true;
      },
      {
        message: "Slug is already taken.",
      }
    )
    .optional()
    .or(z.literal("")),
});

export function UrlForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      slug: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);

    const transaction = await createRedirect({
      url: values.url,
      slugId: values.slug,
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
      addItemToLocalStorage(transaction.redirect);
      toast.success("Link created successfully.");
    }

    setPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                This will be the URL that your link will redirect to.
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
