// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// ********************************************************
// create a random wallet (P2PKH)
let wallet = belt.wallet.create();
console.log(wallet);

// validate address
let validate = belt.wallet.validateAddress(wallet.address);
console.log(validate);