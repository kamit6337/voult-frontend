import z from "zod";

export const signInForm = z.object({
  email: z.email(),
  password: z.string().min(8, "Pasword must be atleast 8 character"),
});

export type SignInFormType = z.infer<typeof signInForm>;
