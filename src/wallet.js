// import libs
let bitcoin = require("bitcoinjs-lib");
let bitcoinMessage = require("bitcoinjs-message");
let bip32 = require('bip32');
let bip38 = require("bip38");
let bip39 = require('bip39');
let wif = require("wif");
let bigi = require("bigi");
let safeBuffer = require("safe-buffer").Buffer;
let assert = require("assert");

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

let checkAddress = (address, testnet = false) => {
  let type = false;
  
  // check network: bitcoin or testnet
  let network;
  if(testnet){
    network = bitcoin.networks.testnet;
  }else{
    network = bitcoin.networks.bitcoin;
  }

  if(validateAddress(address)){ 
    let addressScript = bitcoin.address.toOutputScript(address, network);

    if(bitcoin.script.pubKeyHash.output.check(addressScript)){
      type = "P2PKH";
    }
    
    if(bitcoin.script.scriptHash.output.check(addressScript)){
      type = "P2SH|P2WSH";
    }

    if(bitcoin.script.witnessPubKeyHash.output.check(addressScript)){
      type = "P2PKH";
    }
  }

  return type;
};

let generateAddress = (type, publicKeyHash, network) => {

    let address;
    let redeemScript;
    let scriptPubKey;

    // choose wallet type
    switch (type){
      case "P2SH": // pay to script hash
        redeemScript = bitcoin.script.scriptHash.output.encode(publicKeyHash);
        address = bitcoin.address.fromOutputScript(redeemScript, network);
        break;
      case "P2WPKH": // pay to witness public key hash
        redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
        address = bitcoin.address.fromOutputScript(redeemScript, network);
        break;
      case "P2WSH": // pay to witness script hash
        redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
        let redeemScriptHash = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript));
        address = bitcoin.address.fromOutputScript(redeemScriptHash, network);
        break;
      default: // pay to public key hash
        redeemScript = bitcoin.script.pubKeyHash.output.encode(publicKeyHash);
        address = bitcoin.address.fromOutputScript(redeemScript, network);
        break;
    }

    return address;
};

let recoverAddress = (privateKey, type="P2PKH", testnet = false) => {
  try{
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // create key pair of eliptic curves
    let keyPair = bitcoin.ECPair.fromWIF(privateKey, network);

    // public key buffer
    let publicKeyBuffer = keyPair.getPublicKeyBuffer();

    // public key hash
    let publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);

    // generate Address
    let address = generateAddress(type, publicKeyHash, network);

    // return address
    return address;
  } catch(err){
    // show error
    console.error(err);
    return false;
  }
};

let chooseBipSeed = (bip, count, testnet) => {
  // choose bip
  let path;
  switch (bip){
    case "32":
      if(testnet){
        path = "m/0'/1/0"+count;
      }else{
        path = "m/0'/0/0"+count;
      }
      break;
    case "44":
      if(testnet){
        path = "m/44'/1'/0'/0/"+count;
      }else{
        path = "m/44'/0'/0'/0/"+count;
      }
      break;
    default:
      if(testnet){
        path = "m/49'/1'/0'/0/"+count;
      }else{
        path = "m/49'/0'/0'/0/"+count;
      }
      break;
  }
  return path;
};

let recoverSeed = (seed, count = 1, type="P2PKH", bip="49", testnet = false) => {
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
      path = chooseBipSeed(bip, i, testnet);

      // get child
      let child = root.derivePath(path);

      // create new key pair of eliptic curves
      let d = bigi.fromBuffer(child.privateKey);
      let keyPair = new bitcoin.ECPair(d, null, {network: network});

      // public key hash
      let publicKeyHash = bitcoin.crypto.hash160(child.publicKey);

      // generate Address
      let address = generateAddress(type, publicKeyHash, network);

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

let create = (type = "P2PKH", testnet = false) => {
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

    // public key buffer
    let publicKeyBuffer = keyPair.getPublicKeyBuffer();

    // public key hash
    let publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);

    // generate Address
    let address = generateAddress(type, publicKeyHash, network);

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

let createSeed = (count = 1, type="P2PKH", bip="49", testnet = false) => {
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
      path = chooseBipSeed(bip, i, testnet);
      
      // get child
      let child = root.derivePath(path);

      // create new key pair of eliptic curves
      let d = bigi.fromBuffer(child.privateKey);
      let keyPair = new bitcoin.ECPair(d, null, {network: network});

      // public key hash
      let publicKeyHash = bitcoin.crypto.hash160(child.publicKey);

      // generate Address
      let address = generateAddress(type, publicKeyHash, network);

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

let generateMnemonic = () => {
  return bip39.generateMnemonic();
};

let validateMnemonic = (seed) => {
  return bip39.validateMnemonic(seed);
};

let createBrainWallet = (passphrase, type="P2PKH", testnet = false) => {
  try{
    // check network: bitcoin or testnet
    let network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    let passphraseHash = bitcoin.crypto.sha256(safeBuffer.from(passphrase));
    let d = bigi.fromBuffer(passphraseHash);
    let keyPair = new bitcoin.ECPair(d, null, {network: network});

    // public key buffer
    let publicKeyBuffer = keyPair.getPublicKeyBuffer();

    // public key hash
    let publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);

    // generate Address
    let address = generateAddress(type, publicKeyHash, network);

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
  checkAddress: checkAddress,
  create: create,
  createSeed: createSeed,
  createBrainWallet: createBrainWallet,
  decrypt: decrypt,
  encrypt: encrypt,
  generateMnemonic: generateMnemonic,
  recoverAddress: recoverAddress,
  recoverSeed: recoverSeed,
  validateAddress: validateAddress,
  validateMnemonic: validateMnemonic
};
