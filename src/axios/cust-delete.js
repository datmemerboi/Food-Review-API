const axios = require('axios');

var sampleData = {
  author: { $eq:"Munna<3Food" }
}

axios.post('http://localhost:8080/deleteMany', sampleData)
  .then((res) => {
    console.log(res.status);
  })
  .catch(err => {
    console.log(err);
  })
// axios.post('http://localhost:8080/deleteOne', sampleData)
//   .then((res) => {
//     console.log(res.status);
//   })
//   .catch(err=>{
//     console.log(err);
//   })
