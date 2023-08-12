CREATE TABLE IF NOT EXISTS "drinks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" text NOT NULL,
	"ingredients" json DEFAULT '[]'::json,
	"instructions" json DEFAULT '[]'::json,
	"images" json DEFAULT '[]'::json NOT NULL,
	"recommended_season" text NOT NULL,
	"optimal_time_to_enjoy" text NOT NULL,
	"is_alcoholic" boolean NOT NULL,
	"prompt" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
