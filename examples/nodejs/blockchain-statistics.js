// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// API: https://www.smartbit.com.au/api
// get a list of statistics about Bitcoin
let days = 20; // mas 32 days
belt.blockchain.stats(days).then((res) => console.log(res));