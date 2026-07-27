import {
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import { createPortal } from "react-dom";


type TooltipProps = {
  children: ReactNode;

  content: string;
};



const Tooltip = ({
  children,
  content,
}: TooltipProps) => {


  const [
    isVisible,
    setIsVisible,
  ] = useState(false);



  const [
    position,
    setPosition,
  ] = useState({

    x: 0,

    y: 0,

  });



  const handleMouseEnter = (
    event: MouseEvent<HTMLDivElement>
  ) => {


    const rect =
      event.currentTarget
        .getBoundingClientRect();



    setPosition({

      x:
        rect.right + 12,

      y:
        rect.top +
        rect.height / 2,

    });



    setIsVisible(true);

  };



  const handleMouseLeave = () => {

    setIsVisible(false);

  };



  return (

    <>

      <div

        onMouseEnter={
          handleMouseEnter
        }

        onMouseLeave={
          handleMouseLeave
        }

      >

        {children}

      </div>



      {isVisible &&

        createPortal(

          <div

            className="
              fixed
              z-50
              rounded-lg
              bg-slate-900
              px-3
              py-2
              text-sm
              font-medium
              text-white
              shadow-lg
              pointer-events-none
              whitespace-nowrap
            "

            style={{

              left:
                position.x,

              top:
                position.y,

              transform:
                "translateY(-50%)",

            }}

          >

            {content}

          </div>,

          document.body

        )

      }

    </>

  );

};


export default Tooltip;