import CreateSecret from "./CreateSecret";
import { Separator } from "@/components/ui/separator";
import Secrets from "./Secrets";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SecretPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="space-y-4">
      <div className="space-y-2 flex flex-col">
        <div className="self-end">
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button>Create Secret</Button>
            </AlertDialogTrigger>
            <CreateSecret
              queryKey={["user", "secrets"]}
              onClose={() => setIsOpen(false)}
            />
          </AlertDialog>
        </div>
        <Separator />
      </div>
      <QuerySuspenseBoundary>
        <Secrets />
      </QuerySuspenseBoundary>
    </section>
  );
};

export default SecretPage;
