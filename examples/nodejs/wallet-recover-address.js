// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

//************************************************************
// P2PK address recover
let wallet = belt.wallet.create();
console.log("P2PK wallet", wallet);

// recover address
let address = belt.wallet.recoverAddress(wallet.privateKey);
console.log(address);

//************************************************************
// P2PKH address recover
wallet = belt.wallet.create("P2PKH");
console.log("P2PKH wallet",wallet);

// recover address
address = belt.wallet.recoverAddress(wallet.privateKey, "P2PKH");
console.log(address);

//************************************************************
// P2SH address recover
wallet = belt.wallet.create("P2SH");
console.log("legacy wallet",wallet);

// recover address
address = belt.wallet.recoverAddress(wallet.privateKey, "P2SH");
console.log(address);

//************************************************************
// P2WPKH address recover
wallet = belt.wallet.create("P2WPKH");
console.log("P2WPKH wallet",wallet);

// recover address
address = belt.wallet.recoverAddress(wallet.privateKey, "P2WPKH");
console.log(address);

//************************************************************
// P2WSH address recover
wallet = belt.wallet.create("P2WSH");
console.log("legacy wallet",wallet);

// recover address
address = belt.wallet.recoverAddress(wallet.privateKey, "P2WSH");
console.log(address);