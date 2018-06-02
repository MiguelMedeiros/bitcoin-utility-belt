// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// generate mnemonic words
let mnemonicWords = belt.wallet.generateMnemonic();
console.log(mnemonicWords);

// validate mnemonic words
let validateWords = belt.wallet.validateMnemonic(mnemonicWords);
console.log(validateWords);