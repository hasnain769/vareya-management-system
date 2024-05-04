import { db } from '@/database';
import { eq } from 'drizzle-orm';
import { logger } from '@/utils/logger';
import {
    orderPackedOutType,
    order_allocated,
    tote_complete,
    order_packed_out,
    orderAllocatedType,
    toteCompleteType,
    address,
    order,
    holds,
    lineItem,
    shipment,
    AddressType,
    HoldsType,
    ShipmentType,

 
} from '@/database/schema';

import { Pool } from '@neondatabase/serverless';
import { OrderData } from '@/utils/types';
//import { logger } from '@/utils/logger'


const client = new Pool()


export async function orderstatus(id : any): Promise<any> {
  console.log(id)
  try {
    // Assume db.select().from() is an async operation and await its result.
    const response = await db.select().from(shipment).where(eq(shipment.order_number, id)).execute();

    console.log(response)

    return response 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error)
      //logger.error(error.message);
    }
    throw error;
  }
 }

export async function insertLineItem(data : LineItemType){
  await db.insert(lineItem).values(data);
}

export async function insertOrderAllocate(data: orderAllocatedType): Promise<void> {
  console.log(data)
  try {
    
    await db.insert(order_allocated).values(data).execute()

    //logger.info("added order allocated status :");

    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error)
      //logger.error("An error occurred while inserting a new shipment into the database:", { errors: error.message });
    }
   
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
    console.log("first")
    try {
      await db.insert(order_packed_out).values(data).execute()
  
      //logger.info("added order allocated status :");
  
      
  
  
    } catch (error: unknown) {
        console.log(error)
        if (error instanceof Error) {
          //logger.error("An error occurred while inserting a new shipment into the database:", { errors: error.message });
        }
      throw error;
    }
  }

  export async function insertShipment(shipmentvalues : ShipmentType) {
    try {
      await db.insert(shipment).values(shipmentvalues).execute();
    }
    catch (error) {
      console.log(error)
    }

  }


  import {  LineItemType, OrderType } from './schema';
  export async function updateStatus(data: any) {
    console.log(data)
    
    await Promise.all(data.map(async (item: any) => {
        try {
            let statusDescription = ''; // Initialize statusDescription variable
            

            if (item.statusCode && item.statusDescription) {
              
                statusDescription = item.statusDescription;
            }
            console.log(statusDescription)
            // Update the status to StatusDescription
            const updatedShipment = await db.update(shipment)
                .set({ status: statusDescription })
                .where(eq(shipment.tracking_number, item.barcode))
                
            
            console.log(`Updated status for shipment with barcode ${item.Barcode}`);
            console.log(updatedShipment); // Log the updated shipment data
        } catch (error) {
            console.error(`Failed to update status for shipment with barcode ${item.Barcode}: ${error}`);
        }
    }
    ))
}
  export async function insertCompleteOrder(ordersData: any) {
    //  console.log(ordersData);``
    // try {
        const ordersResponse = await Promise.all(ordersData.map(async (ord: any) => {

        // const ord =ordersData[0]
            logger.info(ord)
            // try {
                // console.log("hit"),
                const orderExist = await db.select().from(order).where(eq(order.order_number, ord.order_number));
                logger.info(JSON.stringify(orderExist))
                if(orderExist.length > 0){
                  console.log("orderExist")
                 logger.info(`order with order number ${ord.order_number} exist in db`)
                return `order ${ord.order_number} already exists`
                }
                else {

                  const addressData: AddressType = {
                      address1: ord.shipping_address?.address1 || '',
                      address2: ord.shipping_address?.address2 || null,
                      city: ord.shipping_address?.city || '',
                      state: ord.shipping_address?.state || '',
                      zip: ord.shipping_address?.zip || '',
                      country: ord.shipping_address?.country || ''
                  };
  
                  const addressResponse = await db.insert(address).values(addressData).returning({id :address.id})
                  logger.info(`shipping adddress with ${addressResponse[0].id}`)
  
                  // const holdsData: HoldsType = {
                  //     fraud_hold: ord.holds?.fraud_hold || false,
                  //     payment_hold: ord.holds?.payment_hold || false,
                  //     operator_hold: ord.holds?.operator_hold || false,
                  //     address_hold: ord.holds?.address_hold || false,
                  //     shipping_method_hold: ord.holds?.shipping_method_hold || false,
                  //     client_hold: ord.holds?.client_hold || false
                  // };
  
                  // const holdsId = await db.insert(holds).values(holdsData).returning({id : holds.id})
                  // console.log(holdsData)
                  // console.log(holdsId)
  
                  const orderData: OrderType = {
                      order_id :ord?.id,
                      legacy_id :ord?.legacy_id,
                      shop_name: ord?.shop_name,
                      account_id: ord?.account_id || '',
                      profile: ord?.profile || '',
                      email: ord?.email || '',
                      order_number: ord?.order_number || '',
                      fulfillment_status: ord.fulfillment_status || '',
                      order_date: new Date(ord.order_date!),
                      total_tax: parseFloat(ord.total_tax!) as any ,
                      subtotal: parseFloat(ord.subtotal!) as any,
                      total_price: parseFloat(ord.total_price!) as any, 
                      total_discounts: parseFloat(ord.total_discounts!) as any,
                    //  holds_id: holdsId[0].id ,
                      shipping_address_id: addressResponse[0].id
                  };
                  console.log(orderData)
  
                  const orderInsertionResponse = await db.insert(order).values(orderData).returning({ id: order.id });
                  logger.info(`order inserted with orderId: ${orderInsertionResponse[0].id}`)
  
  
  
  
                  
                  console.log(`Order with order number ${ord.order_number} inserted successfully.`);
                  // } catch (error: unknown) {
                  //     console.log(error)
                  // }
                  // } catch (error) {
                    //     console.error('Error inserting complete order data:', error);
                    //     throw error;
                    // }
                     return `inserted order ${ord.order_number}  with orderid ${orderInsertionResponse[0].id}`
                  }
                }));

                logger.info("all orders Response" ,ordersResponse)
                return ordersResponse
}

// export async function insertCompleteOrder(ordersData: any): Promise<void> {
//   // Consider adding basic input validation to prevent unexpected errors
//   if (!Array.isArray(ordersData)) {
//     throw new Error('Invalid ordersData. Must be an array.');
//   }

  

//   try {
//     // Batch insert orders using a transaction for efficiency and data integrity
//     await db.transaction(async (trx :any) => {
//       for (const ord of ordersData) {
//         const orderExist = await trx.select().from(order).where(eq(order.order_number, ord.order_number)).execute();

//         if (orderExist.length > 0) {
//           console.log(`Order with order number ${ord.order_number} already exists in db`);
//           continue;
//         }

//         // Insert address efficiently using prepared statements (consider if performance is critical)
//         const addressInsert = trx.prepare(`
//           INSERT INTO address (address1, address2, city, state, zip, country)
//           VALUES ($1, $2, $3, $4, $5, $6)
//           RETURNING id
//         `);

//         const addressData = {
//           address1: ord.shipping_address?.address1 || '',
//           address2: ord.shipping_address?.address2 || null,
//           city: ord.shipping_address?.city || '',
//           state: ord.shipping_address?.state || '',
//           zip: ord.shipping_address?.zip || '',
//           country: ord.shipping_address?.country || ''
//         };

//         const addressIdResult = await addressInsert.values(addressData).execute();
//         const addressId = addressIdResult[0].id;

//         // Insert order with reference to address
//         const orderData = {
//           order_id: ord?.id,
//           legacy_id: ord?.legacy_id,
//           shop_name: ord?.shop_name,
//           account_id: ord?.account_id || '',
//           profile: ord?.profile || '',
//           email: ord?.email || '',
//           order_number: ord?.order_number || '',
//           fulfillment_status: ord.fulfillment_status || '',
//           order_date: new Date(ord.order_date!),
//           total_tax: parseFloat(ord.total_tax!),
//           subtotal: parseFloat(ord.subtotal!),
//           total_price: parseFloat(ord.total_price!),
//           total_discounts: parseFloat(ord.total_discounts!),
//           shipping_address_id: addressId
//         };

//         await trx.insert(order).values(orderData).execute();
//         console.log(`Order with order number ${ord.order_number} inserted successfully.`);
//       }
//     });
//   } catch (error) {
//     console.error('Error inserting complete order data:', error);
//     throw error; // Re-throw for handling at a higher level
//   }

//   return;
// }
// export async function insertCompleteOrder(ordersData: any) {
//   // Consider adding basic input validation to prevent unexpected errors
//   if (!Array.isArray(ordersData)) {
//     throw new Error('Invalid ordersData. Must be an array.');
//   }

  
//   try {
//     let i =0

//     for (const ord of ordersData) {
//       i++
//       try {


//         const existingOrder = await db.select().from(order).where(eq(order.order_number, ord.order_number)).execute();
  
//         if (existingOrder.length > 0) {
//           console.log(`Order with order number ${ord.order_number} already exists in db`);
//           continue; // Skip insertion if order already exists (optional)
//         }
  
  
  
//         const addressData: AddressType = {
//           address1: ord.shipping_address?.address1 || '',
//           address2: ord.shipping_address?.address2 || null,
//           city: ord.shipping_address?.city || '',
//           state: ord.shipping_address?.state || '',
//           zip: ord.shipping_address?.zip || '',
//           country: ord.shipping_address?.country || ''
//       };
  
//       const addressId = await db.insert(address).values(addressData).returning({id :address.id})
//       console.log(addressId)
  
//       // const holdsData: HoldsType = {
//       //     fraud_hold: ord.holds?.fraud_hold || false,
//       //     payment_hold: ord.holds?.payment_hold || false,
//       //     operator_hold: ord.holds?.operator_hold || false,
//       //     address_hold: ord.holds?.address_hold || false,
//       //     shipping_method_hold: ord.holds?.shipping_method_hold || false,
//       //     client_hold: ord.holds?.client_hold || false
//       // };
  
//       // const holdsId = await db.insert(holds).values(holdsData).returning({id : holds.id})
//       // console.log(holdsData)
//       // console.log(holdsId)
  
//       const orderData: OrderType = {
//           order_id :ord?.id,
//           legacy_id :ord?.legacy_id,
//           shop_name: ord?.shop_name,
//           account_id: ord?.account_id || '',
//           profile: ord?.profile || '',
//           email: ord?.email || '',
//           order_number: ord?.order_number || '',
//           fulfillment_status: ord.fulfillment_status || '',
//           order_date: new Date(ord.order_date!),
//           total_tax: parseFloat(ord.total_tax!) as any ,
//           subtotal: parseFloat(ord.subtotal!) as any,
//           total_price: parseFloat(ord.total_price!) as any, 
//           total_discounts: parseFloat(ord.total_discounts!) as any,
//         //  holds_id: holdsId[0].id ,
//           shipping_address_id: addressId[0].id
//       };
//       console.log(orderData)
  
//       const orderId = await db.insert(order).values(orderData).returning({ id: order.id });
//       console.log(orderId)

//       }catch(error){
//         console.log(error)

//           console.log (`an error accoured after inserting oreder no ${i}` )
//       }
//       console.log(i)
      
//     }




//   } catch (error) {
//     console.log('Error inserting complete order data:', error);
//     throw error; // Re-throw for handling at a higher level
//   }

//   return "success";
// }

export async function getOrders() {
 
  const data = await db.select().from(order)
  
  return data
}
export async function getSingleOrder(id : any) {
  console.log(id)
  const data = await db.select().from(order).where(eq(order.id,id))
  console.log(data)
  return data

}

export async function getaddresses(id: any) {
  console.log(id)
  const data = await db.select().from(address).where(eq(address.id , id)).execute()
  console.log(data)
  return data
}

export async function getLineItems(orderNumber: any ,id : any ,itt : number) {
  console.log(id);
  
  try {
    const data = await db
      .select()
      .from(lineItem)
      .where(eq(lineItem.order_number, orderNumber))
    if(data.length < 1){
   
        const response = await fetch(`http://localhost:3000/api/single-order-details?id=${id}`)
        
        
    }  
   
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching line items:", error);
    return []; // Return an empty array in case of an error
  }
}