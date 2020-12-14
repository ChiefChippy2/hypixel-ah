const Objectify = require("../Utils/Objectify");
const {rarity} = require("../constants");
module.exports = (cli,{number,skip,sort,order,binOnly,filter,criteria}) => {
    if(!number) number=100
    if(!sort) sort="startDate"
    if(!skip) skip=0
    if(!order) order="d"
    if(!cli.auction) return {"success":"false","reason":"Server not initialized. Try again in a few seconds."};
    if(cli.auction.length>=skip) return {'success':'false','reason':'Out of range'}
    if(number>1000) number = 1000; // No lag ty... 1000 already takes 2mb usually
    let results=[];
    const orderHandle = (-1)**Number(order==="d");
    switch(sort){
        case "startDate":results=Array.from(cli.auction.values()).sort((a,b)=>(a.auctionStartTimestamp-b.auctionStartTimestamp)*orderHandle).slice(0+skip,number+skip);break;
        case "bid":results=Array.from(cli.auction.values()).sort((a,b)=>(a.highestBid-b.highestBid)*orderHandle).slice(0+skip,number+skip);break;
        case "rarity":results=Array.from(cli.auction.values()).sort((a,b)=>(rarity.indexOf(a.rarity)-rarity.indexOf(b.rarity))*orderHandle).slice(0+skip,number+skip);break;
        case "endDate":results=Array.from(cli.auction.values()).sort((a,b)=>(a.actionEndTimestamp-b.auctionEndTimestamp)*orderHandle).slice(0+skip,number+skip);break;
        case "discover":const rando = Math.floor(Math.random()*(cli.auction.length-number));results=Array.from(cli.auction.values()).slice(rando,rando+number)
    }
    return {"success":"true","data":results.map(x=>Objectify(x))}
}
