const Hypixel=require("../../hypixel-api-reborn2/src/index");
module.exports=new Hypixel.Client(process.env.API,{
    rateLimit:"NONE",
    cacheTime:120,
    cacheFilter:"skyblock/auctions"
});
