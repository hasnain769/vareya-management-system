CREATE TABLE IF NOT EXISTS "order_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" varchar,
	"status_name" varchar,
	"status_date_time" timestamp,
	"status_source" varchar
);
--> statement-breakpoint
--> DROP TABLE "order_life_cycle_statuses";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_statuses" ADD CONSTRAINT "order_statuses_order_number_order_order_number_fk" FOREIGN KEY ("order_number") REFERENCES "order"("order_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
