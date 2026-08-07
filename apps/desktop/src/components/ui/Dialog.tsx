import {
  useEffect,
  useMemo,
  useState,
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



  const [mounted, setMounted] = useState(false);

  const [animate, setAnimate] = useState(false);





  useEffect(() => {



    if (open) {



      setMounted(true);



      // Start animation after browser paints initial state

      const timer = setTimeout(() => {

        setAnimate(true);

      }, 20);



      document.body.style.overflow = "hidden";



      return () => {

        clearTimeout(timer);

      };



    }



    setAnimate(false);



    const timer = setTimeout(() => {

      setMounted(false);

    }, 250);



    document.body.style.overflow = "";



    return () => {

      clearTimeout(timer);

    };



  }, [open]);







  useEffect(() => {



    if (!open) return;



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



      window.removeEventListener(

        "keydown",

        handleKeyDown

      );



    };



  }, [

    open,

    onClose,

  ]);








  const maxWidth = useMemo(() => {



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








  if (!mounted) {

    return null;

  }








  return (



    <div



      className={`

        fixed

        inset-0

        z-50

        flex

        items-center

        justify-center

        bg-black/50

        backdrop-blur-sm

        p-4

        transition-opacity

        duration-200

        ease-out

        ${

          animate

            ? "opacity-100"

            : "opacity-0"

        }

      `}



      onClick={onClose}



    >






     <div
  className={`
    flex
    max-h-[90vh]
    w-full
    ${maxWidth}
    flex-col
    overflow-hidden
    rounded-xl
    bg-white
    shadow-2xl
    transition-all
    duration-300
    ease-out

          ${
  animate
    ? "translate-y-0 scale-100 opacity-100"
    : "translate-y-6 scale-95 opacity-0"
}

        `}



        onClick={(event) =>

          event.stopPropagation()

        }



      >






        {/* Header */}



        <div



          className="

            flex

            items-center

            justify-between

            border-b

            px-6

            py-4

          "



        >



          <h2



            className="

              text-lg

              font-semibold

              text-slate-900

            "



          >

            {title}



          </h2>






          <button



            onClick={onClose}



            className="

              text-2xl

              text-slate-400

              transition-all

              duration-200

              hover:scale-110

              hover:text-slate-800

            "



          >

            ×



          </button>



        </div>








        {/* Body */}



       <div
 className="
  max-h-[70vh]
  overflow-y-auto
  p-6
"
>



          {children}



        </div>








        {/* Footer */}



        {footer && (



          <div



            className="

              border-t

              px-6

              py-4

            "



          >



            {footer}



          </div>



        )}



      </div>

      
        
    </div>
              

          
  );
          
}



export default Dialog;