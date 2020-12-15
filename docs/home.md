# BACKEND
This is the web socket server to serve updates to client.
## Config & Prerequisites 
As of December 15th, the API requires at least 500 mb of ram to run comfortably

The better your internet connection is, the faster startup can happen. Please at least have 50 Mbps Symmetrical. 

The WS can take up a lot of internet transfer : expect up to 100 MB per minute outbound.
(Little todo - add a cooldown for this )

You will need : 
- Node v12 or above 
- An open port ( currently 8090 for dev purposes )
- A virtual machine that can ideally be up 24/7

Dependencies : 
- Hypixel-API-Reborn ( Must Be Latest )
- WS
- dotenv
- quick.db or any other db ( optional )

## Installation

1. Download/Clone this code onto your machine
2. run 
```
npm install
```
3. Configure the `.env` file and the database. ( See config.md )
4. Finally, run `npm start` or `node src/index.js`.

## Errors :

`EAI_AGAIN` : Either outbound traffic to the api is not allowed ( check firewall ), or there was a bug trying to fetch all the pages. Safe mode shouldn't encounter this.
`(Long message about GC errors and RAM allocation failure)` : Not enough RAM. 
`No API key specified` : You didn't configure the env file correctly or your key is not valid
`.... flat() isn't a function` : Upgrade to node v12+
`No errors, but my WebSocket doesn't connect` : Make sure you are connected to port 8090.
`No errors, my WebSocket connects, but no data is received/sent` : Your WS is still initializing : when it is ready, it will say WS Accepting Connection in the logs. There is also the _initialize event that emits with it. If it takes longer than 5 minutes, you might want to restart.
`No errors, but I can't seem to make the server respond to messages from my WS` : Make sure it is a valid JSON object. Prefer stringifying an object.
