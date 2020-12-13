module.exports = (cli) => {
    if(!cli.auctions) return {"success":"false","reason":"Server not initialized. Try again in a few seconds."};
    return {'success':true,"data":cli.auctions.values()};
}