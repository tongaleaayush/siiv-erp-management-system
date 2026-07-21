import type { DropdownItem as DropdownItemType } from "./types";

interface DropdownItemProps {
  item: DropdownItemType;
}

const DropdownItem = ({ item }: DropdownItemProps) => {
  return (
    <button
      type="button"
      disabled={item.disabled}
      onClick={item.onClick}
      className={`
        flex w-full items-center gap-2 px-4 py-2 text-left text-sm
        hover:bg-gray-100
        disabled:cursor-not-allowed
        disabled:opacity-50
      `}
    >
      {item.icon}

      <span>{item.label}</span>
    </button>
  );
};

export default DropdownItem;