//get SB auctions isn't optimized
const Client = require("../API");
module.exports = {
    async getSkyblockAuctions(){
        const auction0 = await Client.getSkyblockAuctions(0);
        const auctions = {info:auction0.info,auctions:[auction0]}
        for(let i =1;i<auction0.info.totalPages;i++){
            auctions.auctions.push(Client.getSkyblockAuctions(i));
        }
        auctions.auctions = (await Promise.all(auctions.auctions)).map(x=>x.auctions).flat();
        return auctions;
    }
}