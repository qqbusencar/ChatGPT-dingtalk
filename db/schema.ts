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

export const erpRecords = sqliteTable('erp_records', {
  id: text('id').primaryKey(),
  module: text('module').notNull(),
  recordType: text('record_type').notNull(),
  title: text('title').notNull(),
  status: text('status').notNull().default('待处理'),
  owner: text('owner').notNull().default(''),
  dueAt: text('due_at'),
  payloadJson: text('payload_json').notNull().default('{}'),
  version: integer('version').notNull().default(1),
  createdBy: text('created_by').notNull(),
  updatedBy: text('updated_by').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  deletedAt: text('deleted_at'),
});

export const erpAuditLogs = sqliteTable('erp_audit_logs', {
  id: text('id').primaryKey(),
  actorId: text('actor_id').notNull(),
  actorEmail: text('actor_email').notNull().default(''),
  action: text('action').notNull(),
  module: text('module').notNull(),
  recordId: text('record_id').notNull(),
  detailJson: text('detail_json').notNull().default('{}'),
  createdAt: text('created_at').notNull(),
});

export const erpSequences = sqliteTable('erp_sequences', {
  name: text('name').primaryKey(),
  currentValue: integer('current_value').notNull().default(0),
});
