// import libs
var bitcoin = require("bitcoinjs-lib");
var bitcoinMessage = require("bitcoinjs-message");
var bip32 = require('bip32');
var bip38 = require("bip38");
var bip39 = require('bip39');
var wif = require("wif");
var bigi = require("bigi");
var safeBuffer = require("safe-buffer").Buffer;

var recoverAddress = function(privateKey, type="native", testnet = false){
  try{
    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // get eliptic curves from wif
    var keyPair = bitcoin.ECPair.fromWIF(privateKey, network);
    var publicKeyBuffer = keyPair.getPublicKeyBuffer();
    var publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
    var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
    var address;

    // choose wallet type
    switch (type){
      case "legacy":
        address = keyPair.getAddress();
        break;
      case "P2SH":
        var redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
        var scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
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
    console.log(err);
    return false;
  }
};


var recoverSeed = function (seed, count = 1, type="native", bip="49", testnet = false){
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
    var wallets = [];
    var mnemonic = seed;
    var seed = bip39.mnemonicToSeed(mnemonic);

    var root = bip32.fromSeed(seed);
    var path;
    var i;
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
      
      var child = root.derivePath(path);

      var d = bigi.fromBuffer(child.privateKey);
      var keyPair = new bitcoin.ECPair(d, null, {network: network});

      var publicKeyHash = bitcoin.crypto.hash160(child.publicKey);
      var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
      var redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
      var address;

      // choose wallet type
      switch (type){
        case "legacy":
          address = keyPair.getAddress();
          break;
        case "P2SH":
          var outputScript = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
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

    // no errors return true
    return true;
  } catch (err) {
    // return false
    return false;
  }
};

var create = function (type = "native", testnet = false){
  // check network: bitcoin or testnet
  var network;
  if(testnet){
    network = bitcoin.networks.testnet;
  }else{
    network = bitcoin.networks.bitcoin;
  }

  // create new random key pair of eliptic curves
  var keyPair = bitcoin.ECPair.makeRandom({network: network});
  var publicKeyBuffer = keyPair.getPublicKeyBuffer();
  var publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
  var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
  var address;

  // choose wallet type
  switch (type){
    case "legacy":
      address = keyPair.getAddress();
      break;
    case "P2SH":
      var redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
      var scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
      address = bitcoin.address.fromOutputScript(scriptPubKey);
      break;
    default:
      address = bitcoin.address.fromOutputScript(redeemScript);
      break;
  }

  // return wallet
  var wallet = {
    "address": address,
    "privateKey": keyPair.toWIF()
  };
  return wallet;
}

var createSeed = function (count = 1, type="native", bip="49", testnet = false){
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
    var wallets = [];
    var mnemonic = bip39.generateMnemonic();
    var seed = bip39.mnemonicToSeed(mnemonic);

    var root = bip32.fromSeed(seed);
    var path;
    var i;
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
      
      var child = root.derivePath(path);

      var d = bigi.fromBuffer(child.privateKey);
      var keyPair = new bitcoin.ECPair(d, null, {network: network});

      var publicKeyHash = bitcoin.crypto.hash160(child.publicKey);
      var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
      var redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
      var address;

      // choose wallet type
      switch (type){
        case "legacy":
          address = keyPair.getAddress();
          break;
        case "P2SH":
          var outputScript = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
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
    wallet = {
      "seed": mnemonic,
      "wallets": wallets
    }
    return wallet;
  } catch(err){
    // show error
    console.log(err);
    return false;
  }
};

var createBrainWallet = function(passphrase, type="native", testnet = false){
  try{
    // check network: bitcoin or testnet
    var network;
    if(testnet){
      network = bitcoin.networks.testnet;
    }else{
      network = bitcoin.networks.bitcoin;
    }

    // create a hass buffer from passphrase
    var passphraseHash = bitcoin.crypto.sha256(safeBuffer.from(passphrase));
    var hashBuffer = bitcoin.crypto.sha256(passphraseHash);
    var d = bigi.fromBuffer(hashBuffer);

    // create an eliptic curve
    var keyPair = new bitcoin.ECPair(d, null, {network: network});

    var publicKeyBuffer = keyPair.getPublicKeyBuffer();
    var publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer);
    var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(publicKeyHash);
    var address;

    // choose wallet type
    switch (type){
      case "legacy":
        address = keyPair.getAddress();
        break;
      case "P2SH":
        var redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
        var outputScript = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
        address = bitcoin.address.fromOutputScript(outputScript);
        break;
      default:
        address = bitcoin.address.fromOutputScript(redeemScript);
        break;
    }

    // return wallet with address and private key
    var wallet = {
      "address": address,
      "privateKey": keyPair.toWIF()
    };
    return wallet;
  } catch(err){
    // show error
    console.log(err);
    return false;
  }
};

var encrypt = function(privateKey, passphrase){
  try{
    // validate private key and passphrase
    if(privateKey === ""){
      throw new Error("Invalid private key");
    }
    if(passphrase === ""){
      throw new Error("Invalid passphrase");
    }

    // encrypt key
    var decoded = wif.decode(privateKey);
    var decodedPK = decoded.privateKey;
    var compressed = decoded.compressed;
    var encryptedKey = bip38.encrypt(decodedPK, compressed, passphrase);

    // return encrypted key
    return encryptedKey;
  } catch(err){
    // show error
    console.log(err);
    return false;
  }
};

var decrypt = function (encryptedKey, passphrase, consoleLog = false){
  try {
    // validate encrypte key and passphrase
    if(encryptedKey === ""){
      throw new Error("Invalid encrypted key");
    }
    if(passphrase === ""){
      throw new Error("Invalid passphrase");
    }

    // decrypt key
    var decryptedKey = bip38.decrypt(encryptedKey,passphrase,function(status){
      if(consoleLog){
        console.log((status.percent).toFixed(2));
      }
    });

    // return wif private key
    return wif.encode(0x80, decryptedKey.privateKey, decryptedKey.compressed);
  } catch(err){
    // show error
    console.log(err);
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

