import { NextRequest, NextResponse } from "next/server";
import { insertOrderAllocate, insertOrderPackedOut, insertTote } from "@/database/dbOperations";
import { orderAllocatedType, orderPackedOutType } from "@/database/schema";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { tracking_number, order_number, shipping_method } = body.fulfillment;

    // Example of inserting data into the database
    try {
      

        console.log(shipping_method);
        return new NextResponse("success");
    } catch (error) {
        console.error("Error inserting data into the database:", error);
        return new NextResponse("error", { status: 500 }); // Return an error response
    }
}
