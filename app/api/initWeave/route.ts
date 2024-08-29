// // import { init } from "@/src/BE/weavedb/weaveinit";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req:NextRequest) {
//     try {
//      const db =await init();
//         return NextResponse.json({db})
//     } catch (error:any) {
//         console.log(error)
//         return NextResponse.json({db:null})
//     }
// }