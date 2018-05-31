// import bitcoin utility belt
var belt = require("bitcoin-utility-belt");

// type: native segwit (default)
var wallet = belt.wallet.create();
console.log(wallet);

// type: legacy
var wallet = belt.wallet.create("legacy");
console.log(wallet);

// type: P2SH segwit
var wallet = belt.wallet.create("P2SH");
console.log(wallet);