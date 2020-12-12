const Client = require("../API");
const arrange = require("./arrange");
const compare = require("./compare");
const EventEmitter = require('events');
module.exports = class GlobalAuctions extends EventEmitter {
    constructor(data){
        this.reqNum;
    }
    async init(){
        const initial = await Client.getSkyblockAuctions();
        this.reqNum=initial.info.totalPages;
        this.currentPage=0;
        this.auction = arrange(initial.auctions);
        process.on("nextTick",this.updateManager)
        return this;
    }
    get calculatedRefresh(){
        return 60000/this.reqNum
    }
    async update(){
        const auctions = await Client.getSkyblockAuctions(this.currentPage)
        this.reqNum = auctions.info.totalPages;
        const changes = compare(arrange(auctions),this.auction)
        this.auction = changes.oldMap;
        this.emit("update",...changes.changes)
    }
    async updateManager(){
        setTimeout(this.update,this.calculatedRefresh)
    }

}