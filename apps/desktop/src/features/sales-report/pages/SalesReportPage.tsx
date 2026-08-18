import SalesSummaryCards from "../components/SalesSummaryCards";

import SalesTrendChart from "../components/SalesTrendChart";
import CustomerSalesChart from "../components/CustomerSalesChart";
import InvoiceStatusChart from "../components/InvoiceStatusChart";
import SalesReportFilters from "../components/SalesReportFilters";

const SalesReportPage = () => {


  return (

    <div

      className="
        space-y-6
      "

    >


      <div>


        <h1

          className="
            text-2xl
            font-bold
            text-slate-800
          "

        >

          Sales Report

        </h1>



        <p

          className="
            mt-1
            text-sm
            text-slate-500
          "

        >

          Analyze sales performance and revenue insights.

        </p>

<SalesReportFilters />
      </div>




      <SalesSummaryCards />



      <SalesTrendChart />




      <div

        className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-2
        "

      >


        <CustomerSalesChart />


        <InvoiceStatusChart />


      </div>



    </div>

  );

};



export default SalesReportPage;