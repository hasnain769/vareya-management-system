import { NextRequest, NextResponse } from "next/server";
import { getSingleOrderbyOrderNumber, insertLineItem, insertOrderAllocate, insertOrderPackedOut, insertShipment, insertTote } from "@/database/dbOperations";
import { LineItemType, ShipmentType, orderAllocatedType, orderPackedOutType } from "@/database/schema";
import { CookingPot } from "lucide-react";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { tracking_number, order_number, shipping_method ,shipping_carrier} = body.fulfillment;
    const packages = body.packages

    const OrderExists = await getSingleOrderbyOrderNumber(order_number);
    console.log(OrderExists[0].legacy_id)


    console.log(packages)
    packages.forEach(async (packageItem: any) => {
        packageItem.line_items.forEach(async (lineItem: any) => {
            const data: LineItemType = {
                order_id: OrderExists[0].legacy_id,
                product_name: lineItem.product_name,
                price: lineItem.price,
                quantity: lineItem.quantity
            };
            console.log(data)
            await insertLineItem(data);
        });
    });

    try {
        const data : ShipmentType ={
            order_id : OrderExists[0].legacy_id,
            tracking_number : tracking_number,
            shipping_carrier : shipping_carrier,
            shipping_method : shipping_method,
            status :"shipment pre alerted"
            

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
