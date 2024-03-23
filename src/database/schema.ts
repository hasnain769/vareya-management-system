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
    order_id: varchar('order_id').references(() => order_allocated.order_id, { onDelete: 'cascade' }),
    order_uuid: varchar('order_uuid').references(() => order_allocated.order_uuid, { onDelete: 'cascade' }),
    tote_uuid: varchar('tote_uuid').references(() => tote_complete.tote_uuid, { onDelete: 'cascade' }),
    order_status: varchar('order_status').default('shipped')
});


export type orderAllocatedType = typeof order_allocated.$inferInsert;
export type toteCompleteType= typeof tote_complete.$inferInsert;
export type orderPackedOutType = typeof order_packed_out.$inferInsert;
