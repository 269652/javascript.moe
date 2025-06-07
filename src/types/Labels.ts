import { Label } from "./Label";

export type LabelsProps = {
  labels: Label[];
  labelNames: string[];
  className?: string;
  searchParams: { c?: string; ui?: string };
};
