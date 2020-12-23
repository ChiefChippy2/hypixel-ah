const Decompress = require("../Utils/Decompress");
const toUUID = require("../Utils/toUUID.js")
const {rarity,names} = require("../constants");
const indexes = ["auctionStartTimestamp","highestBid","rarity","auctionEndTimestamp"].map(x=>names.indexOf(x));
module.exports = (cli,{number,skip,sort,order,binOnly,from}) => {
    number=parseInt(number)
    skip=parseInt(skip)
    if(!number) number=100
    if(!sort) sort="startDate"
    if(!skip) skip=0
    if(!order) order="d"
    if(!cli.auction) return {"success":"false","reason":"Server not initialized. Try again in a few seconds."};
    if(cli.auction.length>=skip) return {'success':'false','reason':'Out of range'}
    if(number>1000) number = 1000; // No lag ty... 1000 already takes 2mb usually
    let results=Array.from(cli.auction.values());
    if(binOnly) {
        binOnly = String(binOnly) !== "no"
        results = results.filter(x=>x.bin===x.binOnly)
    }
    if(from){
        from = await toUUID(from);
        results = results.filter(x=>x.auctioneerUuid===from);
    }
    const orderHandle = (-1)**Number(order==="d");
    switch(sort){
        case "startDate":results=results.sort((a,b)=>(a[indexes[0]]-b[indexes[0]])*orderHandle).slice(0+skip,number+skip);break;
        case "bid":results=results.sort((a,b)=>(a[indexes[1]]-b[indexes[1]])*orderHandle).slice(0+skip,number+skip);break;
        case "rarity":results=results.sort((a,b)=>(rarity.indexOf(a[indexes[2]])-rarity.indexOf(b[indexes[2]]))*orderHandle).slice(0+skip,number+skip);break;
        case "endDate":results=results.sort((a,b)=>(a[indexes[3]]-b[indexes[3]])*orderHandle).slice(0+skip,number+skip);break;
        case "discover":const rando = Math.floor(Math.random()*(cli.auction.length-number));results=results.slice(rando,rando+number)
    }
    return {"success":"true","data":results.map(x=>Decompress(x))}
}
