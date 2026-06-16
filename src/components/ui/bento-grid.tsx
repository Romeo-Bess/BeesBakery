import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-[22rem] sm:auto-rows-[18rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-lg hover:-translate-y-1 transition duration-300 p-6 bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between space-y-4 shadow-sm",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1.5 transition duration-300 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {icon}
          <div className="font-serif text-lg text-on-surface font-semibold">
            {title}
          </div>
        </div>
        <div className="font-sans text-xs text-on-surface-variant leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
