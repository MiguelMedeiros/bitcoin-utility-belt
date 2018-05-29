// import libs
var bitcoin = require("bitcoinjs-lib");
var bitcoinMessage = require("bitcoinjs-message");
var bip38 = require("bip38");
var wif = require("wif");
var bigi = require("bigi");
var safeBuffer = require("safe-buffer").Buffer;

var createWalvar = function (type = "default", testnet = false){
  try{
    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // choosing wallet
    var wallet;
    var keyPair;
    switch (type){
      case "default":
        // create new random key pair of eliptic curves
        keyPair = bitcoin.ECPair.makeRandom({network: network});

        // return wallet
        wallet = {
          "address": keyPair.getAddress(),
          "privateKey": keyPair.toWIF()
        };
        return wallet;
      }
    }
    catch(err){
      console.log(err);
      return false;
    }
  };

  var createBrainWalvar = function(passphrase, testnet = false){
   try{
    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // create a hass buffer from passphrase
    var hashBuffer = bitcoin.crypto.sha256(bitcoin.crypto.sha256(safeBuffer.from(passphrase)));
   var d = bigi.fromBuffer(hashBuffer);

      // create an eliptic curve
      var keyPair = new bitcoin.ECPair(d, null, {network: network});

      // return wallet
      var wallet;
      wallet = {
       "address": keyPair.getAddress(),
       "privateKey": keyPair.toWIF()
     };
     return wallet;
   }
   catch(err){
    console.log(err);
    return false;
  }
};

var getAddress = function(privateKey, testnet = false){
  try{
    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }
    var keyPair = bitcoin.ECPair.fromWIF(privateKey, network);
    return keyPair.getAddress();
  }
  catch(err){
    console.log(err);
    return false;
  }
};

var validateAddress = function(address, testnet = false){
  try {
    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // try to output script to validate address
    bitcoin.address.toOutputScript(address, network);
    return true;
  } catch (err) {
    //console.log(err);
    return false;
  }
};

var signMessage = function(message, privateKey, testnet = false){
  try{
    if(privateKey === ""){
      throw new Error("Invalid private key");
    }

    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // get eliptic curve pairs
    var keyPair = bitcoin.ECPair.fromWIF(privateKey, network);

    // get private key buffer
    var privateKeyBuffer = keyPair.d.toBuffer(32);

    // return signature
    return bitcoinMessage.sign(message, privateKeyBuffer, keyPair.compressed).toString("base64");
  }
  catch(err){
    console.log(err);
    return false;
  }
};

var verifyMessage = function (message, address, signature, testnet = false){
  try{
    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    if(validateAddress(address, network)){
      throw new Error("Invalid address");
    }
    if(signature === "" && signature.lenght !== 64){
      throw new Error("Invalid signature");
    }
    return bitcoinMessage.verify(message, address, signature);
  }
  catch(err){
    console.log(err);
    return false;
  }
};

var bip38Encrypt = function(privateKey, passphrase){
  try{
    if(privateKey === ""){
      throw new Error("Invalid private key");
    }
    if(passphrase === ""){
      throw new Error("Invalid passphrase");
    }
   var decoded = wif.decode(privateKey);
   var encryptedKey = bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase);

   return encryptedKey;
 }
 catch(err){
  console.log(err);
  return false;
}
};

var bip38Decrypt = function (encryptedKey, passphrase, consoleLog = false){
  try {
    if(encryptedKey === ""){
      throw new Error("Invalid encrypted key");
    }
    if(passphrase === ""){
      throw new Error("Invalid passphrase");
    }
    var decryptedKey = bip38.decrypt(encryptedKey, passphrase, function (status) {
      if(consoleLog){
        console.log((status.percent).toFixed(2));
      }
    });
    return wif.encode(0x80, decryptedKey.privateKey, decryptedKey.compressed);
  }
  catch(err){
    console.log(err);
    return false;
  }
};

module.exports = {
  createWalvar: createWalvar,
  createBrainWalvar: createBrainWalvar,
  getAddress: getAddress,
  validateAddress: validateAddress,
  signMessage: signMessage,
  verifyMessage: verifyMessage,
  bip38Encrypt: bip38Encrypt,
  bip38Decrypt: bip38Decrypt
};

// add Qrcode
// add sign transactions
// add others wallets segwit bech32
// add multsig wallets