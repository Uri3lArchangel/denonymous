"use server";
import { cookies } from "next/headers";
import {
  signPointsData,
  verifyPointsData,
  verifyUserDataToken,
} from "@/src/core/lib/JWTFuctions";
import { setPointsCookie } from "@/src/core/lib/Cookie";
import { init } from "../weavedb/weaveinit";

export const addPoints = async (points: number) => {


  const db = await init()
  
  if (!db) return [null, "A error occured"];
  const userCookie = cookies().get("denon_session_0");
  if (!userCookie || !userCookie.value) {
    const pointsCookie = cookies().get("denon_points");

    if (!pointsCookie || !pointsCookie.value) {
      const token = signPointsData(points);
      setPointsCookie(token);
      return [null, `Sign up/Sign in to ensure you don't lose your Points`];
    }
    const pointsData = verifyPointsData(pointsCookie.value);
    const newPoints = points + pointsData;
    const token = signPointsData(newPoints);
    setPointsCookie(token);
    return [null, `Sign up/Sign in to ensure you don't lose your Points`];
  } else {
    const user = verifyUserDataToken(userCookie.value);
    if (!user) {
      const pointsCookie = cookies().get("denon_points");

      if (!pointsCookie || !pointsCookie.value) {
        const token = signPointsData(points);
        setPointsCookie(token);
        return [null, `Sign up/Sign in to ensure you don't lose your Points`];
      }
      const pointsData = verifyPointsData(pointsCookie.value);
      const newPoints = points + pointsData;
      const token = signPointsData(newPoints);
      setPointsCookie(token);
      return [null, `Sign up/Sign in to ensure you don't lose your Points`];
    } else {
      const tx = await db.get("Denonymous points");
      const filteredDocuments = tx.filter((e: any) => e.email === user.email);
      if (filteredDocuments.length > 0) {
        const docID = filteredDocuments[0].doc_id;
        const newPoints = filteredDocuments[0].points + points;
        await db.update({ points: newPoints }, "Denonymous points", docID);
        return [true, null];
      } else {
        const pointsDataQuery = {
          email: user.email,
          points: points,
          verified: user.verified,
        };
        await db.add(pointsDataQuery, "Denonymous points");
        return [true, null];
      }
    }
  }
};
