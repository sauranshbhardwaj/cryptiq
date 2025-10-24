import cn from "../utils/utils";

function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default BentoGrid;
