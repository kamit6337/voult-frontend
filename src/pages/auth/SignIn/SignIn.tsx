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
        <LoginForm />
      </div>
    </>
  );
};

export default SignIn;
