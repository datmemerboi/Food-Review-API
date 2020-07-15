const schemaModel = require('./schemaModel.js');

const name = {
  createDocFn: (doc) => {
    return schemaModel.reviewModel.create(doc);
  },
  readFn: (query, limit=5, skip=0) => {
    return schemaModel.reviewModel.aggregate([
      { $match:query },
      { $limit:limit },
      { $skip:skip }
    ]).exec();
  },
  updateFn: (query, updQuery) => {
    return schemaModel.reviewModel.updateOne(query, updQuery).exec();
  },
  deleteOneFn: (query) => {
    return schemaModel.reviewModel.deleteOne(query).exec();
  },
  deleteManyFn: (query, limit=100) => {
    return schemaModel.reviewModel.deleteMany(query, { limit:limit }).exec();
  },
  allFn: (query, limit=10, skip=0) => {
    return schemaModel.reviewModel.aggregate([
      { $match:query },
      { $limit:limit },
      { $skip:skip }
    ]).exec();
  },
  specificFindFn: (query, specific, limit=4, skip=0) => {
    return schemaModel.reviewModel.find(query, specific, { limit:limit, skip:skip }).exec();
  },
  authorRatingFn: (query, limit=10, skip=0) => {
    return schemaModel.reviewModel.aggregate([
      { $match:query },
      { $group: {
        _id:"$author",
        average: { $avg:"$rating" },
        eachRating: { $push:"$rating" },
        eachSKU: { $push:"$sku" },
      } },
      { $limit:limit },
      { $skip:skip },
    ]).exec();
  },
  timeRatingFn: (query, limit=20, skip=0) => {
      return schemaModel.reviewModel.aggregate([
        { $match:query },
        { $group: { _id:"$rating", timeDist: { $push:"$date" } } },
        { $limit:limit },
        { $skip:skip }
      ]).exec();
  },
  skuRatingFn: (query) => {
    return schemaModel.reviewModel.aggregate([
      { $match:query },
      { $group: {
        _id:"$sku",
        ratings: { $push:"$rating" },
        avgRating: { $avg:"$rating" },
        timeDist: { $push:"$date" }
      } },
      { $project: {_id:0, ratings:1, avgRating:1, timeDist:1 } }
    ]).exec();
  }
}

module.exports = name
