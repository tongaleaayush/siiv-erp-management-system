import { useEffect, useState } from "react";


interface BatchDetailsDialogProps {

  open: boolean;

  onClose: () => void;


  batchNumber: string;

  productCode: string;

  productName: string;


  dispatchedQuantity: number;

  serialRange: string;

}



const BatchDetailsDialog = ({

  open,

  onClose,

  batchNumber,

  productCode,

  productName,

  dispatchedQuantity,

  serialRange,

}: BatchDetailsDialogProps) => {



  const [
    show,
    setShow,
  ] = useState(false);




 useEffect(() => {

  let timer: ReturnType<typeof setTimeout>;


  if (open) {


    timer = setTimeout(() => {

      setShow(true);

    }, 10);


  } else {


    timer = setTimeout(() => {

      setShow(false);

    }, 0);


  }



  return () => {

    clearTimeout(timer);

  };


}, [open]);



  if (!open && !show) {

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
        bg-black/40
        backdrop-blur-sm
        transition-opacity
        duration-300

        ${
          show
            ? "opacity-100"
            : "opacity-0"
        }
      `}

      onClick={onClose}

    >



      <div

        className={`
          w-full
          max-w-3xl
          rounded-xl
          bg-white
          shadow-2xl
          transition-all
          duration-300
          ease-out

          ${
            show
              ? "translate-y-0 scale-100"
              : "translate-y-4 scale-95"
          }

        `}

        onClick={(e) =>
          e.stopPropagation()
        }

      >



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

          <h2 className="text-lg font-semibold text-slate-900">

            Dispatch Details

          </h2>



          <button

            onClick={onClose}

            className="
              text-2xl
              text-slate-400
              transition
              hover:text-slate-700
            "

          >

            ×

          </button>


        </div>





        <div className="grid grid-cols-2 gap-6 px-6 py-6">


          <div>

            <p className="text-sm text-slate-500">

              Batch Number

            </p>


            <p className="mt-1 font-semibold">

              {batchNumber}

            </p>


          </div>





          <div>

            <p className="text-sm text-slate-500">

              Product Code

            </p>


            <p className="mt-1 font-semibold">

              {productCode}

            </p>


          </div>





          <div className="col-span-2">


            <p className="text-sm text-slate-500">

              Product Name

            </p>


            <p className="mt-1 font-semibold">

              {productName}

            </p>


          </div>





          <div>


            <p className="text-sm text-slate-500">

              Dispatched Quantity

            </p>


            <p className="mt-1 font-semibold">

              {dispatchedQuantity}

            </p>


          </div>





          <div>


            <p className="text-sm text-slate-500">

              Status

            </p>


            <span
              className="
                mt-1
                inline-block
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
              "
            >

              Dispatched

            </span>


          </div>





          <div className="col-span-2">


            <p className="text-sm text-slate-500">

              Serial Range

            </p>



            <div
              className="
                mt-2
                rounded-lg
                bg-slate-100
                px-4
                py-3
                font-medium
              "
            >

              {serialRange}

            </div>


          </div>



        </div>





        <div
          className="
            flex
            justify-end
            border-t
            px-6
            py-4
          "
        >


          <button

            onClick={onClose}

            className="
              rounded-lg
              bg-blue-600
              px-6
              py-2
              font-medium
              text-white
              transition
              hover:bg-blue-700
              active:scale-95
            "

          >

            Close

          </button>


        </div>



      </div>


    </div>

  );

};



export default BatchDetailsDialog;