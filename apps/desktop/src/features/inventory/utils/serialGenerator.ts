import { storage } from "@/utils/storage/storage";


interface SerialCounter {

  [productId: string]: {

    [year: string]: number;

  };

}



const SERIAL_COUNTER_KEY =
  "serial_counter";



const getISOWeekNumber = (
  date: Date
): number => {


  const temp =
    new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      )
    );



  const dayNumber =
    temp.getUTCDay() || 7;



  temp.setUTCDate(
    temp.getUTCDate() +
    4 -
    dayNumber
  );



  const yearStart =
    new Date(
      Date.UTC(
        temp.getUTCFullYear(),
        0,
        1
      )
    );



  return Math.ceil(
    (
      (
        temp.getTime() -
        yearStart.getTime()
      )
      /
      86400000
      +
      1
    )
    /
    7
  );

};





export const generateSerialNumbers = (

  productId: string,

  quantity: number

): string[] => {



  const today =
    new Date();



  const yearCode =
    String(
      today.getFullYear()
    );



  const weekCode =
    String(
      getISOWeekNumber(today)
    )
    .padStart(2, "0");



  const counters =
    storage.get<SerialCounter>(
      SERIAL_COUNTER_KEY,
      {}
    );



  if (
    !counters[productId]
  ) {

    counters[productId] = {};

  }



  if (
    !counters[productId][yearCode]
  ) {

    counters[productId][yearCode] = 1;

  }



  const serials: string[] = [];



  for (
    let i = 0;
    i < quantity;
    i++
  ) {



    const currentSerial =
      counters[productId][yearCode];



    const serialPart =
      String(currentSerial)
        .padStart(4, "0");



    serials.push(
      `${yearCode}${weekCode}${serialPart}`
    );



    counters[productId][yearCode]++;

  }



  storage.set(
    SERIAL_COUNTER_KEY,
    counters
  );



  return serials;

};