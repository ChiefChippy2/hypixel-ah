//get SB auctions isn't optimized
//this is slower, but less error
const Client = require("../API");
module.exports = {
    async getSkyblockAuctions(){
        const auction0 = await Client.getSkyblockAuctions(0);
        const auctions = {info:auction0.info,auctions:auction0.auctions}
        for(let i =1;i<auction0.info.totalPages;i++){
            let ac=await Client.getSkyblockAuctions(i);
            auctions.auctions = auctions.auctions.concat(ac.auctions);
            await new Promise(r=>setTimeout(r,2000));
        }
        return auctions;
    }
}