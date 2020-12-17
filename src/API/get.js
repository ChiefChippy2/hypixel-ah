const Decompress = require("../Utils/Decompress");
module.exports = (cli,{id}) => {
    if(!cli.auction) return {"success":"false","reason":"Server not initialized. Try again in a few seconds."};
    if(!cli.auction.get(id)) return {'success':'false','reason':"Not Found ( uncached ? )"}
    return {'success':true,"data":Decompress(cli.auction.get(id))};
}
