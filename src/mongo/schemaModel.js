const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Bewgle", {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

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

reviewSchema.plugin(mongooseAggregatePaginate)

var reviewModel = mongoose.model('reviews', reviewSchema);

module.exports = { reviewModel: reviewModel, reviewSchema: reviewSchema }
