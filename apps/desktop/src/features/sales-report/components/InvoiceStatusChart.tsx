import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


const InvoiceStatusChart = () => {


  const data = [

  {
    name: "Completed",
    value: 80,
  },

  {
    name: "Cancelled",
    value: 20,
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

        Invoice Status Analysis

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
          cy="45%"

            data={data}

            dataKey="value"

            nameKey="name"

            innerRadius={55}

            outerRadius={85}

            label

          >

            {
  data.map((_, index) => (

    <Cell

      key={index}

      fill={
        [
  "#16A34A",
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


export default InvoiceStatusChart;