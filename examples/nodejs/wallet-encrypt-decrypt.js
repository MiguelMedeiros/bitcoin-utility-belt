// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// create a random wallet (P2PKH)
let wallet = belt.wallet.create();
console.log(wallet);

// encrypt wallet (uses bip38)
let encryptedWallet = belt.wallet.encrypt(wallet.privateKey, "passphrase");
console.log("encrypted private key", encryptedWallet);

// decrypt wallet (uses bip38)
// last parameter is the console status, change it to 'true' to print the status
let decryptedWallet = belt.wallet.decrypt(encryptedWallet, "passphrase", true);
console.log("decrypted private key", decryptedWallet);