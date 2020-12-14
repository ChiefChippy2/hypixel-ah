const Obj= require("./Objectify")
module.exports = function (classObj){
  return classObj;
  let a= Obj(classObj),b={}
  let lon=[]
  for(let name in a){
    b[lon.length]=a[name];
    lon.push(name)
  }
  b.keys=lon
return b
}