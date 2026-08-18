import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const SalesTrendChart = () => {


  const data = [

    {
      month: "Jan",
      sales: 45000,
    },

    {
      month: "Feb",
      sales: 65000,
    },

    {
      month: "Mar",
      sales: 55000,
    },

    {
      month: "Apr",
      sales: 90000,
    },

    {
      month: "May",
      sales: 75000,
    },

    {
      month: "Jun",
      sales: 120000,
    },

  ];



  return (

    <div

      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "

    >

      <h2

        className="
          mb-4
          text-lg
          font-semibold
          text-slate-800
        "

      >

        Sales Trend

      </h2>



      <ResponsiveContainer

        width="100%"

        height={300}

      >

        <LineChart data={data}>


          <CartesianGrid />



          <XAxis

            dataKey="month"

          />



          <YAxis />



          <Tooltip />



          <Line

            type="monotone"

            dataKey="sales"

            strokeWidth={3}

          />


        </LineChart>


      </ResponsiveContainer>


    </div>

  );

};



export default SalesTrendChart;