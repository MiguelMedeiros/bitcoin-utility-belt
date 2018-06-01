// import libs
let bitcoin = require("bitcoinjs-lib");
let fetch = require("node-fetch");
let wallet = require("./wallet");
let inArray = require('in-array');

let address = (address) => {  
  return fetch("https://api.smartbit.com.au/v1/blockchain/address/"+address)
    .then(res => res.json())
    .then(json => {
      return json.address;
    })
    .catch(err => console.error(err));
};

let block = (number, noTx = false) => {
  let url = "https://api.smartbit.com.au/v1/blockchain/block/"+number;

  if(noTx){
    url = url+"?tx=0";
  }

  return fetch (url)
  .then(res => res.json())
    .then(json => {
      return json.block;
  })
  .catch(err => console.error(err));
};

let blocks = (limit = 10, sort = "", dir = "desc", next = "") => {
  let url = "https://api.smartbit.com.au/v1/blockchain/blocks?";

  if(limit){
    url = url+"limit="+limit;
  }
  
  let sortWords = ["height","hash","size","transaction_count","input_amount","output_amount","fees","input_count","output_count"];
  if(sort && inArray(sortWords, sort)){
    url = url+"&sort="+sort;
  }

  let dirWords = ["desc", "asc"];
  if(dir && inArray(dirWords, dir)){
    url = url+"&dir="+dir;
  }

  if(next){
    url = url+"&next="+next;
  }
  return fetch (url)
  .then(res => res.json())
    .then(json => {
      return json.block;
  })
  .catch(err => console.error(err));
};


let search = (message) => {
  return fetch("https://api.smartbit.com.au/v1/blockchain/search?q="+message)
    .then(res => res.json())
    .then(json => {
      return json.results;
    })
    .catch(err => console.error(err));
};

let totals = () => {
  return fetch ("https://api.smartbit.com.au/v1/blockchain/totals")
  .then(res => res.json())
    .then(json => {
      return json.totals;
  })
  .catch(err => console.error(err));
};

let stats = (days = 1) => {
  return fetch("https://api.smartbit.com.au/v1/blockchain/stats?days="+days)
  .then(res => res.json())
    .then(json => {
      return json.stats;
  })
  .catch(err => console.error(err));
};

let pool = (name, limit = 0, sort = "", dir = "desc") => {
  let url = "https://api.smartbit.com.au/v1/blockchain/pool/"+name+"?";
  
  if(limit){
    url = url+"limit="+limit;
  }

  let sortWords = ["height","hash","size","transaction_count","input_amount","output_amount","fees","input_count","output_count"];
  if(sort && inArray(sortWords, sort)){
    url = url+"&sort="+sort;
  }

  let dirWords = [
    "desc", 
    "asc"
  ];
  if(dir && inArray(dirWords, dir)){
    url = url+"&dir="+dir;
  }
  return fetch(url)
  .then(res => res.json())
    .then(json => {
      return json.pool;
  })
  .catch(err => console.error(err));
};

let pools = (limit = 0, sort = "", dir = "asc", next = "") => {
  let url = "https://api.smartbit.com.au/v1/blockchain/pools?";
  
  if(limit){
    url = url+"limit="+limit;
  }
  
  let sortWords = ["block_count","name","transaction_count","reward_amount","fee_amount","size"];
  if(sort && inArray(sortWords, sort)){
    url = url+"&sort="+sort;
  }

  let dirWords = ["desc", "asc"];
  if(dir && inArray(dirWords, dir)){
    url = url+"&dir="+dir;
  }

  if(next){
    url = url+"&next="+next;
  }

  return fetch(url)
  .then(res => res.json())
    .then(json => {
      return json.pools;
  })
  .catch(err => console.error(err));
};

// export functions
module.exports = {
  address: address,
  block: block,
  blocks: blocks,
  pool: pool,
  pools: pools,
  search: search,
  stats: stats,
  totals: totals
};