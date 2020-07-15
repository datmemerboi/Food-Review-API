const axios = require('axios');
const mongoose = require('mongoose');

var sampleData = {
  rid: new mongoose.Types.ObjectId,
  text:"Had a really nice time!\nWill make sure to visit soon!",
  sku:"osb_mambalam,_chennai",
  slot:"osb_mambalam,_chennai|Foodsta.com",
  author:"AverageChennaiFoodie",
  date: new Date(),
  rating: 5,
  source: "Foodsta.com",
  verified: true
}
axios.post('http://localhost:8080/create', sampleData)
  .then((res) => {
    console.log(res.status);
  })
  .catch(err=>{
    console.log(err);
  })
