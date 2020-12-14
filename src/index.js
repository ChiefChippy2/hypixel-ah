const Auctions = require("./update/getAuctions");
const AuctionUpdate = new Auctions();
const webSocket = require('./ws/ws');
const dispatch = require('./ws/dispatch');
async function updater(){
    setTimeout(()=>{
        AuctionUpdate.update().then(updater)
    },AuctionUpdate.calculatedRefresh)
}
async function start(){
    await AuctionUpdate.init();
    console.log("WS Acceping connection")
    const ws = new webSocket(AuctionUpdate);
    process.nextTick(()=>{
    ws.init();
    const dispatching = new dispatch(ws,AuctionUpdate);
    updater();
    })
}
//setInterval(()=>console.log(process.memoryUsage().rss/1024/1024),3000)
//memory profiling...not needed
start();