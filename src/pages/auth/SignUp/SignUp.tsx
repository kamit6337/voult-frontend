import Metadata from "@/lib/Metadata";
import { GalleryVerticalEnd } from "lucide-react";
import SignUpForm from "./signup-form";

const SignUp = () => {
  return (
    <>
      <Metadata title="Voult : Sign Up" description="SignUp page of voult" />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
