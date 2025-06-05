import { Label } from "./Label";

export type LabelsProps = {
  labels: Label[];
  labelNames: string[];
  className?: string;
  connection: string;
  variant: 'light' | 'dark'
};
