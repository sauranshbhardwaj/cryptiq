import cn from "../utils/utils";

function BentoGridItem({ className, title, description, header, url }) {
  return (
    <div
      className={cn(
        "group/bento flex cursor-pointer flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-linear-45 from-black to-[#1c1c1c] p-4 shadow-none transition duration-200 hover:shadow-xl",
        className,
      )}
      onClick={() => {
        if (url) {
          window.open(url, "_blank");
        }
      }}
    >
      <div className="flex flex-row">
        {header}
        <div className="ml-4 font-sans text-2xl font-bold text-neutral-200">
          {title.substr(0, 70) + (title.length > 70 ? "\u2026" : "")}
        </div>
      </div>
      <div className="font-sans text-xs font-normal text-neutral-300">
        {description.substr(0, 280) +
          (description.length > 280 ? "\u2026" : "")}
      </div>
    </div>
  );
}

export default BentoGridItem;
