import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const hrFieldMappings = sqliteTable(
  'hr_field_mappings',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    erpField: text('erp_field').notNull(),
    erpLabel: text('erp_label').notNull(),
    dingtalkField: text('dingtalk_field').notNull(),
    redmineField: text('redmine_field').notNull(),
    transformRule: text('transform_rule').notNull().default('direct'),
    required: integer('required', { mode: 'boolean' }).notNull().default(false),
    enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [uniqueIndex('idx_hr_field_mappings_erp_field').on(table.erpField)],
);
