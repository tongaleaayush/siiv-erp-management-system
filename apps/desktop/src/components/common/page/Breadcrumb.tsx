import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="mb-2 flex items-center text-sm text-slate-500">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center"
        >
          <span
            className={
              index === items.length - 1
                ? "font-medium text-slate-900"
                : ""
            }
          >
            {item.label}
          </span>

          {index < items.length - 1 && (
            <ChevronRight className="mx-2 h-4 w-4" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;