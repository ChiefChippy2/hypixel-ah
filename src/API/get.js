const Objectify = require("../Utils/Objectify");
module.exports = (cli,id) => {
    if(!cli.auction) return {"success":"false","reason":"Server not initialized. Try again in a few seconds."};
    if(!cli.auction.get(id)) return {'success':'false','reason':"Not Found ( uncached ? )"}
    return {'success':true,"data":Objectify(cli.auction.get({id}))};
}