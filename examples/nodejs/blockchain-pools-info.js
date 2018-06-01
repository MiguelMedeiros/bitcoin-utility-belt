// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// API: https://www.smartbit.com.au/api
// get pool info
let name = "AntPool";
let limit = 10; // limit the result blocks
let sort = "height"; // sort by "height","hash","size","transaction_count","input_amount","output_amount","fees","input_count","output_count"
let dir = "desc";
belt.blockchain.pool(name, limit, sort, dir).then((res) => console.log(res));

// get pools info
limit = 10; // limit the result blocks
sort = "height"; // sort by "block_count","name","transaction_count","reward_amount","fee_amount","size"
dir = "desc";
let next = ""; // next page hash (get from the result)
belt.blockchain.pools( limit, sort, dir, next).then((res) => console.log(res));