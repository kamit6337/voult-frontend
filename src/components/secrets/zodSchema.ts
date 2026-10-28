import z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, "Name is Required"),
  value: z.string().min(3, "Value is Required"),
  favourite: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>;
