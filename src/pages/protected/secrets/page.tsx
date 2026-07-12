import CreateSecret from "./CreateSecret";
import { Separator } from "@/components/ui/separator";
import Secrets from "./Secrets";
import QuerySuspenseBoundary from "@/provider/QuerySuspenseBoundary";

const SecretPage = () => {
  return (
    <section className="space-y-4">
      <div className="space-y-2 flex flex-col">
        <div className="self-end">
          <CreateSecret />
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
