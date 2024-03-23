import { db } from '@/database';
import {
    orderPackedOutType,
    order_allocated,
    tote_complete,
    order_packed_out,
    orderAllocatedType,
    toteCompleteType,
 
} from '@/database/schema';
import { eq } from 'drizzle-orm';
import { Pool } from '@neondatabase/serverless';
//import { logger } from '@/utils/logger'


const client = new Pool()


// // export async function getAllShipmentDetails(): Promise<ShipmentDetailsType[]> {
// //   try {
// //     // Assume db.select().from() is an async operation and await its result.
// //     const response = await db.select().from(shipmentDetails);

// //     // Check if response is truthy and not empty. Adjust based on your ORM's response structure.
// //     if (!response || response.length === 0) {
// //       // Option 1: Return an empty array if no data found.
// //       return [];

// //     }

//     return response as ShipmentDetailsType[];
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       logger.error(error.message);
//     }
//     throw error;
//   }
// }


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

