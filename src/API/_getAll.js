module.exports = (cli) => {
    if(!cli.auction) return {"success":"false","reason":"Server not initialized. Try again in a few seconds."};
    const a =Array.from(cli.auction.values());
    console.log("Might crash....")
    return {'success':true,"data":a};
}