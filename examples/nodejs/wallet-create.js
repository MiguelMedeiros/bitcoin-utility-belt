// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// creating random wallets
// type: P2PK (default)
let wallet = belt.wallet.create();
console.log("wallet P2PK", wallet);

// type: P2PKH
wallet = belt.wallet.create("P2PKH");
console.log("wallet P2PKH", wallet);

// type: P2SH
wallet = belt.wallet.create("P2SH");
console.log("wallet P2SH", wallet);

// type: P2WPKH
wallet = belt.wallet.create("P2WPKH");
console.log("wallet P2WPKH", wallet);

// type: P2WSH
wallet = belt.wallet.create("P2WSH");
console.log("wallet P2WSH", wallet);