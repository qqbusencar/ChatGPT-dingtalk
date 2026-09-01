const worker = (await import('../dist/server/index.js')).default;
const page = await worker.fetch(new Request('https://local/'), {});
const html = await page.text();
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
scripts.forEach((match) => new Function(match[1]));
const hrUi = await worker.fetch(new Request('https://local/hr-ui.js'), {});
const hrUiSource = await hrUi.text();
new Function(hrUiSource);
const unauth = await worker.fetch(
  new Request('https://local/api/hr/employees'),
  {},
);
class FakeStatement {
  constructor(sql) {
    this.sql = sql;
  }
  bind() {
    return this;
  }
  async run() {
    return { meta: { changes: 1 } };
  }
  async all() {
    return { results: [] };
  }
  async first() {
    if (this.sql.includes('INSERT INTO erp_sequences'))
      return { current_value: 1 };
    if (this.sql.includes('FROM hr_employees WHERE full_name='))
      return {
        id: 'employee-1',
        employeeNo: 'DT202600001',
        fullName: '测试员工',
      };
    return null;
  }
}
const fakeDb = {
  prepare(sql) {
    return new FakeStatement(sql);
  },
  async batch(statements) {
    return Promise.all(statements.map((statement) => statement.run()));
  },
};
const authHeaders = {
  'content-type': 'application/json',
  'oai-authenticated-user-id': 'qa-user',
  'oai-authenticated-user-email': 'qa@example.com',
};
async function post(path, body) {
  return worker.fetch(
    new Request('https://local' + path, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(body),
    }),
    { DB: fakeDb },
  );
}
const writes = await Promise.all([
  post('/api/hr/employees', {
    fullName: '测试员工',
    corporateEmail: 'qa.employee@example.com',
    employeeType: '全职',
    employmentStatus: '在职',
  }),
  post('/api/hr/movements', {
    employeeName: '测试员工',
    movementType: '调岗',
    effectiveDate: '2026-09-01',
    status: '待审批',
  }),
  post('/api/hr/compensation', {
    employeeName: '测试员工',
    monthlySalary: '10000',
    effectiveDate: '2026-09-01',
    status: '生效中',
  }),
  post('/api/hr/departments', {
    departmentCode: 'QA',
    departmentName: '测试部门',
    level: '1',
    status: '启用',
  }),
]);
if (
  page.status !== 200 ||
  hrUi.status !== 200 ||
  unauth.status !== 401 ||
  !html.includes('/hr-ui.js') ||
  !hrUiSource.includes('员工信息库') ||
  writes.some((response) => response.status !== 201)
) {
  throw new Error('HR smoke test failed');
}
console.log(
  JSON.stringify({
    page: page.status,
    embeddedScripts: scripts.length,
    hrUi: hrUi.status,
    hrUiBytes: hrUiSource.length,
    unauth: unauth.status,
    writeStatuses: writes.map((response) => response.status),
  }),
);
