import {
  useEffect,
  useMemo,
  type ReactNode,
} from "react";


interface DialogProps {
  open: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;

  footer?: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";
}



function Dialog({
  open,
  title,
  children,
  onClose,
  footer,
  size = "md",
}: DialogProps) {


  useEffect(() => {

    if (!open) return;


    document.body.style.overflow =
      "hidden";


    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      if (event.key === "Escape") {

        onClose();

      }

    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };


  }, [
    open,
    onClose,
  ]);



  const maxWidth =
    useMemo(() => {

      switch (size) {

        case "sm":
          return "max-w-md";


        case "lg":
          return "max-w-4xl";


        case "xl":
          return "max-w-6xl";


        default:
          return "max-w-2xl";

      }

    }, [size]);



  if (!open) return null;



  return (

    <div

      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"

      onClick={onClose}

    >

      <div

        className={`flex max-h-[90vh] w-full ${maxWidth} flex-col rounded-xl bg-white shadow-xl`}

        onClick={(event) =>
          event.stopPropagation()
        }

      >

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-lg font-semibold">

            {title}

          </h2>


          <button

            onClick={onClose}

            className="text-2xl text-slate-500 transition-colors hover:text-slate-800"

          >

            ×

          </button>


        </div>



        <div className="flex-1 overflow-y-auto p-6">

          {children}

        </div>



        {footer && (

          <div className="border-t px-6 py-4">

            {footer}

          </div>

        )}


      </div>

    </div>

  );

}


export default Dialog;