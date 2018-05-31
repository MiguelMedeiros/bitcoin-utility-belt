// import libs
let bitcoin = require("bitcoinjs-lib");
let bitcoinMessage = require("bitcoinjs-message");

let sign = (message, privateKey, testnet = false) => {
  try{
    if(privateKey === ""){
      throw new Error("Invalid private key");
    }

    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // get eliptic curve pairs
    let keyPair = bitcoin.ECPair.fromWIF(privateKey, network);

    // get private key buffer
    let privateKeyBuffer = keyPair.d.toBuffer(32);
    let compressed = keyPair.compressed;

    // return signature
    let signature = bitcoinMessage.sign(message, privateKeyBuffer, compressed);
    return signature.toString("base64");
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

let verify = (message, address, signature) => {
  try{

    if(signature === "" && signature.lenght !== 64){
      throw new Error("Invalid signature");
    }

    // return true or false after varify message
    return bitcoinMessage.verify(message, address, signature);
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

// export functions
module.exports = {
  sign: sign,
  verify: verify
};

