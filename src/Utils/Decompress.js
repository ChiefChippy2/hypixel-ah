const {names} = require("../constants.json");
module.exports = function (obj){
  let b={}
  for(let i =0;i<obj.length;i++){
    if(!obj[i]) continue;
    b[names[i]]=obj[i];
  }
return b
}