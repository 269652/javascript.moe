import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Panel = ({
  children,
  scrollDir,
  stretch,
  hasBottomBorder,
  hasBottomPadding,
  className,
  variant,
}: PropsWithChildren<{
  scrollDir: "x" | "y";
  stretch: "grow" | "shrink";
  hasBottomBorder?: boolean;
  hasBottomPadding?: boolean;
  className?: string;
  variant: "light" | "dark";
}>) => {
  return (
    <div
      className={clsx(
        "flex p-2  rounded-t-md  mx-[1px]",
        {
          "shadow-[0_0px_2px_1px_black] bg-black/30": variant === "dark",
          " bg-white/15": variant === "light",
          "overflow-x-auto": scrollDir === "x",
          "overflow-y-auto flex-wrap basis-1/2 justify-start max-h-[98px] gap-1 ":
            scrollDir === "y",
          " flex-1  max-w-fit": stretch === "grow",
          shrink: stretch === "shrink",
          "border-b-2 border-gray-500mr-auto": hasBottomBorder,
          "pb-0": !hasBottomPadding,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
