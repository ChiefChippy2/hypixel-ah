const db = require("../database");
module.exports = {
    "check":async (ip,admin=false)=>{
        if(await db.get('BAN'+ip)) return admin?await db.get('BAN'+ip) : true;
        return false;
    },
    "add":async (ip,points=1)=>{
        let rl = parseInt(await db.get('RL'+ip)) || 0
        if(rl>10) throw new Error('429 - Exceeded Rate Limit')
        rl+=points;
        await db.set('RL'+points);
        setTimeout(this.minus,1000*60,ip,points)
    },
    "minus":async (ip,points=1)=>{
        let rl = parseInt(await db.get('RL'+ip)) || 0
        rl-=points;
        if(rl<0) rl=0;
        await db.set('RL'+points);
    }
}