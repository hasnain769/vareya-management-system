import { NextRequest, NextResponse } from "next/server";
import { insertOrderAllocate, insertOrderPackedOut, insertTote } from "@/database/dbOperations";
import { orderPackedOutType } from "@/database/schema";
export async function POST(req: NextRequest) {
    const {webhook_type} =await req.json()
    console.log("updating order status " , webhook_type);

    if(await webhook_type =="Order Packed Out" ) {
      

        try {
            const {order_number , order_id ,tote_uuid ,order_uuid} = await req.json();
            console.log(order_uuid)
            const data : orderPackedOutType= {
                order_id : order_id ,
                tote_uuid : order_uuid,
                order_uuid : order_uuid,
                order_number : order_number
                
            }
            console.log("first")
            await insertOrderPackedOut(data)
            return new NextResponse("Success");
        } catch (error) {
            console.error("Error parsing request body:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }
    else if(webhook_type === "Tote Complete") {
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
    else if(webhook_type==="Order Allocated") {
        console.log("orderAllocated")
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
    else {
        return new NextResponse("Internal Server Error", { status:500})
    }

}
