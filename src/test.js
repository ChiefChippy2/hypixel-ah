const ws =require("ws");
const tester=new ws("wss://WS-test.account4testof.repl.co");
tester.on("message",(msg)=>{
    console.log(msg.length);
    try{msg=JSON.parse(msg)
    
    if(msg.success) console.log(msg.data[0])
    }catch(e){}
})
tester.once("message",()=>tester.send(JSON.stringify({action:"batchGet",number:"10"})))