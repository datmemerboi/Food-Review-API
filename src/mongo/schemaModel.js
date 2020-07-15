const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/Bewgle", {useNewUrlParser: true, useUnifiedTopology: true});


var reviewSchema = new Schema({
  rid: mongoose.ObjectId,
  text: 'String',
  date: Date,
  sku: String,
  slot: String,
  rating: Number,
  source: String,
  author: String,
  verified: Boolean
});

var reviewModel = mongoose.model('reviews', reviewSchema);

module.exports = { reviewModel: reviewModel, reviewSchema: reviewSchema }
