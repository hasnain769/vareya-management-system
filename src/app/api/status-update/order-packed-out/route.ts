import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {order_number , order_id ,tote_uuid ,order_uuid} = await req.json();
        console.log(order_uuid)
        return new NextResponse("ok");
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
