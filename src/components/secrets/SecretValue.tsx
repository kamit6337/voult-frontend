import { isValidUrl } from "@/utils/isValidUrl";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";

const SecretValue = ({ value }: { value: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isValidUrl(value)) {
    return (
      <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger className="flex-1 flex justify-start">
          <div className="line-clamp-1">{value}</div>
        </PopoverTrigger>
        <PopoverContent align="center" className="min-w-3/4" asChild>
          <Button>
            <a href={value} target="_blank" onClick={() => setIsOpen(false)}>
              Click to Url
            </a>
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  return <p className="line-clamp-1">{value}</p>;
};

export default SecretValue;
