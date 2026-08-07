import logo from "@/assets/images/logo2.png";

interface BrandProps {
  collapsed?: boolean;
}

const Brand = ({ collapsed = false }: BrandProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="SIIV Innovations"
        className="h-25  w-25 object-contain"
      />

      {!collapsed && (
        <div>
          <h1 className="text-xl font-serif tracking-wide text-white">
            SIIV Invoice
          </h1>

          <p className="text-sm text-slate-400">
            Management System
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Version 1.0.0
          </p>
        </div>
      )}
    </div>
  );
};

export default Brand;