import clsx from "clsx";
import TS from "@/assets/ts.svg";
import ReactLogo from "@/assets/react.svg";
import AWSLogo from "@/assets/aws.svg";
import SQLLogo from "@/assets/sql.svg";
import NodeJSLogo from "@/assets/node.svg";
import VueJSLogo from "@/assets/vue.svg";
import DockerLogo from "@/assets/docker.svg";
import LambdaLogo from "@/assets/lambda.svg";
import PDF from "@/assets/pdf.svg";
import LI from "@/assets/li.svg";
import GH from "@/assets/github.svg";
import StackOverflowLogo from "@/assets/stackoverflow.svg";
import { Icon } from "./Icon";

const logos = {
  TS,
  React: ReactLogo,
  AWS: AWSLogo,
  SQL: SQLLogo,
  Node: NodeJSLogo,
  Docker: DockerLogo,
  Lambda: LambdaLogo,
  Vue: VueJSLogo,
  PDF: PDF,
  SO: StackOverflowLogo,
  GitHub: GH,
  LI: LI,
  User: () => <Icon icon="FaUser" />,
} as any;

export type BulletsServerProps = {
  className?: string;
  data: {}[];
};

export const BulletsServer = (props: BulletsServerProps) => {
  const { className, data } = props;
  return (
    <div className="flex flex-row flex-wrap text-white flex-grow-0 items-center justify-center gap-1">
      {data.map((entry: any) => {
        const Logo = logos[entry.logo] || "div";
        return (
          <div
            className={clsx(
              "bullet p-2 bg-black/20 flex gap-1 text-2xl items-center cursor-pointer",
              {},
              className
            )}
          >
            <Logo />
            {entry.text}
          </div>
        );
      })}
    </div>
  );
};
