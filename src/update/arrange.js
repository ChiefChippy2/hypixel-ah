//Hypixel-api-reborn has a pretty mediocre auctions class
//we need to provided changes in REAL TIME, and we can't just send a whole page's content to user, 
//conclusion : rearrange it into a map, with auctionId as id
module.exports = function(data=[]){
    const arranged = new Map();
    data.forEach(auction=>{
        arranged.set(auction.auctionId,auction)
    })
    return arranged;

}