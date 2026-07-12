import { z } from "zod";

const urlSchema = z.url();

export function isValidUrl(value: string) {
  return urlSchema.safeParse(value).success;
}
