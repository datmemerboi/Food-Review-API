const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Bewgle", {useNewUrlParser: true, useUnifiedTopology: true});
const schemaModel = require('./schemaModel.js');

var authorsArr = ['Foodie Diary', 'JasonEats', 'Foodie101', 'Ravi', 'Ramesh', 'Aakaash', 'Sathish', 'Saravanan!', 'AverageChennaiFoodie']
var skuArr = ["soi_candolim,_goa", "shizusan_viman_nagar,_pune", "savya_rasa_koregaon_park,_pune", "lotus_cafe_-_jw_marriott_mumbai_juhu_juhu,_mumbai"]
var slotArr = ["soi_candolim,_goa|zomato.com", "shizusan_viman_nagar,_pune|zomato.com", "savya_rasa_koregaon_park,_pune|zomato.com", "lotus_cafe_-_jw_marriott_mumbai_juhu_juhu,_mumbai|zomato.com"]

for (var i = 0; i < 10; i++) {
  var doc = {
    rid: new mongoose.Types.ObjectId,
    text: "Anybody ordered some Fried Saurkrauts!??!",
    sku: skuArr[Math.floor(Math.random()*skuArr.length)],
    slot: slotArr[Math.floor(Math.random()*slotArr.length)],
    date: new Date().toString(),
    rating: 3,
    source: 'ZoomAto.com',
    author: authorsArr[Math.floor(Math.random()*authorsArr.length)],
    verified: true
  }
  schemaModel.reviewModel.create(doc, (err) => { if(err){  throw err } });
}
for (var i = 0; i < 10; i++) {
  var doc = {
    rid: new mongoose.Types.ObjectId,
    text: "Lorem ipsum text..\n\nLorem ispum text",
    sku: skuArr[Math.floor(Math.random()*skuArr.length)],
    slot: slotArr[Math.floor(Math.random()*slotArr.length)],
    date: new Date().toString(),
    rating: 5,
    source: 'zomato.com',
    author: authorsArr[Math.floor(Math.random()*authorsArr.length)],
    verified: true
  }
  schemaModel.reviewModel.create(doc, (err) => { if(err){  throw err } });
}
