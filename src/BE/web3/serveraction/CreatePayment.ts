'use server'
import { Connection, PublicKey, LAMPORTS_PER_SOL,Finality } from '@solana/web3.js';
import { getSolToNgnRate } from '../conversion';



export const solPayment=async(transactionId:string,email:string)=>{
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

const PREMIUM_NGN_COST = 5000;
const solToNgnRate = await getSolToNgnRate();
const expectedAmountInSol = PREMIUM_NGN_COST / solToNgnRate;
const transaction = await connection.getTransaction(transactionId, { commitment: 'confirmed' });
if (!transaction) {
    return 
  }
const amountTransferred = (transaction.meta?.preBalances[0]! - transaction.meta?.postBalances[0]!) / LAMPORTS_PER_SOL;
if (amountTransferred < expectedAmountInSol) {
    return 
  }

  // Here you can verify the recipient's wallet address if needed
  const recipientAddress = new PublicKey(process.env.SOLANA_RECIPIENT_ADDRESS!);
  if (transaction.transaction.message.accountKeys[1].toBase58() !== recipientAddress.toBase58()) {
    return 
  }


}