const WeaveDB = require("weavedb-sdk-node")
 
const db = new WeaveDB({ contractTxId: "mUbqn98EVxNHr8vsjjR5j82yiLJwZS1ZyARcjlQTVoE" })
db.init().then(async()=>{
   await db.add({"email":"a@gmail","points":2,"verified":true},"Denonymous points") 
 let a = await db.get("Denonymous points")
 console.log(a)
})
