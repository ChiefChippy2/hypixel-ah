const Hypixel=require("hypixel-api-reborn");
module.exports=new Hypixel.Client(process.env.API,{
    rateLimit:"NONE",
    cacheTime:120,
    cacheFilter:"auctions"
});
