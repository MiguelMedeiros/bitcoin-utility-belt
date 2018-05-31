// import bitcoin utility belt
var belt = require("bitcoin-utility-belt");

// create a random wallet (segwit native)
var wallet = belt.wallet.create();
console.log(wallet);

// encrypt wallet (uses bip38)
var encryptedWallet = belt.wallet.encrypt(wallet.privateKey, "passphrase");
console.log(encryptedWallet);

// decrypt wallet (uses bip38)
// last parameter is the console status, change it to 'true' to print the status
var decryptedWallet = belt.wallet.decrypt(encryptedWallet, "passphrase", true);
console.log(decryptedWallet);