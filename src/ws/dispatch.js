const WebSocket = require("ws");
module.exports = class dispatch {
    constructor(ws,auction){
        this.ws = ws;
        this.auction = auction;
        this.auction.on('update',this.sendToAll.bind(this,ws))
    }
    sendToAll(socket,data){
	      socket.ws.clients.forEach((client) => {
            if (client !== socket.ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
    }

}
