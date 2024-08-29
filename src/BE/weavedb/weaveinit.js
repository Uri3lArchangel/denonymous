import WeaveDB from "weavedb-sdk";


export const init=async()=>{
  const db = new WeaveDB({ contractTxId: process.env.contractTXID })
  await db.init()
  return db
}