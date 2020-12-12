const Objectify = require("../Utils/Objectify");
module.exports = function (newMap, oldMap) {
    const changes=[] //respectively : NEW, BID, ENDING ( 10 minutes before), END
    newMap.forEach((value,key,map)=>{
        const oldVal = oldMap.get(key)
        if(!oldVal){
            oldMap.set(key,value);
            return changes[0].push(Objectify(value));
        }
        if((value.auctionEnd-new Date())<1000 && !value.ended){
            value.ended = true; // no twice emit
            oldMap.set(key,value)
            return changes[3].push(key)
        }
        if((value.auctionEnd-new Date())<1000*60*10 && !value.ending){
            value.ending = true;
            oldMap.set(key,value)
            return changes[2].push(key)
        }
        if(value.bid.length!==oldVal.bid.length){
            oldMap.set(key,value)
            return changes[1].push({auctionId:key,bid:Objectify(value.bid)})
        }
    })
    return {changes,oldMap};
}