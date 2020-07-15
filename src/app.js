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

router.post('/read', (req,res) => {
  interMod.readFn(req.body).then(doc => {
    console.log(typeof(doc));
    return res.status(200).json(doc);
  }).catch(err => { console.log(err); });
});

router.post('/read/limit/:lt/skip/:sk', (req,res) => {
  interMod.readFn(req.body, limit=req.params.lt, skip=req.params.sk).then(doc => {
    return res.status(200).json(doc);
  }).catch(err => { console.log(err); });
});

router.post('/update', (req, res) => {
  if(req.body.length>1){
    var query = req.body[0]; var updQuery = req.body[1];
    interMod.updateFn(query, updQuery).then(res=>{
      console.log("Record updated!");
    }).catch(err => { console.log(err); });
    res.sendStatus(200);
  }
  else{ res.sendStatus(404); };
});

router.post('/deleteOne', (req, res) => {
  interMod.deleteOneFn(req.body).then(res => {
    console.log("One record removed!");
  }).catch(err => { console.log(err); });
  res.sendStatus(200);
});

router.post('/deleteMany', (req,res) => {
  interMod.deleteManyFn(req.body).then(res => {
    console.log("Multiple records removed!");
  }).catch(err => { console.log(err); });
  res.sendStatus(200);
});

router.all('/all', (req,res) => {
  interMod.allFn({}).then((docs) => {
    if(!docs){ throw new Error("No documents available!") }
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.all('/all/limit/:lt/skip/:sk', (req,res) => {
  interMod.allFn({}, limit=parseInt(req.params.lt), skip=parseInt(req.params.sk)).then((docs) => {
    if(!docs){ throw new Error("No more documents!") }
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.post('/find', (req,res) => {
  if(req.body.length>1){
    interMod.specificFindFn(req.body[0], req.body[1]).then(doc => {
      return res.status(200).json(doc)
    }).catch(err => { console.log(err); });
  }
  else { res.sendStatus(404); }
});

router.all('/stats/time/ratings', (req,res) => {
  interMod.timeRatingFn({}).then(docs => {
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.all('/stats/sku/:sku/ratings', (req,res) => {
  interMod.skuRatingFn({ sku: { $eq:req.params.sku } }).then(docs => {
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

router.all('/stats/author/ratings', (req,res) => {
  interMod.authorRatingFn({}).then(docs => {
    return res.status(200).json(docs);
  }).catch(err => { console.log(err); });
});

app.listen(PORT);
console.log("Running server at http://127.0.0.1:"+PORT+"/");
