// import libs
let bitcoin = require("bitcoinjs-lib");
let wallet = require("./wallet");

//let alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
//let txb = new bitcoin.TransactionBuilder();

/*txb.setVersion(1);
// Alice's previous transaction output, has 15000 satoshis
txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0); 
// (in)15000 - (out)12000 = (fee)3000, this is the miner fee
txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000);

txb.sign(0, alice);*/

// prepare for broadcast to the Bitcoin network, see "can broadcast a Transaction" below
//console.log(txb.build().toHex());
//console.log(alice.getAddress(),txb);
