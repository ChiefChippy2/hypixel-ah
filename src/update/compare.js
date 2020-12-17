const Objectify = require("../Utils/Objectify");
const Compress = require("../Utils/Compress");
const {names} = require("../constants.json");
module.exports = function (newMap, oldMap) {
    const changes={NEW:[],BID:[],ENDING:[],END:[]} //respectively : NEW, BID, ENDING ( 10 minutes before), END
    newMap.forEach((value,key)=>{
        const oldVal = oldMap.get(key)
        if(!oldVal){
            oldMap.set(key,Compress(value));
            return changes.NEW.push(Objectify(value));
        }
        let indexes = ["auctionEnd","bids","ending","ended"].map(x=>names.indexOf(x));
        if((value.auctionEnd-new Date())<1000 && !oldVal[indexes[3]]){
            value.ended = true; // no twice emit
            oldMap.set(key,Compress(value))
            return changes.END.push(key)
        }
        if((value.auctionEnd-new Date())<1000*60*10 && !oldVal[indexes[3]]){
            value.ending = true;
            oldMap.set(key,Compress(value))
            return changes.ENDING.push(key)
        }
        if(value.bids.length!==oldVal[indexes[1]].length){
            oldMap.set(key,Compress(value))
            return changes.BID.push({auctionId:key,bids:Objectify(value.bids)})
        }
    })
    return {changes,oldMap};
}