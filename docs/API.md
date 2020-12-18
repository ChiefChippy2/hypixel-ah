# WS events & API

## Connection :

- Connect to WS normally.
- If you are banned, you will be kicked with a message. As of dec 15th, this can only be done manually.
- If connection is successful and the WS is emitting events, you will receive : 
```
Boop! Connected to hypixel-ah WS.
```
## Standard Structure : 
Auction : 
```json
{
  "auctionEndTimestamp": 1608068522539,
  "auctionId": "1234cf35d4c44c02baacb7c5c675b44c",
  "auctionStartTimestamp": 1608025322539,
  "auctioneerUuid": "15dda75c54fb44d0bc9c1b4545960fae",
  "bids": [],
  "bin": true,
  "claimed": false,
  "claimedBidders": [],
  "coop": ["15dda734534514d0bc9c1b4f476fdfae", "12d6d632ee334e228302371aaca12f07"],
  "highestBid": 0,
  "item": "ChiefChippy2",
  "itemLore": "Text about item without color",
  "itemLoreRaw": "Text about item with MC color",
  "rarity": "LEGENDARY",
  "startingBid": 3120000,
}
```
FakeArray : 
```json
{
"0":item,
"1":item
}
```
## Events : 

- Events will start coming. depending on your server, it can be 1 event per second or 1 event per 3 seconds.
- An event look like this : 
```json
{
  "NEW":[
  Auction,
  Auction,
  ],
  "BID":[
  Auction,
  Auction,
  ],
  "ENDING":["list","of","id","of","auctions","that","are","ending"],
  "END":["^","expect","it","ended"]
}
```

## Requesting Data :

Of course, receiving events isn't enough. You need to get some previous auctions to show, right? 
You will need to send a message via the WS to the server. The message must be valid JSON.

### Methods
CASE MATTERS!
- get
  + id ( valid auctions uuid )
  + returns : Auction
- batchGet
  + number ( amount of number of results to return, max 1000, default 100 )
  + skip ( number of results to skip, default 0 )
  + sort ( sort method, accepts "startDate" ( default ) , "endDate", "rarity", "discover" ( discover = random ))
  + order ( order, accepts "d" for descending or "a" for ascending, default descending )
  + returns : FakeArray<Auction>
### Valid request example : 
```json
{
  "action":"batchGet",
  "number":10,
  "sort":"endDate",
  "order":"d"
}
```
### Response : 

Responses will be sent as soon as possible. It might be after a few events.
The response ALWAYS contains a success property. 

If false, an additional reason property is provided.

If true, then data is returned, as well as a req property that contains your request ( useful if you are fetching multiple requests at once ) 
