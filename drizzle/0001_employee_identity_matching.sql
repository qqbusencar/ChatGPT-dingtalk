UPDATE `hr_field_mappings`
SET `erp_label` = 'ERP 工号（自动生成）',
    `dingtalk_field` = '— 无对应字段 —',
    `redmine_field` = '— 无对应字段 —',
    `transform_rule` = 'auto_sequence',
    `required` = true,
    `updated_at` = CURRENT_TIMESTAMP
WHERE `erp_field` = 'employee_no';
--> statement-breakpoint
UPDATE `hr_field_mappings`
SET `erp_label` = '企业邮箱（手动录入）',
    `dingtalk_field` = '— 无对应字段 —',
    `redmine_field` = 'mail',
    `transform_rule` = 'manual_review',
    `required` = true,
    `updated_at` = CURRENT_TIMESTAMP
WHERE `erp_field` = 'email';
--> statement-breakpoint
UPDATE `hr_field_mappings`
SET `erp_label` = '姓名（辅助核对）',
    `dingtalk_field` = 'name',
    `redmine_field` = 'firstname + lastname',
    `transform_rule` = 'concat',
    `required` = true,
    `updated_at` = CURRENT_TIMESTAMP
WHERE `erp_field` = 'full_name';
--> statement-breakpoint
INSERT OR IGNORE INTO `hr_field_mappings`
(`erp_field`, `erp_label`, `dingtalk_field`, `redmine_field`, `transform_rule`, `required`, `enabled`, `updated_at`)
VALUES ('dingtalk_user_id', '钉钉 UserID（接口获取）', 'userid', '— 无对应字段 —', 'direct', true, true, CURRENT_TIMESTAMP);
