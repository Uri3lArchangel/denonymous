import { sendRelpy } from "@/src/BE/DB/queries/auth/query";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { UUID, topic, reply } = await req.json();
    await sendRelpy(UUID,topic,reply);
    revalidatePath("raieneidmie_00")
    return NextResponse.json({data:null,message:"reply sent successfully"},{status:201})
  
  
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({data:null,message:"An error was encountered"})
  }
 

}
