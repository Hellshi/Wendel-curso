const Tesseract = require('tesseract.js')

Tesseract.recognize(
  'https://cdn.discordapp.com/attachments/1011657543338164334/1228025919470305320/IMG_20240411_135625.jpg?ex=662a8b42&is=66181642&hm=71d5fe51c0e57b0b196134d4c300a8cb094844d8dd31cad5cfc0297bd8d98fb1&',
  'por',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
  })

/*

TreatedBody:

interface Recipient {
  name: string;
  CpfOrCnpj: string;
  institution: string;
  agency: string;
  account: string;
}

interface Payer {
  name: string;
  CpfOrCnpj: string;
  institution: string;
  agency: string;
  account: string;
}

interface ReceiptData {
  bank: string;
  value: number;
  date: string;
  recipient: Recipient;
  payer: Payer;
  transfeerType: string;
}


*/