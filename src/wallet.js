// import libs
let bitcoin = require("bitcoinjs-lib");
let bitcoinMessage = require("bitcoinjs-message");
let bip32 = require('bip32');
let bip38 = require("bip38");
let bip39 = require('bip39');
let wif = require("wif");
let bigi = require("bigi");
let safeBuffer = require("safe-buffer").Buffer;

let recoverAddress = (privateKey, type="native", testnet = false) => {
  try{
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // get eliptic curves from wif
    let keyPair = bitcoin.ECPair.fromWIF(privateKey, network);
    let publicKeyBuffer = keyPair.getPublicKeyBuffer();
    let publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
    let redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
    let address;

    // choose wallet type
    switch (type){
      case "legacy":
        address = keyPair.getAddress();
        break;
      case "P2SH":
        let redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
        let scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
        address = bitcoin.address.fromOutputScript(scriptPubKey);
        break;
      default:
        address = bitcoin.address.fromOutputScript(redeemScript);
        break;
    }

    // return address
    return address;
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};


let recoverSeed = (seed, count = 1, type="native", bip="49", testnet = false) => {
  try{
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // choosing wallet
    let wallet;
    let wallets = [];
    let mnemonic = seed;
    let bip39seed = bip39.mnemonicToSeed(mnemonic);

    let root = bip32.fromSeed(bip39seed);
    let path;
    let i;
    for (i = 0; i < count; i++) {    
      // choose bip
      switch (bip){
        case "32":
          if(testnet){
            path = "m/0'/1/0"+i;
          }else{
            path = "m/0'/0/0"+i;
          }
          break;
        case "44":
          if(testnet){
            path = "m/44'/1'/0'/0/"+i;
          }else{
            path = "m/44'/0'/0'/0/"+i;
          }
          break;
        default:
          if(testnet){
            path = "m/49'/1'/0'/0/"+i;
          }else{
            path = "m/49'/0'/0'/0/"+i;
          }
          break;
      }
      
      let child = root.derivePath(path);

      let d = bigi.fromBuffer(child.privateKey);
      let keyPair = new bitcoin.ECPair(d, null, {network: network});

      let publicKeyHash = bitcoin.crypto.hash160(child.publicKey);
      let redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
      let redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
      let address;

      // choose wallet type
      switch (type){
        case "legacy":
          address = keyPair.getAddress();
          break;
        case "P2SH":
          let outputScript = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
          address = bitcoin.address.fromOutputScript(outputScript);
          break;
        default:
          address = bitcoin.address.fromOutputScript(redeemScript);
          break;
      }

      // return wallet
      wallets.push({
        "address": address,
        "privateKey": keyPair.toWIF()
      });
    }
    return wallets;
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

let validateAddress = (address, testnet = false) => {
  try {
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // try to output script to validate address
    bitcoin.address.toOutputScript(address, network);

    // no errors return true
    return true;
  } catch (err) {
    // return false
    return false;
  }
};

let create = (type = "native", testnet = false) => {
  try{
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // create new random key pair of eliptic curves
    let keyPair = bitcoin.ECPair.makeRandom({network: network});
    let publicKeyBuffer = keyPair.getPublicKeyBuffer();
    let publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
    let redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
    let address;

    // choose wallet type
    switch (type){
      case "legacy":
        address = keyPair.getAddress();
        break;
      case "P2SH":
        let redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
        let scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
        address = bitcoin.address.fromOutputScript(scriptPubKey);
        break;
      default:
        address = bitcoin.address.fromOutputScript(redeemScript);
        break;
    }

    // return wallet
    let wallet = {
      "address": address,
      "privateKey": keyPair.toWIF()
    };
    return wallet;
  } catch (err) {
    // show error
    console.error(err);
    return false;
  }
};

let createSeed = (count = 1, type="native", bip="49", testnet = false) => {
  try{
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // choosing wallet
    let wallets = [];
    let mnemonic = bip39.generateMnemonic();
    let seed = bip39.mnemonicToSeed(mnemonic);

    let root = bip32.fromSeed(seed);
    let path;
    let i;
    for (i = 0; i < count; i++) {    
      // choose bip
      switch (bip){
        case "32":
          if(testnet){
            path = "m/0'/1/0"+i;
          }else{
            path = "m/0'/0/0"+i;
          }
          break;
        case "44":
          if(testnet){
            path = "m/44'/1'/0'/0/"+i;
          }else{
            path = "m/44'/0'/0'/0/"+i;
          }
          break;
        default:
          if(testnet){
            path = "m/49'/1'/0'/0/"+i;
          }else{
            path = "m/49'/0'/0'/0/"+i;
          }
          break;
      }
      
      let child = root.derivePath(path);

      let d = bigi.fromBuffer(child.privateKey);
      let keyPair = new bitcoin.ECPair(d, null, {network: network});

      let publicKeyHash = bitcoin.crypto.hash160(child.publicKey);
      let redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
      let redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
      let address;

      // choose wallet type
      switch (type){
        case "legacy":
          address = keyPair.getAddress();
          break;
        case "P2SH":
          let outputScript = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
          address = bitcoin.address.fromOutputScript(outputScript);
          break;
        default:
          address = bitcoin.address.fromOutputScript(redeemScript);
          break;
      }

      // return wallet
      wallets.push({
        "address": address,
        "privateKey": keyPair.toWIF()
      });
    }
    let wallet = {
      "seed": mnemonic,
      "wallets": wallets
    };
    return wallet;
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

let createBrainWallet = (passphrase, type="native", testnet = false) => {
  try{
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // create a hass buffer from passphrase
    let passphraseHash = bitcoin.crypto.sha256(safeBuffer.from(passphrase));
    let hashBuffer = bitcoin.crypto.sha256(passphraseHash);
    let d = bigi.fromBuffer(hashBuffer);

    // create an eliptic curve
    let keyPair = new bitcoin.ECPair(d, null, {network: network});

    let publicKeyBuffer = keyPair.getPublicKeyBuffer();
    let publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
    let redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
    let address;

    // choose wallet type
    switch (type){
      case "legacy":
        address = keyPair.getAddress();
        break;
      case "P2SH":
        let redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
        let outputScript = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
        address = bitcoin.address.fromOutputScript(outputScript);
        break;
      default:
        address = bitcoin.address.fromOutputScript(redeemScript);
        break;
    }

    // return wallet with address and private key
    let wallet = {
      "address": address,
      "privateKey": keyPair.toWIF()
    };
    return wallet;
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

let encrypt = (privateKey, passphrase) => {
  try{
    // validate private key and passphrase
    if(privateKey === ""){
      throw new Error("Invalid private key");
    }
    if(passphrase === ""){
      throw new Error("Invalid passphrase");
    }

    // encrypt key
    let decoded = wif.decode(privateKey);
    let decodedPK = decoded.privateKey;
    let compressed = decoded.compressed;
    let encryptedKey = bip38.encrypt(decodedPK, compressed, passphrase);

    // return encrypted key
    return encryptedKey;
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

let decrypt = (encryptedKey, passphrase, consoleLog = false) => {
  try {
    // validate encrypte key and passphrase
    if(encryptedKey === ""){
      throw new Error("Invalid encrypted key");
    }
    if(passphrase === ""){
      throw new Error("Invalid passphrase");
    }

    // decrypt key
    let decryptedKey = bip38.decrypt(encryptedKey,passphrase,function(status){
      if(consoleLog){
        console.log(status.percent.toFixed(2));
      }
    });

    // return wif private key
    return wif.encode(0x80, decryptedKey.privateKey, decryptedKey.compressed);
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

// export functions
module.exports = {
  create: create,
  createSeed: createSeed,
  createBrainWallet: createBrainWallet,
  decrypt: decrypt,
  encrypt: encrypt,
  recoverAddress: recoverAddress,
  recoverSeed: recoverSeed,
  validateAddress: validateAddress
};

