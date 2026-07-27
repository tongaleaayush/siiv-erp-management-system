import { useState } from "react";

import type {
  SerialStockRow,
} from "../services/serialStock.service";

import BatchDetailsDialog from "./BatchDetailsDialog";



interface SerialStockTableProps {

  data: SerialStockRow[];

}




const SerialStockTable = ({
  data,
}: SerialStockTableProps) => {


  const [
    selectedBatch,
    setSelectedBatch,
  ] = useState<SerialStockRow | null>(null);



  return (

    <>

      <div className="mt-8">


        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Stock Dispatch History
        </h2>



        <div className="overflow-hidden rounded-lg border border-slate-200">


          <table className="w-full text-sm">


            <thead className="bg-slate-50">


              <tr>


                <th className="px-5 py-3 text-left font-medium text-slate-700">
                  Batch No
                </th>


                <th className="px-5 py-3 text-left font-medium text-slate-700">
                  Product Code
                </th>


                <th className="px-5 py-3 text-left font-medium text-slate-700">
                  Product
                </th>


                <th className="px-5 py-3 text-left font-medium text-slate-700">
                  Dispatched Qty
                </th>


                <th className="px-5 py-3 text-left font-medium text-slate-700">
                  Serial Range
                </th>


                <th className="px-5 py-3 text-left font-medium text-slate-700">
                  Status
                </th>


              </tr>


            </thead>



            <tbody>


              {data.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="px-5 py-6 text-center text-slate-500"
                  >
                    No dispatch records found
                  </td>

                </tr>


              ) : (


                data.map((row) => (

                  <tr

                    key={`${row.productCode}-${row.batchNumber}`}

                    className="border-t"

                  >



                    <td className="px-5 py-4">


                      <button

                        className="
                          font-medium
                          text-blue-600
                          hover:underline
                        "


                        onClick={() =>
                          setSelectedBatch(row)
                        }


                      >

                        {row.batchNumber}

                      </button>


                    </td>




                    <td className="px-5 py-4">

                      {row.productCode}

                    </td>




                    <td className="px-5 py-4">

                      {row.productName}

                    </td>




                    <td className="px-5 py-4">

                      {row.dispatchedQuantity}

                    </td>




                    <td className="px-5 py-4">

                      {row.serialRange}

                    </td>




                    <td className="px-5 py-4">


                      <span

                        className="
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


                    </td>



                  </tr>


                ))

              )}


            </tbody>


          </table>


        </div>


      </div>





      {selectedBatch && (


        <BatchDetailsDialog


          open={true}



          onClose={() =>
            setSelectedBatch(null)
          }



          batchNumber={
            selectedBatch.batchNumber
          }



          productCode={
            selectedBatch.productCode
          }



          productName={
            selectedBatch.productName
          }



          dispatchedQuantity={
  selectedBatch.dispatchedQuantity
}



          serialRange={
            selectedBatch.serialRange
          }



        />


      )}



    </>

  );

};



export default SerialStockTable;