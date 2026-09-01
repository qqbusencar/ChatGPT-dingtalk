CREATE TABLE IF NOT EXISTS `hr_employees` (
  `id` text PRIMARY KEY NOT NULL,
  `employee_no` text NOT NULL,
  `full_name` text NOT NULL,
  `corporate_email` text NOT NULL,
  `dingtalk_user_id` text,
  `redmine_login` text,
  `employee_type` text DEFAULT '全职' NOT NULL,
  `employment_status` text DEFAULT '在职' NOT NULL,
  `mobile` text,
  `department_path` text DEFAULT '' NOT NULL,
  `job_title` text DEFAULT '' NOT NULL,
  `manager_name` text DEFAULT '' NOT NULL,
  `workplace` text DEFAULT '' NOT NULL,
  `hire_date` text,
  `leave_date` text,
  `profile_json` text DEFAULT '{}' NOT NULL,
  `version` integer DEFAULT 1 NOT NULL,
  `created_by` text NOT NULL,
  `updated_by` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  `deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_hr_employees_employee_no` ON `hr_employees` (`employee_no`);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_hr_employees_corporate_email` ON `hr_employees` (`corporate_email`);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_hr_employees_dingtalk_user_id` ON `hr_employees` (`dingtalk_user_id`) WHERE `dingtalk_user_id` IS NOT NULL AND `dingtalk_user_id` != '';
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_hr_employees_status_department` ON `hr_employees` (`employment_status`, `department_path`) WHERE `deleted_at` IS NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `hr_movements` (
  `id` text PRIMARY KEY NOT NULL,
  `employee_id` text,
  `employee_name` text NOT NULL,
  `movement_type` text NOT NULL,
  `effective_date` text NOT NULL,
  `status` text DEFAULT '待审批' NOT NULL,
  `handler` text DEFAULT '' NOT NULL,
  `reason` text DEFAULT '' NOT NULL,
  `before_json` text DEFAULT '{}' NOT NULL,
  `after_json` text DEFAULT '{}' NOT NULL,
  `version` integer DEFAULT 1 NOT NULL,
  `created_by` text NOT NULL,
  `updated_by` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  `deleted_at` text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_hr_movements_employee_date` ON `hr_movements` (`employee_id`, `effective_date`) WHERE `deleted_at` IS NULL;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_hr_movements_status` ON `hr_movements` (`status`, `effective_date`) WHERE `deleted_at` IS NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `hr_compensation` (
  `id` text PRIMARY KEY NOT NULL,
  `employee_id` text NOT NULL,
  `employee_name` text NOT NULL,
  `monthly_salary_cent` integer DEFAULT 0 NOT NULL,
  `effective_date` text NOT NULL,
  `bank_name` text DEFAULT '' NOT NULL,
  `bank_account` text DEFAULT '' NOT NULL,
  `social_insurance_start` text,
  `benefits_json` text DEFAULT '{}' NOT NULL,
  `status` text DEFAULT '生效中' NOT NULL,
  `version` integer DEFAULT 1 NOT NULL,
  `created_by` text NOT NULL,
  `updated_by` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  `deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_hr_compensation_employee` ON `hr_compensation` (`employee_id`) WHERE `deleted_at` IS NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `hr_departments` (
  `id` text PRIMARY KEY NOT NULL,
  `department_code` text NOT NULL,
  `department_name` text NOT NULL,
  `level` integer DEFAULT 1 NOT NULL,
  `parent_id` text,
  `manager_name` text DEFAULT '' NOT NULL,
  `workplace` text DEFAULT '' NOT NULL,
  `status` text DEFAULT '启用' NOT NULL,
  `version` integer DEFAULT 1 NOT NULL,
  `created_by` text NOT NULL,
  `updated_by` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  `deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_hr_departments_code` ON `hr_departments` (`department_code`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_hr_departments_parent` ON `hr_departments` (`parent_id`, `level`) WHERE `deleted_at` IS NULL;
--> statement-breakpoint
PRAGMA optimize;
