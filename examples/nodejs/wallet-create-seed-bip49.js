// import bitcoin utility belt
var belt = require("bitcoin-utility-belt");

// creating bip49 wallets (uses bip39 - mnemonic's seed)
// type: segwit native (default)
var seedWallet = belt.wallet.createSeed(5);
console.log("seed wallet bip49 segwit native", seedWallet);

// type: legacy
var seedWallet = belt.wallet.createSeed(5, "legacy");
console.log("seed wallet bip49 legacy", seedWallet);

// type: segwit P2SH
var seedWallet = belt.wallet.createSeed(5, "P2SH");
console.log("seed wallet bip49 segwit P2SH", seedWallet);