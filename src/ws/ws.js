const ws = require("ws");
const rateLimiter = require("../Private/rateLimit");
const API = require("../API/");
const parseMessage = require("./parse.js");
const wss = new ws.Server({port:8090});
wss.on('listening',()=>console.log('Hypixel-ah WebSocket is listening to requests!', wss.address()))
wss.on('error',()=>{throw new Error("Unexpected WS closure")});
class Socket {
    constructor(data){
        this.AuctionClient = data;
    }
    init(){
      const cli=this.AuctionClient;
        wss.on('connection', async function connection(client,req) {
            if(await rateLimiter.check(req.socket.remoteAddress)){
             client.send('Banned',client.terminate);
            }
            client.on('message', async function incoming(message) {
                if(!message || message.length>5000) return;
                try{
                 const msg = parseMessage(String(message));
                    await rateLimiter.add(req.socket.remoteAddress,2);
                 return client.send(JSON.stringify(API[msg.action](cli)));
                }catch(e){
                    console.log(e)
              return client.send(JSON.stringify({'error':true,'reason':'Unknown Action.'}))
                }
             });
  
            client.send('Boop! Connected to hypixel-ah WS.');
        });
        return this;
    }
    get ws(){
        return wss;
    }

}
module.exports = Socket;
