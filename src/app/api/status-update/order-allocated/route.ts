import { NextRequest, NextResponse } from "next/server";
import { insertOrderAllocate } from "@/database/dbOperations";
export async function POST(req: NextRequest) {
    try {
        const {order_number , order_id ,ready_to_ship ,order_uuid } = await req.json();
        const data ={
            order_number : order_number,
            ready_to_ship : ready_to_ship,
            order_id : order_id,
            order_uuid : order_uuid
        }
        try{
            await insertOrderAllocate(data)
        }catch{
            console.log("eror")
        }
        
        return new NextResponse("ok");
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
