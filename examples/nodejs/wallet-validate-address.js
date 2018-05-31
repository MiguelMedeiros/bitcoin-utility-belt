// import bitcoin utility belt
var belt = require("bitcoin-utility-belt");

// create a random wallet (segwit native)
var wallet = belt.wallet.create();
console.log(wallet);

// validate address
var validate = belt.wallet.validateAddress(wallet.address);
console.log(validate);