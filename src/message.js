// import libs
var bitcoin = require("bitcoinjs-lib");
var bitcoinMessage = require("bitcoinjs-message");

var sign = function(message, privateKey, testnet = false){
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
    var compressed = keyPair.compressed;

    // return signature
    var signature = bitcoinMessage.sign(message, privateKeyBuffer, compressed);
    return signature.toString("base64");
  } catch(err){
    // show error
    console.log(err);
    return false;
  }
};

var verify = function (message, address, signature){
  try{

    if(signature === "" && signature.lenght !== 64){
      throw new Error("Invalid signature");
    }

    // return true or false after varify message
    return bitcoinMessage.verify(message, address, signature);
  } catch(err){
    // show error
    console.log(err);
    return false;
  }
};

// export functions
module.exports = {
  sign: sign,
  verify: verify
};

