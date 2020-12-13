/*
    If a different db than quick.db is wished to be used :
    It must contain a set, get, and delete method
    It can be sync or async, but NO CALLBACKS.
    If something doesn't exist, it should NOT throw an error,
    but return undefined or any falsy value
    Ofc, the speed should be fast enough.
    For the moment, this db is only used for storing banned IPs
    Everything will be stored as string, so no issues usually

*/
if(process.env.DBModule)  module.exports = require(process.env.DBModule);
else if(process.env.NODB) module.exports = {"set":()=>true,"get":()=>false,"delete":()=>true}
else {
    const quick = require("quick.db");
    module.exports = {
        "set":(key,value)=>quick.set(key,value),
        "get":(key)=>quick.get(key),
        "delete":(key)=>quick.delete(key),
    }
}