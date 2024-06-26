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
    order_number: varchar('order_number').references(()=>order_allocated.order_number),
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
    country: varchar('country'),
    dummy : varchar('dummy')
});

export const customers = pgTable('customer', {
    id: serial("id").primaryKey(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    email: varchar('email'),
    phone: varchar('phone')
});

export const lineItem = pgTable('line_item', {
    id: serial("id").primaryKey(),
    order_id: integer('order_id').references(() => order.legacy_id),
    product_name: varchar('product_name'),
    quantity: integer('quantity'),
    price: decimal('price')
});
export const shipment = pgTable('shipment', {
    id: serial("id").primaryKey(),
    order_id: integer('order_id').references(() => order.legacy_id),
    tracking_number: varchar('tracking_number'),
    shipping_carrier: varchar('shipping_carrier'),
    shipping_method: varchar('shipping_method') ,
    status : varchar('status'),
});

export const order_statuses = pgTable('order_statuses',{
    id: serial("id").primaryKey(),
    order_id: integer('order_id').references(() => order.legacy_id),
    status_name : varchar('status_name'),
    status_date_time : timestamp('status_date_time'),
    status_source : varchar('status_source'),
    
})

export const holds = pgTable('holds', {
    id: serial("id").primaryKey(),
    fraud_hold: boolean('fraud_hold'),
    payment_hold: boolean('payment_hold'),
    operator_hold: boolean('operator_hold'),
    address_hold: boolean('address_hold'),
    shipping_method_hold: boolean('shipping_method_hold'),
    client_hold: boolean('client_hold')
});

export const payments = pgTable('payments', {
    id: serial("id").primaryKey(),
    transaction_id: varchar('transaction_id'),
    card_type: varchar('card_type'),
    date: timestamp('date'),
    postauthed_amount: varchar('postauthed_amount'),
    authorized_amount: varchar('authorized_amount'),
    refunded_amount: varchar('refunded_amount')

});

export const order = pgTable('order', { 
    id: serial("id").primaryKey(),
    order_id : varchar("order_id"),
    legacy_id: integer('legacy_id').unique(),
    shop_name: varchar('shop_name'),
    account_id: varchar('account_id'),
    profile: varchar('profile'),
    email: varchar('email'),
    order_number: varchar('order_number').unique(),
    fulfillment_status: varchar('fulfillment_status'),
    order_date: timestamp('order_date'),
    total_tax: decimal('total_tax'),
    subtotal: decimal('subtotal'),
    total_price: decimal('total_price'),
    total_discounts: decimal('total_discounts'),
    holds_id: integer('holds_id').references(() => holds.id),
    payments_id: integer('payments_id').references(()=> payments.id),
    shipping_address_id: integer('shipping_address_id').references(() => address.id),
    billing_address_id: integer('billing_address_id').references(() => address.id),
    customer_id: integer('customer_id').references(() => customers.id),
    //pick : varchar("pick").references(() => order_allocated.order_number),
});

export type orderAllocatedType = typeof order_allocated.$inferInsert;
export type toteCompleteType= typeof tote_complete.$inferInsert;
export type orderPackedOutType = typeof order_packed_out.$inferInsert;
export type AddressType = typeof address.$inferInsert;
export type LineItemType = typeof lineItem.$inferInsert;
export type HoldsType = typeof holds.$inferInsert;
export type OrderType = typeof order.$inferInsert;
// export type ShippingLabelType = typeof shippingLabel.$inferInsert;
export type ShipmentType = typeof shipment.$inferInsert;
export type PaymentType = typeof payments.$inferInsert;

export type NewCustomer = typeof customers.$inferInsert;
export type NewOrderStatus = typeof order_statuses.$inferInsert;

export type Order = typeof order.$inferSelect;
export type Address = typeof address.$inferSelect;
export type LineItem = typeof lineItem.$inferSelect;
export type ShipmentStatus = typeof shipment.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type OrderStatus = typeof order_statuses.$inferSelect;
