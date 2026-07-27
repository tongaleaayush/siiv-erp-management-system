import {
  useEffect,
  useRef,
  useState,
} from "react";

import DropdownItem from "./DropdownItem";

import type { DropdownProps } from "./types";


const Dropdown = ({
  trigger,
  items,
}: DropdownProps) => {


  const [
    isOpen,
    setIsOpen,
  ] = useState(false);



  const dropdownRef =
    useRef<HTMLDivElement>(null);



  const toggleDropdown = () => {

    setIsOpen(
      (prev) => !prev
    );

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



  const triggerContent =
    typeof trigger === "function"
      ? trigger(isOpen)
      : trigger;



  return (

    <div

      ref={dropdownRef}

      className="relative inline-block"

    >


      <div

        onClick={
          toggleDropdown
        }

        className="cursor-pointer"

      >

        {triggerContent}

      </div>



      <div

        className={`

          absolute right-0 z-50 mt-2 min-w-48 rounded-lg border border-gray-200 bg-white shadow-lg

          transition-all duration-200 ease-out origin-top-right

          ${
            isOpen

              ? "opacity-100 scale-100 visible"

              : "opacity-0 scale-95 invisible pointer-events-none"

          }

        `}

      >


        {items.map(

          (item) => (

            <DropdownItem

              key={
                item.label
              }

              item={{

                ...item,

                onClick: () => {

                  item.onClick?.();

                  setIsOpen(false);

                },

              }}

            />

          )

        )}


      </div>


    </div>

  );

};


export default Dropdown;