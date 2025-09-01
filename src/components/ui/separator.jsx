import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const Separator = React.forwardRef(
  ({ className = "", orientation = "horizontal", decorative = true, ...props }, ref) => {
    // base classes depend on orientation
    const baseClasses = `shrink-0 bg-border ${
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"
    }`;

    // merge with user-supplied className if provided
    const combinedClasses = `${baseClasses}${className ? ` ${className}` : ""}`;

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={combinedClasses}
        {...props}
      />
    );
  }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };