import { db } from '@/database';
import { eq } from 'drizzle-orm';
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
    shippingLabel,
    shipment,
    AddressType,
    HoldsType,

 
} from '@/database/schema';

import { Pool } from '@neondatabase/serverless';
import { OrderData } from '@/utils/types';
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


  import {  LineItemType, OrderType, ShippingLabelType, ShipmentType } from './schema';
  export async function insertCompleteOrder(ordersData: any): Promise<void> {
    // console.log(orderData);
    // try {
         await Promise.all(ordersData.map(async (ord: any) => {
          //const ord =ordersData[0]
            console.log(ord)
            // try {
                // console.log("hit"),
                const addressData: AddressType = {
                    address1: ord.shipping_address?.address1 || '',
                    address2: ord.shipping_address?.address2 || null,
                    city: ord.shipping_address?.city || '',
                    state: ord.shipping_address?.state || '',
                    zip: ord.shipping_address?.zip || '',
                    country: ord.shipping_address?.country || ''
                };

                const addressId = await db.insert(address).values(addressData).returning({id :address.id})
                console.log(addressId)
                console.log(addressId)

                const holdsData: HoldsType = {
                    fraud_hold: ord.holds?.fraud_hold || false,
                    payment_hold: ord.holds?.payment_hold || false,
                    operator_hold: ord.holds?.operator_hold || false,
                    address_hold: ord.holds?.address_hold || false,
                    shipping_method_hold: ord.holds?.shipping_method_hold || false,
                    client_hold: ord.holds?.client_hold || false
                };

                const holdsId = await db.insert(holds).values(holdsData).returning({id : holds.id})
                console.log(holdsData)
                console.log(holdsId)

                const orderData: OrderType = {
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
                    holds_id: holdsId[0].id ,
                    shipping_address_id: addressId[0].id
                };
                console.log(orderData)

                const orderId = await db.insert(order).values(orderData).returning({ id: order.id });
                console.log(orderId)

                await Promise.all(ord.line_items!.edges.map(async (Item: any) => {
                  console.log(orderId[0].id)
                    const lineItemData: LineItemType = {
                        order_id: orderId[0].id as number,
                        product_name: Item.node.product_name,
                        quantity: Item.node.quantity,
                        price: parseFloat(Item.node.price) as any
                    };
                    console.log(lineItemData)
                    await db.insert(lineItem).values(lineItemData).execute()
                }));
                console.log("hit")
                // if (ord.shipping_label) {
                //     const shippingLabelData: ShippingLabelType = {
                //         tracking_number: ord.shipping_label.tracking_number,
                //         tracking_url: ord.shipping_label.tracking_url,
                //         shipping_method: ord.shipping_label.shipping_method,
                //         shipping_name: ord.shipping_label.shipping_name,
                //         status: ord.shipping_label.status,
                //         shipment_id: orderId[0].id
                //     };
                //     await db.insert(shippingLabel).values(shippingLabelData).execute();
                // }

                // if (ord.shipment) {
                //     const shipmentData: ShipmentType = {
                //         total_packages: ord.shipment.total_packages,
                //         order_id: orderId[0].id
                //     };
                //     console.log(shipmentData);
                //     await db.insert(shipment).values(shipmentData).execute();
                // }
                
                console.log(`Order with order number ${ord.order_number} inserted successfully.`);
            // } catch (error: unknown) {
            //     console.log(error)
            // }
        }));
    // } catch (error) {
    //     console.error('Error inserting complete order data:', error);
    //     throw error;
    // }
    return

}

export async function getOrders() {
 
  const data = await db.select().from(order)
  
  return data
}

export async function getaddresses(id: number) {
  console.log("hir")
  const data = await db.select().from(address).where(eq(address.id , id)).execute()
  console.log(data)
  return data
}

export async function getLineItems(orderId: number) {
  console.log(orderId);
  try {
    const data = await db
      .select()
      .from(lineItem)
      .where(eq(lineItem.order_id, 12))
   
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching line items:", error);
    return []; // Return an empty array in case of an error
  }
}