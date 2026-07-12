import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

const CopyButton = ({ value }: { value: string }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);

    setIsCopied(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      variant={"outline"}
      size={"icon-xs"}
      className=""
      onClick={() => copyToClipboard(value)}
    >
      {isCopied ? (
        <CheckIcon size={16} className="text-green-500" />
      ) : (
        <CopyIcon size={16} />
      )}
    </Button>
  );
};

export default CopyButton;
