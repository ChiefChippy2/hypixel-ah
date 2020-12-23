const db = require("./index");
function computeName(a,i){
    return i.i[0].id+i.i[0].tag.display.Lore[1];
}
module.exports = async function(auction){
    let info = await auction.itemBytes.readNBT();
    const name = computeName(auction,info)
    let prices = await db.get(name)||"";
    prices+=(";"+Math.round(Number(auction.price/info.i[0].Count)));
    await db.set(name,prices);
}