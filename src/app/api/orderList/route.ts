import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/dbClient';
import { Order, order } from '@/database/schema';
import { desc } from 'drizzle-orm';


// GET
export async function GET(request: NextRequest) {
    const allOrders = await db.select().from(order).orderBy(desc(order.id));
    return new Response(JSON.stringify({ allOrders }), {
        headers: { 'Content-Type': 'application/json' },
    });
  }

  
// POST
export async function POST(request: NextRequest) {
    const newOrderData: Order = await request.json();
    const insertedOrder = await db.insert(order).values(newOrderData).returning().execute();
    return new Response(JSON.stringify(insertedOrder), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }