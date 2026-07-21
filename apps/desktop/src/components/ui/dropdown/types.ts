import { ReactNode } from "react";

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
}