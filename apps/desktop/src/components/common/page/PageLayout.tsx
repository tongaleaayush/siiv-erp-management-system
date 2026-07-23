import type { ReactNode } from "react";

import  Breadcrumb  from "./Breadcrumb";
import  PageHeader  from "./PageHeader";

interface PageLayoutProps {
  title: string;
  description?: string;
  breadcrumb?: {
    label: string;
  }[];
  actions?: ReactNode;
  children: ReactNode;
}

const PageLayout = ({
  title,
  description,
  breadcrumb,
  actions,
  children,
}: PageLayoutProps) => {
  return (
    <div className="w-full px-6 py-5">
      {breadcrumb && (
        <Breadcrumb items={breadcrumb} />
      )}

      <PageHeader
        title={title}
        description={description}
        actions={actions}
      />

      <div>{children}</div>
    </div>
  );
};

export default PageLayout;