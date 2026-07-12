import { type FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";

const AppError = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log("ERROR FROM APP ERROR", error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>

      <p className="text-muted-foreground text-center max-w-md">
        Something went wrong. Please try again later
      </p>

      <Button onClick={resetErrorBoundary}>Try Again</Button>
    </div>
  );
};

export default AppError;
