CREATE TABLE "configuration" (
	"id" text PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"modified_at" timestamp with time zone DEFAULT now() NOT NULL,
	"data_type" text,
	"n_value" double precision,
	"t_value" text,
	"b_value" "bytea",
	"j_value" jsonb,
	"bo_value" boolean,
	"created_by" text,
	"modified_by" text,
	"code" text NOT NULL,
	"description" text,
	"group" text NOT NULL,
	CONSTRAINT "UQ_configuration_code" UNIQUE("code")
);
--> statement-breakpoint
CREATE INDEX "IDX_configuration_group" ON "configuration" USING btree ("group");