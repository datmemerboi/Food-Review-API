const axios = require('axios');

var query = {
  author: { $eq:"Munna<3Food" }
}

axios.post('http://localhost:8080/deleteOne', query)
  .then((res) => {
    console.log(res.status);
  })
  .catch(err=>{
    console.log(err);
  })
  axios.post('http://localhost:8080/deleteMany', query)
  .then((res) => {
    console.log(res.status);
  })
  .catch(err => {
    console.log(err);
  })
