module.exports = (message)=>{
    try{
      console.log(typeof message,message)
        const msg =JSON.parse(message);
        if(!msg.action) throw new Error();
        return msg;
    }catch(e){
      console.log(e)
        throw new Error("Invalid Request. Must be a valid JSON object")
    }
}