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
    AuctionUpdate.on("_initialized",console.log);
    console.log("WS Acceping connection")
    process.nextTick(()=>{const ws = new webSocket(AuctionUpdate);
    ws.init();
    const dispatching = new dispatch(ws,AuctionUpdate);
    updater();
    })
}
start();