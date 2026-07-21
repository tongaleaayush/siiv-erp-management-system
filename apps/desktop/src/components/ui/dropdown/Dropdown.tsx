import { useEffect, 
         useRef, 
         useState } from "react";

import DropdownItem from "./DropdownItem";
import type { DropdownProps } from "./types";

const Dropdown = ({ trigger, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
  const handleClickOutside = (
    event: MouseEvent
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target as Node
      )
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  return (
    <div
  ref={dropdownRef}
  className="relative inline-block"
>
      <div
        onClick={toggleDropdown}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          {items.map((item) => (
  <DropdownItem
    key={item.label}
    item={{
      ...item,
      onClick: () => {
        item.onClick?.();
        setIsOpen(false);
      },
    }}
  />
))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;