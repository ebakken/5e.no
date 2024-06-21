import { z } from "zod";
import validateSlug from "@/actions/validateSlug";
import debounce from "awesome-debounce-promise";

const debouncedValidateSlug = debounce(validateSlug, 300);

const slugSchema = z
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
  .or(z.literal(""));

export const redirectFormSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  slug: slugSchema,
});

export const contactFormSchema = z.object({
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
  slug: slugSchema,
});
