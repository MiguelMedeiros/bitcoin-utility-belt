// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// creating bip49 wallets (uses bip39 - mnemonic's seed) - default
// type: P2PKH (default)
seedWallet = belt.wallet.createSeed(5);
console.log("seed wallet bip49 P2PKH", seedWallet);

// type: P2SH
seedWallet = belt.wallet.createSeed(5, "P2SH");
console.log("seed wallet bip49 P2SH", seedWallet);

// type: P2WPKH
seedWallet = belt.wallet.createSeed(5, "P2WPKH");
console.log("seed wallet bip49 P2WPKH", seedWallet);

// type: P2WSH
seedWallet = belt.wallet.createSeed(5, "P2WSH");
console.log("seed wallet bip49 P2WSH", seedWallet);