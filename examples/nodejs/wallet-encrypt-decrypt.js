// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// create a random wallet (segwit native)
let wallet = belt.wallet.create();
console.log(wallet);

// encrypt wallet (uses bip38)
let encryptedWallet = belt.wallet.encrypt(wallet.privateKey, "passphrase");
console.log(encryptedWallet);

// decrypt wallet (uses bip38)
// last parameter is the console status, change it to 'true' to print the status
let decryptedWallet = belt.wallet.decrypt(encryptedWallet, "passphrase", true);
console.log(decryptedWallet);