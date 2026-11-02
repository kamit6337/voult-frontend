import Metadata from "@/lib/Metadata";
import { GalleryVerticalEnd } from "lucide-react";

const VerifyOtp = () => {
  return (
    <>
      <Metadata title="Voult : Verify" description="VerifyOTP page of voult" />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        {/* <LoginForm /> */}
      </div>
    </>
  );
};

export default VerifyOtp;
