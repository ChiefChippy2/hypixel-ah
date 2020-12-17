const Obj= require("./Objectify")
const {names} = require("../constants.json");
module.exports = function (classObj){
  let a= Obj(classObj),b=[]
  for(let name in a){
    b[names.indexOf(name)]=a[name];
  }
return b
}