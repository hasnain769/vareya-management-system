import { NextRequest, NextResponse } from "next/server";
import { insertOrderAllocate, insertOrderPackedOut, insertShipment, insertTote } from "@/database/dbOperations";
import { ShipmentType, orderAllocatedType, orderPackedOutType } from "@/database/schema";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { tracking_number, order_number, shipping_method ,shipping_carrier} = body.fulfillment;
    console.log(order_number)
    console.log(tracking_number)
    console.log(shipping_carrier)
    console.log(shipping_method)


    try {
        const data : ShipmentType ={
            order_number : order_number,
            tracking_number : tracking_number,
            shipping_carrier : shipping_carrier,
            shipping_method : shipping_method,
            

        }
        try {
           await insertShipment(data)
        }catch (error) {
            console.log(error)
        }
      

        console.log(shipping_method);
        return new NextResponse("success");
    } catch (error) {
        console.error("Error inserting data into the database:", error);
        return new NextResponse("error", { status: 500 }); // Return an error response
    }
}
