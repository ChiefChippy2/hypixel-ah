const Client = require("../API");
const store = require("../database/store.js");
module.exports = async function(oldMap){
    let toBeRemoved = await Client.getEndedSkyblockAuctions(true);
    const writes=[];
    toBeRemoved.auctions.forEach(auction=>{
        if(oldMap.delete(auction.auctionId)) writes=writes;//writes.push(store(auction));
        
    })
    await Promise.all(writes);
    return [oldMap,toBeRemoved];
}