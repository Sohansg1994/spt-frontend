import { ReactNode } from "react";

type ComponentHeaderLayoutProps = {
  title: string;
  actions?: ReactNode[];
  children?: ReactNode;
};

export function ComponentHeaderLayout({
  title,
  actions = [],
  children,
}: ComponentHeaderLayoutProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="capitalize text-xl font-medium text">{title}</p>
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between flex-wrap gap-x-5">
        {children}
      </div>
    </div>
  );
}
