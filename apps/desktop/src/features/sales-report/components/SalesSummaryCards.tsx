const SalesSummaryCards = () => {

  const cards = [

  {
    title: "Total Sales",
    value: "₹ 5,00,000",
  },

  {
    title: "Total Invoices",
    value: "120",
  },

  {
    title: "Completed Sales",
    value: "100",
  },

  {
    title: "Cancelled Sales",
    value: "10",
  },

];


  return (

    <div

      className="
  grid
  grid-cols-1
  gap-5
  sm:grid-cols-2
  xl:grid-cols-4
"

    >

      {
        cards.map((card) => (

          <div

            key={card.title}

            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
            "

          >

            <p

              className="
                text-sm
                text-slate-500
              "

            >

              {card.title}

            </p>


            <h2

              className="
                mt-2
                text-2xl
                font-bold
                text-slate-800
              "

            >

              {card.value}

            </h2>


          </div>

        ))
      }


    </div>

  );

};


export default SalesSummaryCards;