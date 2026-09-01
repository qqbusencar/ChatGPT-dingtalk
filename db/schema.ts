import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

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
  (table) => [
    uniqueIndex('idx_hr_field_mappings_erp_field').on(table.erpField),
  ],
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

export const hrEmployees = sqliteTable(
  'hr_employees',
  {
    id: text('id').primaryKey(),
    employeeNo: text('employee_no').notNull(),
    fullName: text('full_name').notNull(),
    corporateEmail: text('corporate_email').notNull(),
    dingtalkUserId: text('dingtalk_user_id'),
    redmineLogin: text('redmine_login'),
    employeeType: text('employee_type').notNull().default('全职'),
    employmentStatus: text('employment_status').notNull().default('在职'),
    mobile: text('mobile'),
    departmentPath: text('department_path').notNull().default(''),
    jobTitle: text('job_title').notNull().default(''),
    managerName: text('manager_name').notNull().default(''),
    workplace: text('workplace').notNull().default(''),
    hireDate: text('hire_date'),
    leaveDate: text('leave_date'),
    profileJson: text('profile_json').notNull().default('{}'),
    version: integer('version').notNull().default(1),
    createdBy: text('created_by').notNull(),
    updatedBy: text('updated_by').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    deletedAt: text('deleted_at'),
  },
  (table) => [
    uniqueIndex('idx_hr_employees_employee_no').on(table.employeeNo),
    uniqueIndex('idx_hr_employees_corporate_email').on(table.corporateEmail),
    uniqueIndex('idx_hr_employees_dingtalk_user_id').on(table.dingtalkUserId),
  ],
);

export const hrMovements = sqliteTable('hr_movements', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id'),
  employeeName: text('employee_name').notNull(),
  movementType: text('movement_type').notNull(),
  effectiveDate: text('effective_date').notNull(),
  status: text('status').notNull().default('待审批'),
  handler: text('handler').notNull().default(''),
  reason: text('reason').notNull().default(''),
  beforeJson: text('before_json').notNull().default('{}'),
  afterJson: text('after_json').notNull().default('{}'),
  version: integer('version').notNull().default(1),
  createdBy: text('created_by').notNull(),
  updatedBy: text('updated_by').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  deletedAt: text('deleted_at'),
});

export const hrCompensation = sqliteTable(
  'hr_compensation',
  {
    id: text('id').primaryKey(),
    employeeId: text('employee_id').notNull(),
    employeeName: text('employee_name').notNull(),
    monthlySalaryCent: integer('monthly_salary_cent').notNull().default(0),
    effectiveDate: text('effective_date').notNull(),
    bankName: text('bank_name').notNull().default(''),
    bankAccount: text('bank_account').notNull().default(''),
    socialInsuranceStart: text('social_insurance_start'),
    benefitsJson: text('benefits_json').notNull().default('{}'),
    status: text('status').notNull().default('生效中'),
    version: integer('version').notNull().default(1),
    createdBy: text('created_by').notNull(),
    updatedBy: text('updated_by').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    deletedAt: text('deleted_at'),
  },
  (table) => [uniqueIndex('idx_hr_compensation_employee').on(table.employeeId)],
);

export const hrDepartments = sqliteTable(
  'hr_departments',
  {
    id: text('id').primaryKey(),
    departmentCode: text('department_code').notNull(),
    departmentName: text('department_name').notNull(),
    level: integer('level').notNull().default(1),
    parentId: text('parent_id'),
    managerName: text('manager_name').notNull().default(''),
    workplace: text('workplace').notNull().default(''),
    status: text('status').notNull().default('启用'),
    version: integer('version').notNull().default(1),
    createdBy: text('created_by').notNull(),
    updatedBy: text('updated_by').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    deletedAt: text('deleted_at'),
  },
  (table) => [uniqueIndex('idx_hr_departments_code').on(table.departmentCode)],
);
