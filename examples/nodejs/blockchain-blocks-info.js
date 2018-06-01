// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// API: https://www.smartbit.com.au/api
// get block info
let number = 0;
let noTx = true; // remove transactions from block result
belt.blockchain.block(number, noTx).then((res) => console.log(res));

// get blocks info
let limit = 10; // limit the result blocks
let sort = "height"; // sort by "height","hash","size","transaction_count","input_amount","output_amount","fees","input_count","output_count"
let dir = "desc";
let next = ""; // next page hash (get from the result)
belt.blockchain.blocks(limit, sort, dir, next).then((res) => console.log(res));