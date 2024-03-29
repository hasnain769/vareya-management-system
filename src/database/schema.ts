import { Table ,sql } from "drizzle-orm";
import { pgTable, serial, timestamp, text, integer, varchar, decimal , real, boolean} from "drizzle-orm/pg-core";


export const order_allocated = pgTable('order_allocated', {
    order_serial_no : serial("order_serial_no").primaryKey(),
    order_number: varchar('order_number'),
    order_id: integer('order_id'),
    ready_to_ship : boolean('ready_to_ship'),
    order_uuid : varchar('order_uuid'),

});

export const tote_complete = pgTable('tote_complete', {
    tote_id :serial("tote_id").primaryKey(),
    tote_uuid: varchar('tote_uuid'),
    status: varchar('status').default("packed")

});


export const order_packed_out = pgTable('order_packed_out', {
    order_serial_no: serial('order_serial_no').primaryKey(),
    order_number: serial('order_number'),
    order_id: varchar('order_id').references(() => order_allocated.order_id, { onDelete: 'cascade' }),
    order_uuid: varchar('order_uuid').references(() => order_allocated.order_uuid, { onDelete: 'cascade' }),
    tote_uuid: varchar('tote_uuid').references(() => tote_complete.tote_uuid, { onDelete: 'cascade' }),
    order_status: varchar('order_status').default('shipped')
});

export const address = pgTable('address', {
    id: serial("id").primaryKey(),
    address1: varchar('address1'),
    address2: varchar('address2'),
    city: varchar('city'),
    state: varchar('state'),
    zip: varchar('zip'),
    country: varchar('country')
});

export const lineItem = pgTable('line_item', {
    id: serial("id").primaryKey(),
    order_id: integer('order_id').references(() => order.id, { onDelete: 'cascade' }),
    product_name: varchar('product_name'),
    quantity: integer('quantity'),
    price: decimal('price')
});

export const holds = pgTable('holds', {
    id: serial("id").primaryKey(),
    fraud_hold: boolean('fraud_hold'),
    payment_hold: boolean('payment_hold'),
    operator_hold: boolean('operator_hold'),
    address_hold: boolean('address_hold'),
    shipping_method_hold: boolean('shipping_method_hold'),
    client_hold: boolean('client_hold')
});

export const order = pgTable('order', {
    id: serial("id").primaryKey(),
    legacy_id: integer('legacy_id'),
    shop_name: varchar('shop_name'),
    order_number: varchar('order_number'),
    fulfillment_status: varchar('fulfillment_status'),
    order_date: timestamp('order_date'),
    total_tax: decimal('total_tax'),
    subtotal: decimal('subtotal'),
    total_price: decimal('total_price'),
    total_discounts: decimal('total_discounts'),
    shipping_address_id: integer('shipping_address_id').references(() => address.id, { onDelete: 'cascade' }),
    holds_id: integer('holds_id').references(() => holds.id, { onDelete: 'cascade' }),
    status : varchar("status")
});

export const shippingLabel = pgTable('shipping_label', {
    id: serial("id").primaryKey(),
    tracking_number: varchar('tracking_number'),
    tracking_url: text('tracking_url'),
    shipping_method: varchar('shipping_method'),
    shipping_name: varchar('shipping_name'),
    status: varchar('status'),
    shipment_id: integer('shipment_id').references(() => shipment.id, { onDelete: 'cascade' })
});

export const shipment = pgTable('shipment', {
    id: serial("id").primaryKey(),
    total_packages: integer('total_packages'),
    order_id: integer('order_id').references(() => order.id, { onDelete: 'cascade' })
});




export type orderAllocatedType = typeof order_allocated.$inferInsert;
export type toteCompleteType= typeof tote_complete.$inferInsert;
export type orderPackedOutType = typeof order_packed_out.$inferInsert;
