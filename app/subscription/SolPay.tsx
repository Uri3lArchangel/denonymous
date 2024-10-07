"use client";

import React, { useCallback, useContext} from "react";
import {
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
} from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { getSolToNgnRate } from "@/src/BE/web3/conversion";
import { NotificationContext } from "@/src/FE/components/contexts/NotificationContext";
import { message } from "antd";
import { verifySOlPaymentAction } from "@/src/BE/serverActions/solpaymentaction";
import { useRouter } from "next/navigation";


const SolPay = ({ email }: { email: string }) => {
  const note = useContext(NotificationContext)!
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const router = useRouter()
  const recipientPublicKey = new PublicKey(
    "E8WZUeVFiQ3aNJTciAG1PaHfwJgAwgfi6HpDi52BfsHp"
  ); 



  const makePayment = useCallback(async () => {
    if (!publicKey) {
        note({
            type:"error",
            description:"",
            message:"Please connect your wallet first."
        })
      return ;
    }
    const a= Number(await getSolToNgnRate())
    const amountInLamports =Math.round(( 3000/a ) * LAMPORTS_PER_SOL);
    const balance = await connection.getBalance(publicKey);
    try {
        if (balance < amountInLamports) {
            note({
                type:"error",
                description:"",
                message:'Insufficient balance to complete the transaction.'
            })
            return;
          }
          message.loading("Please wait...",100000000)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPublicKey,
          lamports: amountInLamports,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      // Confirm transaction
      await connection.confirmTransaction(signature, "processed");
      const [success,error] = await verifySOlPaymentAction(signature,email,amountInLamports)


      const data ={success:true}
      message.destroy()
      if (data.success) {
        note({
            type:"success",
            description:"",
            message:"Payment successful!"
        })
          router.push('/dashboard'); // Redirect to premium content
      } else {
        note({
            type:"error",
            description:"",
            message:"Payment verification failed!"
        })
        
      }
    } catch (error:any) {
      message.destroy()
        note({
            type:"error",
            description:error.message,
            message:"Payment failed!"
        })
    }
  }, [publicKey, sendTransaction, connection]);

  return (
    <>
      {" "}
      {publicKey ? (
        <div className="flex flex-wrap">
        <button className="bg-white text-[#574CA8] rounded-lg mr-4 px-4 py-2" onClick={makePayment}>Pay with solana</button>
        <WalletMultiButton />
        </div>
      ) : (
        <WalletMultiButton />
      )}
    </>
  );
};

export default SolPay;
