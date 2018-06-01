// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// API: https://www.smartbit.com.au/api
// get info from an address
let address = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
belt.blockchain.address(address).then((res) => console.log(res));
