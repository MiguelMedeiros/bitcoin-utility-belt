// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// API: https://www.smartbit.com.au/api
// get totals statistics info
belt.blockchain.totals().then((res) => console.log(res));