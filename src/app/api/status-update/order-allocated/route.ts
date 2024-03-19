import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {order_number , order_id ,ready_to_ship , } = await req.json();
        
        return new NextResponse("ok");
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
