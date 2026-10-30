import { useSearchParams } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./login-form";
import Metadata from "@/lib/Metadata";
import { useEffect } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const errMsg = useSearchParams()[0].get("errMsg");

  useEffect(() => {
    if (errMsg) {
      toast.error(errMsg);
    }
  }, []);

  return (
    <>
      <Metadata title="Voult : Sign In" description="SignIn page of voult" />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </>
  );
};

export default SignIn;
