import { z } from "zod";
import validateSlug from "@/actions/validateSlug";
import debounce from "awesome-debounce-promise";

const debouncedValidateSlug = debounce(validateSlug, 300);

export const redirectFormSchema = z.object({
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
        "Slug must only contain alphanumeric characters (letters and numbers), underscores and dashes.",
    })
    .refine(async (slug) => await debouncedValidateSlug(slug), {
      message: "Slug is already taken.",
    })
    .optional()
    .or(z.literal("")),
});
