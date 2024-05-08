CREATE TABLE IF NOT EXISTS "shipment" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" varchar,
	"tracking_number" varchar,
	"shipping_carrier" varchar,
	"shipping_method" varchar,
	"status" varchar
);
--> statement-breakpoint
ALTER TABLE "line_item" DROP CONSTRAINT "line_item_order_id_order_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_holds_id_holds_id_fk";
--> statement-breakpoint
ALTER TABLE "line_item" ADD COLUMN "order_number" varchar;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "order_id" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "line_item" ADD CONSTRAINT "line_item_order_number_order_order_number_fk" FOREIGN KEY ("order_number") REFERENCES "order"("order_number") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_holds_id_holds_id_fk" FOREIGN KEY ("holds_id") REFERENCES "holds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "line_item" DROP COLUMN IF EXISTS "order_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipment" ADD CONSTRAINT "shipment_order_number_order_order_number_fk" FOREIGN KEY ("order_number") REFERENCES "order"("order_number") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
