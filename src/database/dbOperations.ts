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
  
  export async function insertCompleteOrder(orderData: any[]): Promise<void> {
    console.log(orderData);
    try {
      let i=0
        for (const order of orderData) {
            console.log(i);
            i++
            // Check if the order already exists
            const existingOrder = await db.select().from(order).where(eq(order.order_number, order.order_number)).execute();
            if (existingOrder.length > 0) {
              console.log("hit")
                console.log(`Order with order number ${order.order_number} already exists. Skipping insertion.`);
                continue;
            }

            // Insert address data
            const addressData: any = {
                address1: order.shipping_address.address1,
                address2: order.shipping_address.address2 || null,
                city: order.shipping_address.city,
                state: order.shipping_address.state,
                zip: order.shipping_address.zip,
                country: order.shipping_address.country
            };
            console.log(addressData);
            const addressId = await db.insert(address).values(addressData).returning({ id: address.id }).execute();

            // Insert holds data
            const holdsData: HoldsType = {
                fraud_hold: order.holds.fraud_hold,
                payment_hold: order.holds.payment_hold,
                operator_hold: order.holds.operator_hold,
                address_hold: order.holds.address_hold,
                shipping_method_hold: order.holds.shipping_method_hold,
                client_hold: order.holds.client_hold
            };
            const holdsId = await db.insert(holds).values(holdsData).returning({ id: holds.id }).execute();

            // Insert order data
            const orderData: OrderType = {
                legacy_id: order.legacy_id,
                shop_name: order.shop_name,
                account_id: order.account_id,
                profile: order.profile,
                email: order.email,
                order_number: order.order_number,
                fulfillment_status: order.fulfillment_status,
                order_date: new Date(order.order_date),
                total_tax: parseFloat(order.total_tax) as any,
                subtotal: parseFloat(order.subtotal) as any,
                total_price: parseFloat(order.total_price) as any,
                total_discounts: parseFloat(order.total_discounts) as any,
                holds_id: holdsId as any,
                shipping_address_id: addressId as any
            };
            const orderId = await db.insert(order).values(orderData).returning({ id: order.id }).execute(); // This line seems to cause the issue

            // Insert line items data
            for (const lineItem of order.line_items.edges) {
                const lineItemData: LineItemType = {
                    order_id: orderId as any,
                    product_name: lineItem.node.product_name,
                    quantity: lineItem.node.quantity,
                    price: parseFloat(lineItem.node.price) as any
                };
                await db.insert(lineItem).values(lineItemData).execute();
            }

            // Insert shipping label data if available
            if (order.shipping_label) {
                const shippingLabelData: ShippingLabelType = {
                    tracking_number: order.shipping_label.tracking_number,
                    tracking_url: order.shipping_label.tracking_url,
                    shipping_method: order.shipping_label.shipping_method,
                    shipping_name: order.shipping_label.shipping_name,
                    status: order.shipping_label.status,
                    shipment_id: orderId as any
                };
                await db.insert(shippingLabel).values(shippingLabelData).execute();
            }

            // Insert shipment data if available
            if (order.shipment) {
                const shipmentData: ShipmentType = {
                    total_packages: order.shipment.total_packages,
                    order_id: orderId as any
                };
                await db.insert(shipment).values(shipmentData).execute();
            }

            console.log(`Order with order number ${order.order_number} inserted successfully.`);
        }
    } catch (error) {
        console.error('Error inserting complete order data:', error);
        throw error;
    }
}
