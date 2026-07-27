import type { ReactNode } from "react";


export interface DropdownItem {

  label: string;

  value?: string;

  icon?: ReactNode;

  disabled?: boolean;

  onClick?: () => void;

}



export interface DropdownProps {

  trigger:
    | ReactNode
    | ((isOpen: boolean) => ReactNode);


  items: DropdownItem[];


  align?: "left" | "right";

}