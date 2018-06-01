// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// your message
let message = "Bitcoin Utility Belt RULES!";
console.log(message);

// create a random wallet (only works with legacy addresses)
let wallet = belt.wallet.create("legacy");
console.log(wallet);

// sign message with private key
let signature = belt.message.sign(message, wallet.privateKey);
console.log(signature);

// verify message with signature, message and address
let verifyMessage = belt.message.verify(message, wallet.address, signature);
console.log(verifyMessage);