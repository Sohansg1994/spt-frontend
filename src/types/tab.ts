import { ReactNode } from "react";

export type Tab = {
  name: string;
  component: React.ReactNode;
  icon?: ReactNode;
};
