const db = require("../database");
const RL = new Map();
module.exports = {
    "check":async (ip,admin=false)=>{
        if(await db.get('BAN'+ip)) return admin?await db.get('BAN'+ip) : true;
        return false;
    },
    "add":async (ip,points=1)=>{
        let rl = parseInt(RL.get('RL'+ip)) || 0
        if(rl>20) throw new Error('429 - Exceeded Rate Limit')
        rl+=points;
        RL.set('RL'+points);
        setTimeout(minus,1000*60,ip,points)
        async function minus(ip,points=1){
          let rl = parseInt(RL.get('RL'+ip)) || 0
          rl-=points;
          if(rl<0) rl=0;
          RL.set('RL'+points);
        }
    }
}