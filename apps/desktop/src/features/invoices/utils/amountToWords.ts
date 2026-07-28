const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];


const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];



const convertTwoDigits = (
  num: number
): string => {


  if (num < 20) {

    return ones[num];

  }


  const tensPart =
    Math.floor(num / 10);


  const onesPart =
    num % 10;



  return `${tens[tensPart]} ${
    ones[onesPart]
  }`.trim();

};




const convertNumber = (
  num: number
): string => {


  let result = "";



  if (num >= 10000000) {

    result +=
      `${convertNumber(
        Math.floor(num / 10000000)
      )} Crore `;

    num %= 10000000;

  }



  if (num >= 100000) {

    result +=
      `${convertNumber(
        Math.floor(num / 100000)
      )} Lakh `;

    num %= 100000;

  }



  if (num >= 1000) {

    result +=
      `${convertNumber(
        Math.floor(num / 1000)
      )} Thousand `;

    num %= 1000;

  }



  if (num >= 100) {

    result +=
      `${ones[
        Math.floor(num / 100)
      ]} Hundred `;

    num %= 100;

  }



  if (num > 0) {

    result +=
      convertTwoDigits(num);

  }



  return result.trim();

};




export const amountToWords = (

  amount: number

): string => {


  if (amount === 0) {

    return "Rupees Zero Only";

  }



  const rupees =
    Math.floor(amount);



  return `Rupees ${
    convertNumber(rupees)
  } Only`;

};