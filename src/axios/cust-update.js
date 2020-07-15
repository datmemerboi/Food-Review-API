const axios = require('axios');

var sampleData = {
  text:"Had a really nice time!\nWill make sure to visit soon!"
}
var updatedSample = {
  text: "Has a wonderful time!\nWill surely visit again!!"
}
axios.post('http://localhost:8080/update', [sampleData, updatedSample])
  .then((res) => {
    console.log(res.status);
  })
  .catch(err=>{
    console.log(err);
  })
