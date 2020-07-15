const axios = require('axios');

var query = { author:{ $eq:"Foodie101" } };
var specific = { _id:0, rid:1, author:1, text:1, source:1 }

axios.post('http://localhost:8080/find/', [query, specific])
  .then(res => {
    console.log(res.status);
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  })
