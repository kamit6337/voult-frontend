import z from "zod";

export const signUpForm = z
  .object({
    firstName: z.string().min(3, "Must be atleast 3 letters"),
    lastName: z.string().min(3, "Must be atleast 3 letters"),
    email: z.email(),
    password: z.string().min(8, "Pasword must be atleast 8 character"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "Password do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormType = z.infer<typeof signUpForm>;
