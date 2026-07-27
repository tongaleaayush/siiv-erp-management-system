import { storage } from "@/utils/storage/storage";


const BATCH_COUNTER_KEY =
  "batch_counter";



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
    (
      date.getTime() -
      firstDayOfYear.getTime()
    ) / 86400000;



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



    const year =
      String(
        today.getFullYear()
      ).slice(-2);



    const week =
      String(
        getWeekNumber(today)
      )
      .padStart(2, "0");



    const counters =
      storage.get<
        Record<string, number>
      >(
        BATCH_COUNTER_KEY,
        {}
      );



    if (!counters[year]) {

      counters[year] = 1;

    }
    else {

      counters[year]++;

    }



    storage.set(
      BATCH_COUNTER_KEY,
      counters
    );



    const serial =
      String(
        counters[year]
      )
      .padStart(4, "0");



    return (
      `${year}${week}${serial}`
    );


};