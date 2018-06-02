// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// creating brain wallets
// type: P2PKH (default)
brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase"); 
console.log("brainwallet P2PKH", brainWallet);

// type: P2SH
brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase","P2SH"); 
console.log("brainwallet P2SH", brainWallet);

// type: P2WPKH
brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase","P2WPKH"); 
console.log("brainwallet P2WPKH", brainWallet);

// type: P2WSH
brainWallet = belt.wallet.createBrainWallet("brain wallet passphrase","P2WSH"); 
console.log("brainwallet P2WSH", brainWallet);