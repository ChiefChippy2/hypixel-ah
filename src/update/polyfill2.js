//get SB auctions isn't optimized
//this is slower, but less error
const Client = require("../API");
const Compress = require("../Utils/Compress");
module.exports = {
    async getSkyblockAuctions(){
        const errCount = [];
        const auction0 = await Client.getSkyblockAuctions(0);
        const auctions = {info:auction0.info,auctions:auction0.auctions}
        for(let i =1;i<auction0.info.totalPages;i++){
            try{
            let ac=await Client.getSkyblockAuctions(i);
            auctions.auctions = auctions.auctions.concat(ac.auctions.map(x=>Compress(x)));
            await new Promise(r=>setTimeout(r,200));
            }catch(e){
                //gotchu fam
                errCount[i]+=1;
                if(errCount>process.env.MAX_RETRY||3) continue;
                i--
            }
        }
        return auctions;
    }
}