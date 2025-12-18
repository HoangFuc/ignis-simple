CREATE TABLE "product" (
	"id" text PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"modified_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" text,
	"modified_by" text,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	CONSTRAINT "UQ_product_code" UNIQUE("code")
);
