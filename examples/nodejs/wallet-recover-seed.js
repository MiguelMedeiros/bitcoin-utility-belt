// import bitcoin utility belt
var belt = require("bitcoin-utility-belt");

// seed wallets recover (segwit native)
var seedWallets = belt.wallet.createSeed(5);
console.log("legacy wallet",seedWallets);

// recover address
var addresses = belt.wallet.recoverSeed(seedWallets.seed, 5);
console.log(addresses);