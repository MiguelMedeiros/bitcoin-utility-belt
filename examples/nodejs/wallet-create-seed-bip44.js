// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// creating bip44 wallets (uses bip39 - mnemonic's seed)
// type: segwit native (default)
let seedWallet = belt.wallet.createSeed(5, null, "44");
console.log("seed wallet bip44 segwit native", seedWallet);

// type: legacy
let seedWallet = belt.wallet.createSeed(5, "legacy", "44");
console.log("seed wallet bip44 legacy", seedWallet);

// type: segwit P2SH
let seedWallet = belt.wallet.createSeed(5, "P2SH", "44");
console.log("seed wallet bip44 segwit P2SH", seedWallet);