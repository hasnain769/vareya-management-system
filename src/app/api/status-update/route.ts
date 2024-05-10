import { NextRequest, NextResponse } from "next/server";
import { insertOrderAllocate, insertOrderPackedOut, insertTote } from "@/database/dbOperations";
import { NewOrderStatus, orderAllocatedType, orderPackedOutType, order_statuses } from "@/database/schema";
export async function POST(req: NextRequest) {
    const body = await req.json();
  
    const {webhook_type} = body ;
    console.log("updating order status " , webhook_type);
    



    if(await webhook_type =="Order Packed Out" ) {

        try {
            const {order_number , order_id ,tote_uuid ,order_uuid} = body
            console.log(order_uuid)
            const data : orderPackedOutType= {
                order_id : order_id ,
                tote_uuid : order_uuid,
                order_uuid : order_uuid,
                order_number : order_number
                
            }
            await insertOrderPackedOut(data)
            

            return new NextResponse("Success");
        } catch (error) {
            console.error("Error parsing request body:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }
    if(webhook_type === "Tote Complete") {
        try {
            
    
            // Extracting tote_uuid from the request body
            const {tote_uuid , order_number}= body.totes[0].tote_uuid;
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
    if(webhook_type==="Order Allocated") {
        console.log("orderAllocated")
        try {
            const {order_number , order_id ,ready_to_ship ,order_uuid } = body
            console.log(order_number)
            const data : orderAllocatedType= {
                order_number : order_number as string ,
                order_id : order_id,
                order_uuid : order_uuid as string,
                ready_to_ship : ready_to_ship,
            }
        
            console.log(data)
            try{
                await insertOrderAllocate(data)
            }catch{
                console.log("erorrrrrrr")
            }
            
            return new NextResponse("ok");
        } catch (error) {
            console.log("Error parsing request body:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }

    }
    else {
        return new NextResponse("Internal Server Error", { status:500})
    }

}
