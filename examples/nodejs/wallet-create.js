// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// type: native segwit (default)
let wallet = belt.wallet.create();
console.log(wallet);

// type: legacy
let wallet = belt.wallet.create("legacy");
console.log(wallet);

// type: P2SH segwit
let wallet = belt.wallet.create("P2SH");
console.log(wallet);