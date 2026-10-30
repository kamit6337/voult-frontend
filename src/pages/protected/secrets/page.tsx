import { Separator } from "@/components/ui/separator";
import Secrets from "./Secrets";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateSecret from "@/components/secrets/CreateSecret";
import Metadata from "@/lib/Metadata";

const SecretPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Metadata title="Voult | Secrets" description="Secrets page of Voult" />

      <section className="space-y-4">
        <div className="space-y-2 flex flex-col">
          <div className="self-end">
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                <Button>Create Secret</Button>
              </AlertDialogTrigger>
              <CreateSecret onClose={() => setIsOpen(false)} />
            </AlertDialog>
          </div>
          <Separator />
        </div>
        <QuerySuspenseBoundary>
          <Secrets />
        </QuerySuspenseBoundary>
      </section>
    </>
  );
};

export default SecretPage;
