module.exports = (message)=>{
    try{
        const msg =JSON.parse(message);
        if(!msg.action) throw new Error();
        return msg;
    }catch(e){
        throw new Error("Invalid Request. Must be a valid JSON object")
    }
}