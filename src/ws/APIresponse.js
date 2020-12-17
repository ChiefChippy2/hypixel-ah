module.exports = class APIResponse{
    constructor(data,req){
        this.response = JSON.stringify({...data,...req})
    }
    toSendable(){
        return this.response
    }
}