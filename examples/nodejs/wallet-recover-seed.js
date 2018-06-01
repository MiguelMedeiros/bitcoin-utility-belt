// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// seed wallets recover (segwit native)
let seedWallets = belt.wallet.createSeed(5);
console.log("legacy wallet",seedWallets);

// recover address
let addresses = belt.wallet.recoverSeed(seedWallets.seed, 5);
console.log(addresses);