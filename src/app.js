const express = require('express');
const app = express();
const router = express.Router();
const interMod = require('./mongo/interaction-module.js');
const path = require('path');
const fs = require('fs');

app.use(express.json()); app.use(router)

process.argv[2] ? PORT = parseInt(process.argv[2]) : PORT = 8080

router.all('/', (req, res) => {
  fs.readFile( path.join(__dirname, '..', 'public', 'index.html'), (err,html) => {
    if(err) { throw err }
    else {
      res.writeHead(200, {'Content-type': 'text/html'});
      res.write(html);
      res.end();
    }
  });
});

router.post('/create', (req, res) => {
  interMod.createDocFn(req.body).then(res => {
    console.log("Record created!");
  }).catch(err => { console.log(err); });
  res.sendStatus(200);
});

router.all('/read', (req,res) => {
  var page = parseInt(req.query.page )|| 1; var limit = parseInt(req.query.limit) || 5;
  interMod.readFn(req.body, page=page, limit=limit).then(doc => {
    console.log(typeof(doc));
    return res.status(200).json(doc);
  }).catch(err => { console.log(err); });
});

router.post('/read/page/:pg/limit/:lt', (req,res) => {
  interMod.readFn(req.body, page=parseInt(req.params.pg), limit=parseInt(req.params.lt)).then(doc => {
    return res.status(200).json(doc);
  }).catch(err => { console.log(err); });
});

router.all('/update', (req, res) => {
  if(req.body.length>1){
    var query = req.body[0]; var updQuery = req.body[1];
    interMod.updateFn(query, updQuery).then(res=>{
      console.log("Record updated!");
    }).catch(err => { console.log(err); });
    res.sendStatus(200);
  }
  else{ res.sendStatus(404); };
});

router.all('/deleteOne', (req, res) => {
  var skip = parseInt(req.query.skip) || 0;
  interMod.deleteOneFn(req.body, skip=skip).then(res => {
    console.log("One record removed!");
  }).catch(err => { console.log(err); });
  res.sendStatus(200);
});

router.all('/deleteMany', (req,res) => {
  var limit = parseInt(req.query.limit) || 100;
  interMod.deleteManyFn(req.body, limit=limit).then(res => {
    console.log("Multiple records removed!");
  }).catch(err => { console.log(err); });
  res.sendStatus(200);
});

router.all('/all', (req,res) => {
  var page = parseInt(req.query.page) || 1; var limit = parseInt(req.query.limit) || 10;
  interMod.allFn({}).then((docs) => {
    if(!docs){ throw new Error("No documents available!") }
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.post('/all/page/:pg/limit/:lt', (req,res) => {
  interMod.allFn({}, page=parseInt(req.params.pg), limit=parseInt(req.params.lt)).then((docs) => {
    if(!docs){ throw new Error("No more documents!") }
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.all('/find', (req,res) => {
  if(req.body.length>1){
    var page = parseInt(req.query.page) || 1; var limit = parseInt(req.query.limit) || 5;
    var skip = parseInt(req.query.skip) || 0;
    interMod.findSpecificFn(req.body[0], req.body[1], page=page, limit=limit, skip=skip).then(doc => {
      return res.status(200).json(doc)
    }).catch(err => { console.log(err); });
  }
  else { res.sendStatus(404); }
});

router.all('/stats/author/ratings', (req,res) => {
  var page = parseInt(req.query.page) || 1; var limit = parseInt(req.query.limit) || 10;
  interMod.authorRatingFn({}, page=page, limit=limit).then(docs => {
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.all('/stats/time/ratings', (req,res) => {
  var page = parseInt(req.query.page) || 1; var limit = parseInt(req.query.limit) || 10;
  interMod.timeRatingFn({}, page=page, limit=limit).then(docs => {
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.all('/stats/sku/:sku/ratings', (req,res) => {
  interMod.skuRatingFn({ sku: { $eq:req.params.sku } }).then(docs => {
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

app.listen(PORT);
console.log("Running server at http://127.0.0.1:"+PORT+"/");
