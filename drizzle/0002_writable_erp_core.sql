CREATE TABLE IF NOT EXISTS `erp_records` (
  `id` text PRIMARY KEY NOT NULL,
  `module` text NOT NULL,
  `record_type` text NOT NULL,
  `title` text NOT NULL,
  `status` text DEFAULT '待处理' NOT NULL,
  `owner` text DEFAULT '' NOT NULL,
  `due_at` text,
  `payload_json` text DEFAULT '{}' NOT NULL,
  `version` integer DEFAULT 1 NOT NULL,
  `created_by` text NOT NULL,
  `updated_by` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  `deleted_at` text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_erp_records_module_status`
ON `erp_records` (`module`, `status`)
WHERE `deleted_at` IS NULL;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_erp_records_updated_at`
ON `erp_records` (`updated_at`)
WHERE `deleted_at` IS NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `erp_audit_logs` (
  `id` text PRIMARY KEY NOT NULL,
  `actor_id` text NOT NULL,
  `actor_email` text DEFAULT '' NOT NULL,
  `action` text NOT NULL,
  `module` text NOT NULL,
  `record_id` text NOT NULL,
  `detail_json` text DEFAULT '{}' NOT NULL,
  `created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_erp_audit_logs_record`
ON `erp_audit_logs` (`record_id`, `created_at`);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `erp_sequences` (
  `name` text PRIMARY KEY NOT NULL,
  `current_value` integer DEFAULT 0 NOT NULL
);
