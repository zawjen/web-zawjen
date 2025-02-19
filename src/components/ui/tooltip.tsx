import { Button } from "@/components/ui/button";
import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip-base";
import { ReactNode } from "react";

export const Tooltip: React.FC<{ children: ReactNode; text: string }> = ({
  children,
  text,
}) => {
  return (
    <TooltipProvider>
      <TooltipBase>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  );
};
