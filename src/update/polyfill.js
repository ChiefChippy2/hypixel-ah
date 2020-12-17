//get SB auctions isn't optimized
const Client = require("../API");
const Compress = require("../Utils/Compress");
function failLess(prom){
    return new Promise((resolve,reject)=>{
        prom.then(resolve).catch(e=>{console.warn(e);resolve("")})
    })
}
module.exports = {
    async getSkyblockAuctions(){
        const failsafe = setTimeout(()=>{throw new Error("Polyfill took too long, aborting")},parseInt(process.env.TIMER)||30000)
        const auction0 = await Client.getSkyblockAuctions(0);
        const auctions = {info:auction0.info,auctions:[auction0]}
        for(let i =1;i<auction0.info.totalPages;i++){
            auctions.auctions.push(failLess(Client.getSkyblockAuctions(i)));
        }
        auctions.auctions = (await Promise.all(auctions.auctions)).filter(x=>x).map(x=>x.auctions.map(x=>Compress(x))).flat();
        clearTimeout(failsafe);
        return auctions;
    }
}