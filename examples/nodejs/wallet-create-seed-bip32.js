// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// creating bip32 wallets (uses bip39 - mnemonic's seed)
// type: P2PK (default)
let seedWallet = belt.wallet.createSeed(5, null, "32");
console.log("seed wallet bip32 P2PK", seedWallet);

// type: P2PKH
seedWallet = belt.wallet.createSeed(5, "P2PKH", "32");
console.log("seed wallet bip32 P2PKH", seedWallet);

// type: P2SH
seedWallet = belt.wallet.createSeed(5, "P2SH", "32");
console.log("seed wallet bip32 P2SH", seedWallet);

// type: P2WPKH
seedWallet = belt.wallet.createSeed(5, "P2WPKH", "32");
console.log("seed wallet bip32 P2WPKH", seedWallet);

// type: P2WSH
seedWallet = belt.wallet.createSeed(5, "P2WSH", "32");
console.log("seed wallet bip32 P2WSH", seedWallet);