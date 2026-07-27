interface SerialCounter {
  [productId: string]: {
    [year: string]: number;
  };
}


const serialCounter: SerialCounter = {};



const getWeekNumber = (
  date: Date
): number => {

  const firstDayOfYear =
    new Date(
      date.getFullYear(),
      0,
      1
    );


  const pastDays =
    (
      date.getTime() -
      firstDayOfYear.getTime()
    ) / 86400000;


  return Math.ceil(
    (
      pastDays +
      firstDayOfYear.getDay() +
      1
    ) / 7
  );

};



export const generateSerialNumbers = (
  productId: string,
  quantity: number
): string[] => {


  const today =
    new Date();


  const year =
    today.getFullYear();


  const yearCode =
    String(year);



  const weekCode =
    String(
      getWeekNumber(today)
    ).padStart(2, "0");



  if (
    !serialCounter[productId]
  ) {

    serialCounter[productId] = {};

  }



  if (
    !serialCounter[productId][yearCode]
  ) {

    serialCounter[productId][yearCode] = 1;

  }



  const serials: string[] = [];



  for (
    let i = 0;
    i < quantity;
    i++
  ) {


    const currentSerial =
      serialCounter[productId][yearCode];



    const serialPart =
      String(currentSerial)
        .padStart(4, "0");



    serials.push(
      `${yearCode}${weekCode}${serialPart}`
    );



    serialCounter[productId][yearCode]++;

  }



  return serials;

};