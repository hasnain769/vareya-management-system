import { db } from '@/database';
import { eq } from 'drizzle-orm';
import {
    orderPackedOutType,
    order_allocated,
    tote_complete,
    order_packed_out,
    orderAllocatedType,
    toteCompleteType,
 
} from '@/database/schema';

import { Pool } from '@neondatabase/serverless';
//import { logger } from '@/utils/logger'


const client = new Pool()


export async function orderstatus(id : string): Promise<any> {
  console.log(id)
  try {
    // Assume db.select().from() is an async operation and await its result.
    const response = await db.select().from(order_packed_out).where(eq(order_packed_out.order_uuid, id)).execute();
    console.log("hit")
    console.log(response)

    return response 
  } catch (error: unknown) {
    if (error instanceof Error) {
      //logger.error(error.message);
    }
    throw error;
  }
 }


export async function insertOrderAllocate(data: orderAllocatedType): Promise<void> {
  try {
    await db.insert(order_allocated).values(data)

    //logger.info("added order allocated status :");

    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error)
      //logger.error("An error occurred while inserting a new shipment into the database:", { errors: error.message });
    }
    throw error;
  }
}

export async function insertTote(data: any): Promise<void> {
    try {
      await db.insert(tote_complete).values(data)
  
      //logger.info("added order allocated status :");
  
      
  
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error)
        //logger.error("An error occurred while inserting a new shipment into the database:", { errors: error.message });
      }
      throw error;
    }
  }
  export async function insertOrderPackedOut(data: orderPackedOutType): Promise<void> {
    try {
      await db.insert(order_packed_out).values(data)
  
      //logger.info("added order allocated status :");
  
      
  
  
    } catch (error: unknown) {
      if (error instanceof Error) {
        //logger.error("An error occurred while inserting a new shipment into the database:", { errors: error.message });
      }
      throw error;
    }
  }

