interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "danger";
}

const Badge = ({
  children,
  variant = "success",
}: BadgeProps) => {
  const styles = {
    success:
      "bg-green-100 text-green-700",
    danger:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;