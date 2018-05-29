// import libs
var bitcoin = require('bitcoinjs-lib');
var bitcoinMessage = require('bitcoinjs-message');
var bip38 = require('bip38');
var wif = require('wif');
var bigi = require('bigi');
var safeBuffer = require('safe-buffer').Buffer;

var createWallet = function (type = 'default', testnet = false){
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
		let keyPair;
		switch (type){
			default:
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

var createBrainWallet = function(passphrase, testnet = false){
	try{
		// check network: bitcoin or testnet
		let network;
		if(testnet){
			network = bitcoin.networks.testnet;
		}else{
			network = bitcoin.networks.bitcoin;
		}

		// create a hass buffer from passphrase
		let hashBuffer = bitcoin.crypto.sha256(bitcoin.crypto.sha256(safeBuffer.from(passphrase)));
	    let d = bigi.fromBuffer(hashBuffer);

	    // create an eliptic curve
	    let keyPair = new bitcoin.ECPair(d, null, {network: network});

	    // return wallet
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
		let network;
		if(testnet){
			network = bitcoin.networks.testnet;
		}else{
			network = bitcoin.networks.bitcoin;
		}
		let keyPair = bitcoin.ECPair.fromWIF(privateKey, network);
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
		let network;
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

		// return signature
		return bitcoinMessage.sign(message, privateKeyBuffer, keyPair.compressed).toString('base64');
	}
	catch(err){
		console.log(err);
		return false;
	}
};

var verifyMessage = function (message, address, signature, testnet = false){
	try{
		// check network: bitcoin or testnet
		let network;
		if(testnet){
			network = bitcoin.networks.testnet;
		}else{
			network = bitcoin.networks.bitcoin;
		}

		if(validateAddress(address, network)){
			throw new Error("Invalid address");
		}
		if(signature === "" && signature.lenght != 64){
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
	 	let decoded = wif.decode(privateKey);
		let encryptedKey = bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase);

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
	createWallet: createWallet,
	createBrainWallet: createBrainWallet,
	getAddress: getAddress,
	validateAddress: validateAddress,
	signMessage: signMessage,
	verifyMessage: verifyMessage,
	verifyMessage: verifyMessage,
	bip38Encrypt: bip38Encrypt,
	bip38Decrypt: bip38Decrypt
}