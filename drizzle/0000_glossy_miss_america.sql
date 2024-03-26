CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"address1" varchar,
	"address2" varchar,
	"city" varchar,
	"state" varchar,
	"zip" varchar,
	"country" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "holds" (
	"id" serial PRIMARY KEY NOT NULL,
	"fraud_hold" boolean,
	"payment_hold" boolean,
	"operator_hold" boolean,
	"address_hold" boolean,
	"shipping_method_hold" boolean,
	"client_hold" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "line_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"product_name" varchar,
	"quantity" integer,
	"price" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"legacy_id" integer,
	"shop_name" varchar,
	"order_number" varchar,
	"fulfillment_status" varchar,
	"order_date" timestamp,
	"total_tax" numeric,
	"subtotal" numeric,
	"total_price" numeric,
	"total_discounts" numeric,
	"shipping_address_id" integer,
	"holds_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_allocated" (
	"order_serial_no" serial PRIMARY KEY NOT NULL,
	"order_number" varchar,
	"order_id" integer,
	"ready_to_ship" boolean,
	"order_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_packed_out" (
	"order_serial_no" serial PRIMARY KEY NOT NULL,
	"order_id" varchar,
	"order_uuid" varchar,
	"tote_uuid" varchar,
	"order_status" varchar DEFAULT 'shipped'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shipment" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_packages" integer,
	"order_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shipping_label" (
	"id" serial PRIMARY KEY NOT NULL,
	"tracking_number" varchar,
	"tracking_url" text,
	"shipping_method" varchar,
	"shipping_name" varchar,
	"status" varchar,
	"shipment_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tote_complete" (
	"tote_id" serial PRIMARY KEY NOT NULL,
	"tote_uuid" varchar,
	"status" varchar DEFAULT 'packed'
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "line_item" ADD CONSTRAINT "line_item_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_shipping_address_id_address_id_fk" FOREIGN KEY ("shipping_address_id") REFERENCES "address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_holds_id_holds_id_fk" FOREIGN KEY ("holds_id") REFERENCES "holds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_packed_out" ADD CONSTRAINT "order_packed_out_order_id_order_allocated_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_allocated"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_packed_out" ADD CONSTRAINT "order_packed_out_order_uuid_order_allocated_order_uuid_fk" FOREIGN KEY ("order_uuid") REFERENCES "order_allocated"("order_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_packed_out" ADD CONSTRAINT "order_packed_out_tote_uuid_tote_complete_tote_uuid_fk" FOREIGN KEY ("tote_uuid") REFERENCES "tote_complete"("tote_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipment" ADD CONSTRAINT "shipment_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipping_label" ADD CONSTRAINT "shipping_label_shipment_id_shipment_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "shipment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
