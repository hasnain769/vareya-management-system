import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/dbClient';
import { Order, order } from '@/database/schema';
import { desc } from 'drizzle-orm';

//  export const maxDuration = 45;
// export const dynamic = 'force-dynamic';

// GET
export async function GET(request: NextRequest) {
  console.log('GET request received');
  const startTime = Date.now();

  try {
    const allOrders = await db.select().from(order).orderBy(desc(order.id));
    const responseTime = Date.now() - startTime;
    console.log(`GET request completed in ${responseTime}ms`);

    return new Response(JSON.stringify({ allOrders }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST
export async function POST(request: NextRequest) {
  console.log('POST request received');
  const startTime = Date.now();

  try {
    const newOrderData: Order = await request.json();
    const insertedOrder = await db.insert(order).values(newOrderData).returning().execute();
    const responseTime = Date.now() - startTime;
    console.log(`POST request completed in ${responseTime}ms`);

    return new Response(JSON.stringify(insertedOrder), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}