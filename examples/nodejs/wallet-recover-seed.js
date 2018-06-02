// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// ********************************************************
// seed wallets recover (P2PKH)
seedWallets = belt.wallet.createSeed(5);
console.log("P2PKH wallet",seedWallets);

// recover address
addresses = belt.wallet.recoverSeed(seedWallets.seed, 5);
console.log(addresses);

// ********************************************************
// seed wallets recover (P2SH)
seedWallets = belt.wallet.createSeed(5, "P2SH");
console.log("P2SH wallet",seedWallets);

// recover address
addresses = belt.wallet.recoverSeed(seedWallets.seed, 5, "P2SH");
console.log(addresses);

// ********************************************************
// seed wallets recover (P2WPKH)
seedWallets = belt.wallet.createSeed(5, "P2WPKH");
console.log("P2WPKH wallet",seedWallets);

// recover address
addresses = belt.wallet.recoverSeed(seedWallets.seed, 5, "P2WPKH");
console.log(addresses);

// ********************************************************
// seed wallets recover (P2WSH)
seedWallets = belt.wallet.createSeed(5, "P2WSH");
console.log("P2WSH wallet",seedWallets);

// recover address
addresses = belt.wallet.recoverSeed(seedWallets.seed, 5, "P2WSH");
console.log(addresses);