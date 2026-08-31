CREATE TABLE IF NOT EXISTS `hr_field_mappings` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `erp_field` text NOT NULL,
  `erp_label` text NOT NULL,
  `dingtalk_field` text NOT NULL,
  `redmine_field` text NOT NULL,
  `transform_rule` text DEFAULT 'direct' NOT NULL,
  `required` integer DEFAULT false NOT NULL,
  `enabled` integer DEFAULT true NOT NULL,
  `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_hr_field_mappings_erp_field`
ON `hr_field_mappings` (`erp_field`);
