const AuctionUpdate = new require("./update/getAuctions")();
async function start(){
    await AuctionUpdate.init();
}
