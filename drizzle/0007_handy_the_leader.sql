DROP TABLE "line_item";--> statement-breakpoint
DROP TABLE "order_statuses";--> statement-breakpoint
DROP TABLE "shipment";--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_legacy_id_unique" UNIQUE("legacy_id");