import cn from "../../utils/utils";

const Card = ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-card text-card-foreground rounded-lg border shadow-sm",
      className,
    )}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl leading-none font-semibold tracking-tight",
      className,
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
