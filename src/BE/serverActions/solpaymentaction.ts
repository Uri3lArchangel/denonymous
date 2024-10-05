"use server";
import { Connection, PublicKey } from "@solana/web3.js";
import User from "../DB/schema/User";
import { userDataTokenSign, verifyUserDataToken } from "@/src/core/lib/JWTFuctions";
import { userModelType } from "@/types";
import { setSessionCookie } from "@/src/core/lib/Cookie";
import { revalidatePath } from "next/cache";

export const verifySOlPaymentAction = async (
  signature: string,
  email: string,
  amount: number
) => {
  const SOLANA_NETWORK = "https://api.devnet.solana.com"; // Or Mainnet
  if (!signature) {
    return [null, "No signature detected"];
  }

  try {
    const connection = new Connection(SOLANA_NETWORK);

    // Fetch transaction details
    const transaction = await connection.getTransaction(signature, { commitment: "confirmed" });

    if (!transaction) {
      return [null, "Transaction not found"];
    }

    // Verify if the transaction was sent to your wallet address
    const recipientPublicKey = new PublicKey(
      "E8WZUeVFiQ3aNJTciAG1PaHfwJgAwgfi6HpDi52BfsHp"
    ); // Replace with your Solana wallet address

    const paidToRecipient = transaction.transaction.message.accountKeys[1].equals(recipientPublicKey)

    const correctAmount =
      transaction.meta?.preBalances &&
      transaction.meta.preBalances[0] >= amount;
    if (paidToRecipient && correctAmount) {
        await User.updateOne({email},{isPremium:true})
        const user  = await User.findOne({email}) as userModelType;
       const token = userDataTokenSign(user.username,email,user.UUID,user.isEmailVerified,user.isPremium)
        setSessionCookie(token)
        revalidatePath("/subscription");
      return [true, null];
    } else {
      return [null, "Invalid payment amount or recipient"];
    }
  } catch (error) {
    return [null, "Internal server error"];
  }
};
