CREATE TABLE IF NOT EXISTS "line_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"product_name" varchar,
	"quantity" integer,
	"price" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"status_name" varchar,
	"status_date_time" timestamp,
	"status_source" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shipment" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"tracking_number" varchar,
	"shipping_carrier" varchar,
	"shipping_method" varchar,
	"status" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "line_item" ADD CONSTRAINT "line_item_order_id_order_legacy_id_fk" FOREIGN KEY ("order_id") REFERENCES "order"("legacy_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_statuses" ADD CONSTRAINT "order_statuses_order_id_order_legacy_id_fk" FOREIGN KEY ("order_id") REFERENCES "order"("legacy_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipment" ADD CONSTRAINT "shipment_order_id_order_legacy_id_fk" FOREIGN KEY ("order_id") REFERENCES "order"("legacy_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
