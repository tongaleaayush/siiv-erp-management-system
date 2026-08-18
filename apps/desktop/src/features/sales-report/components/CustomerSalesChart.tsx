import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";



const CustomerSalesChart = () => {


  const data = [

    {
      name: "ABC Industries",
      value: 45000,
    },

    {
      name: "XYZ Traders",
      value: 30000,
    },

    {
      name: "SIIV Retail",
      value: 15000,
    },

    {
      name: "Other Customers",
      value: 10000,
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

        Customer Sales Distribution

      </h2>



      <ResponsiveContainer

        width="100%"

        height={300}

      >

        <PieChart

  margin={{
    top: 20,
    right: 20,
    bottom: 40,
    left: 20,
  }}

>


          <Pie
    

            data={data}

            dataKey="value"

            nameKey="name"

            cx="50%"

            cy="45%"

            outerRadius={85}

            label

          >

           {
  data.map((_, index) => (

    <Cell

      key={index}

      fill={
        [
          "#2563EB",
          "#16A34A",
          "#F59E0B",
          "#DC2626",
        ][index]
      }

    />

  ))
}


          </Pie>



          <Tooltip />



          <Legend

  formatter={(value) => (

    <span className="text-slate-600">

      {value}

    </span>

  )}

/>


        </PieChart>


      </ResponsiveContainer>


    </div>

  );

};


export default CustomerSalesChart;