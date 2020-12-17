const Client = require("../API");
const PolyFill = require("./polyfill"+(process.env.SAFE?"2":""));
const arrange = require("./arrange");
const compare = require("./compare");
const EventEmitter = require('events');
module.exports = class GlobalAuctions extends EventEmitter {
    constructor(data){
        super()
        this.reqNum;
    }
    async init(){
        const initial = await PolyFill.getSkyblockAuctions();
        this.emit("_initialized")
        this.reqNum=initial.info.totalPages;
        this.currentPage=0;
        this.auction = arrange(initial.auctions);
        console.log("Done init")
        return this;
    }
    get calculatedRefresh(){
        return 60000/this.reqNum
    }
    async update(){
        const auctions = await Client.getSkyblockAuctions(this.currentPage)
        this.reqNum = auctions.info.totalPages;
        const changes = compare(arrange(auctions.auctions),this.auction)
        this.auction = changes.oldMap;
        this.currentPage++;
        if(this.currentPage>this.reqNum) this.currentPage=0;
        this.emit("update",changes.changes)
        return this
    }
}