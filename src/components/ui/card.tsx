import { ReactNode } from "react";
import {
  Card as CardBase,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card-base";
import React from "react";
import { cn } from "@/lib/utils";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardHeader?: {
    title?: string;
    description?: string;
    children?: ReactNode;
    className?: string;
  };
  cardContent?: ReactNode;
  cardFooter?: ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ className, cardContent, cardFooter, cardHeader, ...props }, ref) => {
    return (
      <CardBase ref={ref} className={cn(className)} {...props}>
        {cardHeader && (
          <CardHeader className={cardHeader.className}>
            {cardHeader.title && <CardTitle>{cardHeader.title}</CardTitle>}
            {cardHeader.description && (
              <CardDescription>{cardHeader.description}</CardDescription>
            )}
            {cardHeader.children}
          </CardHeader>
        )}
        {cardContent && <CardContent>{cardContent}</CardContent>}
        {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
      </CardBase>
    );
  }
);

Card.displayName = "Card";

export default Card;
