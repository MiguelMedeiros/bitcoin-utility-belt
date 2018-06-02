// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// creating bip44 wallets (uses bip39 - mnemonic's seed)
// type: P2PKH (default)
seedWallet = belt.wallet.createSeed(5, null, "44");
console.log("seed wallet bip44 P2PKH", seedWallet);

// type: P2SH
seedWallet = belt.wallet.createSeed(5, "P2SH", "44");
console.log("seed wallet bip44 P2SH", seedWallet);

// type: P2WPKH
seedWallet = belt.wallet.createSeed(5, "P2WPKH", "44");
console.log("seed wallet bip44 P2WPKH", seedWallet);

// type: P2WSH
seedWallet = belt.wallet.createSeed(5, "P2WSH", "44");
console.log("seed wallet bip44 P2WSH", seedWallet);