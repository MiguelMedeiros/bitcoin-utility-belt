// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// segwit native address recover
let wallet = belt.wallet.create();
console.log("segwit native wallet", wallet);

// recover address
let address = belt.wallet.recoverAddress(wallet.privateKey);
console.log(address);

//************************************************************
// segwit P2SH address recover
let wallet = belt.wallet.create("P2SH");
console.log("segwit P2SH wallet",wallet);

// recover address
let address = belt.wallet.recoverAddress(wallet.privateKey, "P2SH");
console.log(address);

//************************************************************
// legacy address recover
let wallet = belt.wallet.create("legacy");
console.log("legacy wallet",wallet);

// recover address
let address = belt.wallet.recoverAddress(wallet.privateKey, "legacy");
console.log(address);