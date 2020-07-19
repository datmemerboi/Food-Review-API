const schemaModel = require('./schemaModel.js');

const name = {
  createDocFn: (doc) => {
    return schemaModel.reviewModel.create(doc);
  },
  readFn: (query, page=1, limit=5) => {
    var aggregateQuery = schemaModel.reviewModel.aggregate([{ $match: query }]);
    return schemaModel.reviewModel.aggregatePaginate(aggregateQuery, {page:page, limit:limit});
  },
  updateFn: (query, updQuery) => {
    return schemaModel.reviewModel.updateOne(query, updQuery).exec();
  },
  deleteOneFn: (query, skip=0) => {
    return schemaModel.reviewModel.deleteOne(query).exec();
  },
  deleteManyFn: (query, limit=100) => {
    return schemaModel.reviewModel.deleteMany(query, { limit:limit }).exec();
  },
  allFn: (query, page=1, limit=10) => {
    var aggregateQuery = schemaModel.reviewModel.aggregate([{ $match:query } ]);
    return schemaModel.reviewModel.aggregatePaginate(aggregateQuery, {page:page, limit:limit});
  },
  findSpecificFn: (query, specific, page=1, limit=5, skip=0) => {
    return schemaModel.reviewModel.find(query, specific, { limit:limit, skip:skip }).exec();
  },
  authorRatingFn: (query, page=1, limit=10) => {
    var aggregateQuery =  schemaModel.reviewModel.aggregate([
      { $match:query },
      { $group: {
        _id:"$author",
        average: { $avg:"$rating" },
        eachRating: { $push:"$rating" },
        eachSKU: { $push:"$sku" },
      } }
    ]);
    return schemaModel.reviewModel.aggregatePaginate(aggregateQuery, {page:page, limit:limit});
  },
  timeRatingFn: (query, page=1, limit=10) => {
      var aggregateQuery = schemaModel.reviewModel.aggregate([
        { $match:query },
        { $group: { _id:"$rating", timeDist: { $push:"$date" } } },
      ]);
      return schemaModel.reviewModel.aggregatePaginate(aggregateQuery, {page:page, limit:limit});
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
