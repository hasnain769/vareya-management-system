import { NextRequest, NextResponse } from "next/server";
import { getOrderById, insertOrderAllocate, insertOrderPackedOut, insertStatus, insertTote } from "@/database/dbOperations";
import { NewOrderStatus, orderAllocatedType, orderPackedOutType, order_statuses } from "@/database/schema";
export async function POST(req: NextRequest) {
    const body = await req.json();
  
    const {webhook_type} = body ;
    console.log("updating order status " , webhook_type);

    const{ order_number , order_id } = body
    const order = await getOrderById(order_id)
    



    if(await webhook_type =="Order Packed Out" ) {

        try {
            const {tote_uuid ,order_uuid} = body
            console.log(order_uuid)
            const data : NewOrderStatus= {
                order_id : order_id ,
                status_name : "packed Out",
                status_date_time :  new Date(),
                status_source : "shiphero"
 
                
            }
            await insertStatus(data)
            

            return new NextResponse("Success");
        } catch (error) {
            console.error("Error parsing request body:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }
    // if(webhook_type === "Tote Complete") {
    //     try {
            
    
    //         // Extracting tote_uuid from the request body
    //         const {tote_uuid , order_number}= body.totes[0].tote_uuid;
    //         console.log(tote_uuid)
    //         const data ={
    //             tote_uuid: tote_uuid,
    //             status:"packed"
    //         }
    //         try{
    
    //             await insertTote(data)
    //         } catch {
                
    //             console.log("hit")
    //         }
          
                
         
    //         return new NextResponse("ok");
            
    //     } catch (error) {
    //         console.error("Error parsing request body:", error);
    //         return new NextResponse("Internal Server Error", { status: 500 });
    //     }

    // }
    if(webhook_type==="Order Allocated") {
        console.log("orderAllocated")
        try {
            const { order_id } = body
            console.log(order_id)
            const data : NewOrderStatus= {
                order_id : order_id ,
                status_name : "Pick",
                status_date_time :  new Date(),
                status_source : "shiphero"
 
                
            }
        
            console.log(data)
            try{
               const response = await insertStatus(data)
               console.log(response)
            }catch (error){
                console.log(error)
            }
            
            return new NextResponse('Success',);
        } catch (error) {
            console.log("Error parsing request body:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }

    }
    else {
        return new NextResponse("Internal Server Error", { status:500})
    }

}
