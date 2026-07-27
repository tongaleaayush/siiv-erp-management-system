let batchCounter: {
  [year: string]: number;
} = {};



const getWeekNumber = (
  date: Date
): number => {

  const firstDayOfYear =
    new Date(
      date.getFullYear(),
      0,
      1
    );


  const pastDaysOfYear =
    (date.getTime() -
      firstDayOfYear.getTime()) /
    86400000;


  return Math.ceil(
    (
      pastDaysOfYear +
      firstDayOfYear.getDay() +
      1
    ) / 7
  );

};



export const generateBatchNumber =
  (): string => {


    const today =
      new Date();


    const fullYear =
      today.getFullYear();


    const year =
      String(fullYear)
        .slice(-2);



    const week =
      String(
        getWeekNumber(today)
      ).padStart(2, "0");



    if (
      !batchCounter[year]
    ) {

      batchCounter[year] = 1;

    } else {

      batchCounter[year]++;

    }



    const serial =
      String(
        batchCounter[year]
      )
      .padStart(4, "0");



    return (
      `${year}${week}${serial}`
    );

};