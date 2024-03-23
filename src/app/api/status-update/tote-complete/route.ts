import { NextRequest, NextResponse } from "next/server";
import { insertTote } from "@/database/dbOperations";
import { error } from "console";
export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.json();

        // Extracting tote_uuid from the request body
        const tote_uuid = requestBody.totes[0].tote_uuid;
        console.log(tote_uuid)
        const data ={
            tote_uuid: tote_uuid,
            status:"packed"
        }
        try{

            await insertTote(data)
        } catch {
            
            console.log("hit")
        }
      
            
     
        return new NextResponse("ok");
        
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
