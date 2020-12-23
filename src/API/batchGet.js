const Decompress = require("../Utils/Decompress");
module.exports = (cli,{ids}) => {
    if(!cli.auction) return {"success":"false","reason":"Server not initialized. Try again in a few seconds."};
    if(ids.length>50) return {"success":"false","reason":"Too much IDs."};
    const data = ids.map(x=>Decompress(cli.auction.get(x)))
    return {'success':true,data};
}
