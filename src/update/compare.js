const Objectify = require("../Utils/Objectify");
module.exports = function (newMap, oldMap) {
    const changes={NEW:[],BID:[],ENDING:[],END:[]} //respectively : NEW, BID, ENDING ( 10 minutes before), END
    newMap.forEach((value,key)=>{
        const oldVal = oldMap.get(key)
        if(!oldVal){
            oldMap.set(key,value);
            return changes.NEW.push(Objectify(value));
        }
        let indexes = ["auctionEnd","bids"].map(x=>x);
        if((value[indexes[0]]-new Date())<1000 && !value.ended){
            value.ended = true; // no twice emit
            oldMap.set(key,value)
            return changes.END.push(key)
        }
        if((value[indexes[0]]-new Date())<1000*60*10 && !value.ending){
            value.ending = true;
            oldMap.set(key,value)
            return changes.ENDING.push(key)
        }
        if(value[indexes[1]].length!==oldVal[indexes[1]].length){
            oldMap.set(key,value)
            return changes.BID.push({auctionId:key,bids:(value[indexes[1]])})
        }
    })
    return {changes,oldMap};
}