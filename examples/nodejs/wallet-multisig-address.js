// import bitcoin utility belt
let belt = require("bitcoin-utility-belt");

// public key hex format
let pubKeysHex = [
	'026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
	'02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
	'023e4740d0ba639e28963f3476157b7cf2fb7c6fdf4254f97099cf8670b505ea59',
	'03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
];

//3 to 4 multisig address type P2SH
let multiSigAddress = belt.wallet.createMultiSig(pubKeysHex, 3, "P2SH");
console.log(multiSigAddress);

// 2 to 4 multisig address type P2WSH
multiSigAddress = belt.wallet.createMultiSig(pubKeysHex, 2, "P2WSH");
console.log(multiSigAddress);