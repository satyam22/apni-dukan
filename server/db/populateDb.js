const fs = require('fs');
const csv = require('fast-csv');
const pool = require('./pool');
let count = 0;
const QUERY = `insert into products (productName, price, quantity, imageUrl, offer) values(?,?,?,?,?)`;
const populateDb = async (filename) => {
  const stream = fs.createReadStream(__dirname + `/${filename}`);
  const csvStream = csv.parse({
    headers: true,
    ignoreEmpty: true,
    discardUnmappedColumns: true,
    quote: '"',
    escape: '"'
  }).on('data', async (data) => {

    try {
      const { product, "price/unit(INR)": price, quantity, image, offer = 0 } = data;
      console.log({ product, price, quantity, image, offer });
      const dbResult = await pool.query(QUERY, [product, price, quantity, image, offer]);
      console.log({ dbResult });
    }
    catch (error) {
      console.log("error:: ", error);
    }
    }).on('end', () => {
      console.log('*************');
    });
    stream.pipe(csvStream);
  }

  const INSERT_CARD_QUERY = `insert into cardDetails(number, name, address, country, cvv, exp, issuingNetwork, balance)
values(?,?,?,?,?,?,?,?)`;

const populateCards = async () => {
  let cards = require('./../data/cards.json');
  cards = cards.map(card => card.CreditCard);
  for (let i = 0; i < cards.length; i++) {
    try {
      const { IssuingNetwork, CardNumber, Name, Address, Country, CVV, Exp } = cards[i];
      const result = await pool.query(INSERT_CARD_QUERY, [CardNumber, Name, Address, Country, CVV, Exp, IssuingNetwork, 100000]);
      console.log({ result });
    } catch (error) {
      console.log(error);
    }
  }
}
const INSERT_UPI_QUERY = `Insert into upiDetails(upiId, upiPin, balance) values(?,?,?)`;
const INSERT_NETBANKING_QUERY = `Insert into netbankingDetails (customerId, bankName, password, balance) values(?,?,?,?)`;

const populateUpi = async (count) => {
for(let i = 0; i < count; i++){
  const upiId = generateString(9);
  const upiPin = Math.floor(100000 + Math.random() * 900000);
  const balance = 100000;
  console.log({upiId, upiPin });
  try{
    const result = await pool.query(INSERT_UPI_QUERY, [ upiId, upiPin, balance]);
    console.log({result});
  } catch(error){
    console.log(error);
  }
}
}
const banks = require('./../data/banks');
const populateNetbanking = async (count) => {
  for(let i = 0; i < count; i++){
    const password = generateString(9);
    const customerId = Math.floor(10000000 + Math.random() * 90000000);
    const balance = 100000;
    const bank = banks[Math.floor(Math.random()*banks.length)];
    console.log({ password, customerId, balance, bank });
    try{
      const result = await pool.query(INSERT_NETBANKING_QUERY, [ customerId, bank, password, balance ]);
      console.log({result});
    } catch(error){
      console.log(error);
    }
  }
  }
  
function generateString(length) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
module.exports = { populateDb, populateCards, populateUpi, populateNetbanking }