import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { BASE_URL, postReq } from "@/config/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInForm, type SignInFormType } from "./zodSchema";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, replace, useNavigate } from "react-router-dom";

export function LoginForm({}) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormType) => {
    try {
      await postReq("/auth/sign-in", {
        email: data.email,
        password: data.password,
      });

      toast.success("Login Successfully");
      navigate("/", { replace: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Issue in login";
      toast.error(msg);
    }
  };

  const openGoogleOauth = () => {
    const serverUrl = `${BASE_URL}/auth/google`;
    window.location.href = serverUrl;
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign In page of Voult</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={openGoogleOauth}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email", {
                    required: true,
                  })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email?.message && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <p className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    {...register("password", {
                      required: true,
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="xxxxxxx"
                  />
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
                {errors.password?.message && (
                  <p className="pl-2 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                <Button disabled={isSubmitting} type="submit">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
