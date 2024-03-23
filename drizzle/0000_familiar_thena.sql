CREATE TABLE IF NOT EXISTS "order_allocated" (
	"order_number" varchar PRIMARY KEY NOT NULL,
	"order_id" integer,
	"ready_to_ship" boolean,
	"order_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_packed_out" (
	"order_serial_no" serial PRIMARY KEY NOT NULL,
	"order_number" varchar,
	"tote_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tote_complete" (
	"tote_uuid" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_packed_out" ADD CONSTRAINT "order_packed_out_order_number_order_allocated_order_number_fk" FOREIGN KEY ("order_number") REFERENCES "order_allocated"("order_number") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_packed_out" ADD CONSTRAINT "order_packed_out_tote_uuid_tote_complete_tote_uuid_fk" FOREIGN KEY ("tote_uuid") REFERENCES "tote_complete"("tote_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
