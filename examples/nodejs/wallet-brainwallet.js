// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// creating brain wallets
// type: segwit native (default)
let brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase"); 
console.log(brainWallet);

// type: legacy
let brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase","legacy"); 
console.log(brainWallet);

// type: P2SH segwit
let brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase","P2SH"); 
console.log(brainWallet);