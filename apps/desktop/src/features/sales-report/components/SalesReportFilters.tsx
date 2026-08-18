const SalesReportFilters = () => {


  return (

    <div

      className="
        flex
        flex-col
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        md:flex-row
        md:items-center
        md:justify-between
      "

    >


      <div

        className="
          flex
          flex-col
          gap-3
          sm:flex-row
        "

      >


        <select

          className="
            h-10
            rounded-lg
            border
            border-slate-300
            bg-white
            px-4
            text-sm
            text-slate-700
            outline-none
            focus:border-blue-500
          "

        >

          <option>

            This Month

          </option>


          <option>

            Today

          </option>


          <option>

            This Week

          </option>


          <option>

            This Year

          </option>


        </select>




        <select

          className="
            h-10
            rounded-lg
            border
            border-slate-300
            bg-white
            px-4
            text-sm
            text-slate-700
            outline-none
            focus:border-blue-500
          "

        >

          <option>

            All Status

          </option>


          <option>

            Completed

          </option>


          <option>

            Cancelled

          </option>


        </select>


      </div>




      <div

        className="
          flex
          gap-3
        "

      >


        <button

          className="
            rounded-lg
            border
            border-slate-300
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
          "

        >

          ↻ Refresh

        </button>




        <button

          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "

        >

          Export Report

        </button>


      </div>


    </div>

  );

};


export default SalesReportFilters;