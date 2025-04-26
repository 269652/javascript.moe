import { PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren<{}>;
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-[100vw] h-[100lvh] flex items-center justify-center">
      {children}
    </div>
  );
};
