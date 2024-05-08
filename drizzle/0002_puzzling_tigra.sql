CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" varchar,
	"date" timestamp,
	"postauthed_amount" varchar,
	"authorized_amount" varchar,
	"redunded_amount" varchar
);
--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "payments_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_payments_id_payments_id_fk" FOREIGN KEY ("payments_id") REFERENCES "payments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
