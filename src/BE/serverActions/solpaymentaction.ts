"use server";
import { Connection, PublicKey } from "@solana/web3.js";
import User from "../DB/schema/User";
import { userDataTokenSign } from "@/src/core/lib/JWTFuctions";
import { u1, userModelType } from "@/types";
import { setSessionCookie } from "@/src/core/lib/Cookie";
import { revalidatePath, revalidateTag } from "next/cache";
import UserSec from "../DB/schema/UserSecondary";

export const verifySOlPaymentAction = async (
  signature: string,
  email: string,
  amount: number
) => {
  const SOLANA_NETWORK = process.env.RPC!; // Or Mainnet
  if (!signature) {
    return [null, "No signature detected"];
  }

  try {
    const connection = new Connection(SOLANA_NETWORK);

    // Fetch transaction details
    const transaction = await connection.getTransaction(signature, {
      commitment: "confirmed",
    });

    if (!transaction) {
      return [null, "Transaction not found"];
    }

    // Verify if the transaction was sent to your wallet address
    const recipientPublicKey = new PublicKey(
      "E8WZUeVFiQ3aNJTciAG1PaHfwJgAwgfi6HpDi52BfsHp"
    ); // Replace with your Solana wallet address

    const paidToRecipient =
      transaction.transaction.message.accountKeys[1].equals(recipientPublicKey);

    const correctAmount =
      transaction.meta?.preBalances &&
      transaction.meta.preBalances[0] >= amount;
    if (paidToRecipient && correctAmount) {
      await User.updateOne({ email }, { isPremium: true });
      const user = (await User.findOne({ email })) as userModelType;

      let us = (await UserSec.findOne({ username: user.username })) as u1;
      if (!us) {
        await UserSec.create({
          premiumEndDate: Date.now() + 31 * 24 * 3600 * 1000,
          points: 1000,
        });
      } else {
        await UserSec.updateOne(
          { username: user.username },
          {
            premiumEndDate: Date.now() + 31 * 24 * 3600 * 1000,
            points: us.points + 1000,
          }
        );
      }
      us = (await UserSec.findOne({ username: user.username })) as u1;
      const token = userDataTokenSign(
        user.username,
        email,
        user.isEmailVerified,
        user.isPremium
      );
      setSessionCookie(token);
      revalidatePath("/subscription");
      revalidateTag("depoints_tag");

      return [true, null];
    } else {
      return [null, "Invalid payment amount or recipient"];
    }
  } catch (error) {
    return [null, "Internal server error"];
  }
};
