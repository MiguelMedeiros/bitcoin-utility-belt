// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// API: https://www.smartbit.com.au/api
// get search from an op_return term (limited to 10 results)
let message = "Satoshi Nakamoto";
belt.blockchain.search(message).then((res) => console.log(res));