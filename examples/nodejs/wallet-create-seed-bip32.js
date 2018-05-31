// import bitcoin utility belt
var belt = require("bitcoin-utility-belt");

// creating bip32 wallets (uses bip39 - mnemonic's seed)
// type: segwit native (default)
var seedWallet = belt.wallet.createSeed(5, null, "32");
console.log(seedWallet);

// type: legacy
var seedWallet = belt.wallet.createSeed(5, "legacy", "32");
console.log(seedWallet);

// type: segwit P2SH
var seedWallet = belt.wallet.createSeed(5, "P2SH", "32");
console.log(seedWallet);