// import bitcoin utility belt
var belt = require("bitcoin-utility-belt");

// creating brain wallets
// type: segwit native (default)
var brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase"); 
console.log(brainWallet);

// type: legacy
var brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase","legacy"); 
console.log(brainWallet);

// type: P2SH segwit
var brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase","P2SH"); 
console.log(brainWallet);