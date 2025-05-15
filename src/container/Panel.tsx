import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Panel = ({
  children,
  scrollDir,
  stretch,
  hasBottomBorder,
  hasBottomPadding,
  className,
}: PropsWithChildren<{
  scrollDir: "x" | "y";
  stretch: "grow" | "shrink";
  hasBottomBorder?: boolean;
  hasBottomPadding?: boolean;
  className?: string;
}>) => {
  return (
    <div
      className={clsx(
        "flex p-2 bg-black/30 rounded-t-md shadow-[0_0px_2px_1px_black] mx-[1px]",
        {
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
