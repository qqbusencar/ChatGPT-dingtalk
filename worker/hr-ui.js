(function () {
  var hrTab = '员工信息库',
    hrRows = [],
    hrEditing = null,
    showSalary = false;
  var tabMap = {
    员工信息库: 'employees',
    入转调离: 'movements',
    薪酬福利: 'compensation',
    组织架构: 'departments',
    三方字段映射: 'mappings',
  };
  var titles = {
    employees: '员工档案',
    movements: '人事异动',
    compensation: '薪酬福利',
    departments: '组织节点',
  };
  var fieldSets = {
    employees: [
      ['fullName', '姓名', 'text', true],
      ['corporateEmail', '企业邮箱', 'email', true],
      [
        'employeeType',
        '员工类型',
        'select',
        true,
        ['全职', '实习', '劳务', '顾问'],
      ],
      [
        'employmentStatus',
        '人员状态',
        'select',
        true,
        ['在职', '试用期', '待入职', '离职'],
      ],
      ['dingtalkUserId', '钉钉 UserID（接口同步）', 'text', false],
      ['redmineLogin', 'Redmine 登录名', 'text', false],
      ['redmineName', 'Redmine 姓名', 'text', false],
      ['mobile', '手机号码', 'tel', false],
      ['workplace', '办公地点', 'text', false],
      ['departmentPath', '部门路径', 'text', true],
      ['jobTitle', '职位', 'text', false],
      ['managerName', '汇报关系', 'text', false],
      ['hireDate', '入职日期', 'date', false],
      ['leaveDate', '离职日期', 'date', false],
      ['gender', '性别', 'select', false, ['男', '女', '其他']],
      ['personalEmail', '个人邮箱', 'email', false],
      ['idCard', '身份证号', 'text', false],
      ['education', '学历', 'text', false],
      ['school', '毕业院校', 'text', false],
      ['major', '专业', 'text', false],
      ['birthDate', '出生日期', 'date', false],
      ['ethnicity', '民族', 'text', false],
      ['nativePlace', '籍贯', 'text', false],
      ['householdType', '户口性质', 'text', false],
      ['maritalStatus', '婚姻状况', 'select', false, ['未婚', '已婚', '其他']],
      ['graduationDate', '毕业日期', 'date', false],
      ['registeredAddress', '户籍地址', 'textarea', false],
      ['currentAddress', '现居地址', 'textarea', false],
      ['emergencyContact', '紧急联系人', 'text', false],
      ['emergencyPhone', '紧急联系人电话', 'tel', false],
      ['probationMonths', '试用期月数', 'number', false],
      ['probationEnd', '试用期结束时间', 'date', false],
      ['contractStart', '合同开始时间', 'date', false],
      ['contractEnd', '合同结束时间', 'date', false],
      ['contractEntity', '合同签订主体', 'text', false],
    ],
    movements: [
      ['employeeName', '员工姓名', 'text', true],
      [
        'movementType',
        '异动类型',
        'select',
        true,
        ['入职', '转正', '调岗', '调薪', '合同变更', '离职'],
      ],
      ['effectiveDate', '生效日期', 'date', true],
      [
        'status',
        '流程状态',
        'select',
        true,
        ['待审批', '审批中', '已生效', '已驳回', '已撤回'],
      ],
      ['handler', '办理负责人', 'text', false],
      ['reason', '异动原因', 'textarea', false],
      ['beforeDepartment', '异动前部门', 'text', false],
      ['afterDepartment', '异动后部门', 'text', false],
      ['beforeTitle', '异动前职位', 'text', false],
      ['afterTitle', '异动后职位', 'text', false],
      ['beforeManager', '异动前汇报关系', 'text', false],
      ['afterManager', '异动后汇报关系', 'text', false],
      ['beforeSalary', '异动前月薪资（元）', 'number', false],
      ['afterSalary', '异动后月薪资（元）', 'number', false],
      ['beforeContractTerm', '异动前合同时间', 'text', false],
      ['afterContractTerm', '异动后合同时间', 'text', false],
      ['beforeContractEntity', '异动前合同主体', 'text', false],
      ['afterContractEntity', '异动后合同主体', 'text', false],
      ['handoverOwner', '交接负责人', 'text', false],
      ['notes', '备注', 'textarea', false],
    ],
    compensation: [
      ['employeeName', '员工姓名', 'text', true],
      ['monthlySalary', '月薪资（元）', 'number', true],
      ['effectiveDate', '生效日期', 'date', true],
      ['status', '状态', 'select', true, ['待生效', '生效中', '已失效']],
      ['bankName', '中国银行开户行', 'text', false],
      ['bankAccount', '中国银行卡号', 'text', false],
      ['secondaryBankName', '其他银行开户行', 'text', false],
      ['secondaryBankAccount', '其他银行账号', 'text', false],
      ['socialInsuranceStart', '社保初始缴纳日期', 'date', false],
      ['socialInsuranceBase', '社保基数（元）', 'number', false],
      ['providentFundBase', '公积金基数（元）', 'number', false],
      ['allowance', '补贴（元/月）', 'number', false],
      ['bonusPlan', '奖金方案', 'textarea', false],
      ['benefitNotes', '福利备注', 'textarea', false],
    ],
    departments: [
      ['departmentCode', '部门编码', 'text', true],
      ['departmentName', '部门名称', 'text', true],
      ['level', '组织层级', 'select', true, ['1', '2', '3']],
      ['parentId', '上级组织', 'select', false, []],
      ['managerName', '部门负责人', 'text', false],
      ['workplace', '办公地点', 'text', false],
      ['status', '状态', 'select', true, ['启用', '停用']],
    ],
  };
  function h(v) {
    return esc(v);
  }
  function hrHero() {
    return (
      '<section class="hero"><div><span class="eye">PEOPLE OPERATIONS</span><h1>HR 中心</h1><p>覆盖员工主数据、入转调离、薪酬福利与三级组织架构；字段依据 DTEN 花名册建立。</p></div><div class="actions">' +
      tag('正式数据', 'green') +
      '<button class="btn" data-act="hr-export">导出当前表</button>' +
      (hrTab === '三方字段映射'
        ? ''
        : '<button class="btn primary" data-act="hr-new">＋ 新增' +
          titles[tabMap[hrTab]] +
          '</button>') +
      '</div></section><nav class="subnav">' +
      Object.keys(tabMap)
        .map(function (x) {
          return (
            '<button class="' +
            (x === hrTab ? 'active' : '') +
            '" data-hr-tab="' +
            x +
            '">' +
            x +
            '</button>'
          );
        })
        .join('') +
      '</nav>'
    );
  }
  function kpis(type) {
    var a = [];
    if (type === 'employees') {
      a = [
        ['员工总数', hrRows.length, '份正式档案'],
        [
          '在职人数',
          hrRows.filter(function (x) {
            return (
              x.employmentStatus === '在职' || x.employmentStatus === '试用期'
            );
          }).length,
          '含试用期',
        ],
        [
          '待完善档案',
          hrRows.filter(function (x) {
            return !x.dingtalkUserId || !x.departmentPath;
          }).length,
          '缺少 UserID 或部门',
        ],
        [
          '离职员工',
          hrRows.filter(function (x) {
            return x.employmentStatus === '离职';
          }).length,
          '保留历史档案',
        ],
      ];
    } else if (type === 'movements') {
      a = [
        ['异动记录', hrRows.length, '全流程留痕'],
        [
          '待审批',
          hrRows.filter(function (x) {
            return x.status === '待审批' || x.status === '审批中';
          }).length,
          '需继续处理',
        ],
        [
          '本月生效',
          hrRows.filter(function (x) {
            return (
              (x.effectiveDate || '').slice(0, 7) ===
              new Date().toISOString().slice(0, 7)
            );
          }).length,
          '按生效日期',
        ],
        [
          '已生效',
          hrRows.filter(function (x) {
            return x.status === '已生效';
          }).length,
          '已更新档案',
        ],
      ];
    } else if (type === 'compensation') {
      a = [
        ['薪酬档案', hrRows.length, '按员工一人一档'],
        [
          '生效中',
          hrRows.filter(function (x) {
            return x.status === '生效中';
          }).length,
          '当前有效',
        ],
        [
          '社保待完善',
          hrRows.filter(function (x) {
            return !x.socialInsuranceStart;
          }).length,
          '缺少缴纳日期',
        ],
        [
          '银行信息待完善',
          hrRows.filter(function (x) {
            return !x.bankAccount;
          }).length,
          '缺少工资卡',
        ],
      ];
    } else {
      a = [
        ['组织节点', hrRows.length, '三级组织架构'],
        [
          '一级部门',
          hrRows.filter(function (x) {
            return Number(x.level) === 1;
          }).length,
          '中心/事业部',
        ],
        [
          '启用节点',
          hrRows.filter(function (x) {
            return x.status === '启用';
          }).length,
          '当前有效',
        ],
        [
          '配置负责人',
          hrRows.filter(function (x) {
            return !!x.managerName;
          }).length,
          '已明确负责人',
        ],
      ];
    }
    return (
      '<div class="grid c4">' +
      a
        .map(function (x) {
          return (
            '<div class="card kpi"><span class="label">' +
            x[0] +
            '</span><h2>' +
            x[1] +
            '</h2><small>' +
            x[2] +
            '</small></div>'
          );
        })
        .join('') +
      '</div>'
    );
  }
  function toolbar(type) {
    var filters =
      type === 'employees'
        ? '<select id="hrStatusFilter"><option value="">全部状态</option><option>在职</option><option>试用期</option><option>待入职</option><option>离职</option></select>'
        : type === 'movements'
          ? '<select id="hrStatusFilter"><option value="">全部流程</option><option>待审批</option><option>审批中</option><option>已生效</option><option>已驳回</option></select>'
          : '';
    return (
      '<div class="hr-toolbar"><div class="filters">' +
      filters +
      '<input id="hrSearch" placeholder="搜索姓名、部门、职位或编号"></div><div class="actions">' +
      (type === 'compensation'
        ? '<button class="btn" data-act="hr-salary-toggle">' +
          (showSalary ? '隐藏薪资' : '显示薪资') +
          '</button>'
        : '') +
      '<button class="btn" data-act="hr-refresh">刷新</button></div></div>'
    );
  }
  function masked(v) {
    v = String(v || '');
    return v.length < 7 ? '—' : v.slice(0, 4) + ' **** ' + v.slice(-4);
  }
  function money(c) {
    return showSalary
      ? '¥ ' +
          (Number(c || 0) / 100).toLocaleString('zh-CN', {
            minimumFractionDigits: 2,
          })
      : '¥ ••••••';
  }
  function actions(x) {
    return (
      '<div class="record-actions"><button class="mini" data-act="hr-edit" data-id="' +
      x.id +
      '">编辑</button><button class="mini" data-act="hr-delete" data-id="' +
      x.id +
      '">删除</button></div>'
    );
  }
  function rowsTable(type, rows) {
    if (!rows.length)
      return (
        '<div class="empty-state"><b>暂无' +
        titles[type] +
        '数据</b>点击右上角“新增”开始建立正式记录。</div>'
      );
    if (type === 'employees')
      return table(
        [
          '工号 / 姓名',
          '企业身份',
          '部门 / 职位',
          '状态',
          '入职日期',
          '办公地点',
          '操作',
        ],
        rows.map(function (x) {
          return [
            '<b>' +
              h(x.employeeNo) +
              '</b><small>' +
              h(x.fullName) +
              '</small>',
            '<span>' +
              h(x.corporateEmail) +
              '</span><small>钉钉：' +
              h(x.dingtalkUserId || '待绑定') +
              '</small>',
            h(x.departmentPath || '—') +
              '<small>' +
              h(x.jobTitle || '未填写') +
              ' · 汇报 ' +
              h(x.managerName || '未填写') +
              '</small>',
            tag(
              h(x.employmentStatus),
              x.employmentStatus === '离职'
                ? 'red'
                : x.employmentStatus === '试用期'
                  ? 'amber'
                  : 'green',
            ),
            h(x.hireDate || '—'),
            h(x.workplace || '—'),
            actions(x),
          ];
        }),
      );
    if (type === 'movements')
      return table(
        [
          '员工',
          '异动类型',
          '生效日期',
          '异动前',
          '异动后',
          '流程状态',
          '负责人',
          '操作',
        ],
        rows.map(function (x) {
          return [
            '<b>' + h(x.employeeName) + '</b>',
            h(x.movementType),
            h(x.effectiveDate),
            h(x.beforeSummary || '—'),
            h(x.afterSummary || '—'),
            tag(
              h(x.status),
              x.status === '已生效'
                ? 'green'
                : x.status === '已驳回'
                  ? 'red'
                  : 'amber',
            ),
            h(x.handler || '—'),
            actions(x),
          ];
        }),
      );
    if (type === 'compensation')
      return table(
        ['员工', '月薪资', '工资卡', '社保起缴', '生效日期', '状态', '操作'],
        rows.map(function (x) {
          return [
            '<b>' +
              h(x.employeeName) +
              '</b><small>' +
              h(x.employeeNo || '') +
              '</small>',
            money(x.monthlySalaryCent),
            h(masked(x.bankAccount)) +
              '<small>' +
              h(x.bankName || '未填写开户行') +
              '</small>',
            h(x.socialInsuranceStart || '待完善'),
            h(x.effectiveDate),
            tag(h(x.status), x.status === '生效中' ? 'green' : 'amber'),
            actions(x),
          ];
        }),
      );
    return table(
      [
        '组织编码',
        '部门名称',
        '层级',
        '上级组织',
        '负责人',
        '办公地点',
        '在职人数',
        '状态',
        '操作',
      ],
      rows.map(function (x) {
        return [
          '<b>' + h(x.departmentCode) + '</b>',
          h(x.departmentName),
          '第 ' + h(x.level) + ' 级',
          h(x.parentName || '—'),
          h(x.managerName || '—'),
          h(x.workplace || '—'),
          h(x.headcount || 0),
          tag(h(x.status), x.status === '启用' ? 'green' : 'red'),
          actions(x),
        ];
      }),
    );
  }
  function sourceFields() {
    return (
      '<section class="card gap">' +
      head(
        '花名册字段覆盖',
        '系统已按原表字段拆分至员工档案、薪酬福利、异动和组织模块',
        '<span class="tag blue">57 个原始字段</span>',
      ) +
      '<div class="groups"><div class="group"><b>身份与任职</b><small>姓名、企业邮箱、钉钉 UserID、Redmine、人员状态、职位、汇报关系</small></div><div class="group"><b>个人与合同</b><small>证件、教育、地址、紧急联系人、试用期、合同期限与签订主体</small></div><div class="group"><b>薪酬与福利</b><small>月薪资、工资银行卡、开户行、社保起缴日期及补充福利</small></div></div></section>'
    );
  }
  function renderHr() {
    active = 'HR 中心';
    renderNav();
    pageName.innerHTML = 'HR 中心 <small>人力资源全生命周期管理</small>';
    app.innerHTML =
      hrHero() +
      '<div id="hrBody"><div class="empty-state"><span class="spinner"></span> 正在读取正式人事数据…</div></div>';
    scrollTo({ top: 0, behavior: 'smooth' });
    loadHrSection();
  }
  async function loadHrSection() {
    var type = tabMap[hrTab],
      body = document.getElementById('hrBody');
    if (!body) return;
    if (type === 'mappings') {
      body.innerHTML = sourceFields() + integrationPanel();
      loadHr();
      return;
    }
    try {
      var r = await fetch('/api/hr/' + type),
        d = await r.json();
      if (!r.ok) throw new Error(d.message || '读取失败');
      hrRows = d.records || [];
      body.innerHTML =
        kpis(type) +
        '<section class="card gap">' +
        head(
          titles[type] + '管理',
          '正式数据写入、修改版本控制与操作审计',
          '',
        ) +
        toolbar(type) +
        '<div id="hrTable">' +
        rowsTable(type, hrRows) +
        '</div></section>' +
        sourceFields();
    } catch (e) {
      body.innerHTML =
        '<div class="empty-state"><b>人事数据读取失败</b>' +
        h(e.message) +
        '</div>';
    }
  }
  function fieldHtml(f, type, rec) {
    var key = f[0],
      label = f[1],
      kind = f[2],
      required = f[3],
      options = f[4] || [],
      value = rec && rec[key] != null ? rec[key] : '';
    if (type === 'employees' && rec && rec.profile && rec.profile[key] != null)
      value = rec.profile[key];
    if (type === 'movements' && rec && rec.detail && rec.detail[key] != null)
      value = rec.detail[key];
    if (
      type === 'compensation' &&
      rec &&
      rec.benefits &&
      rec.benefits[key] != null
    )
      value = rec.benefits[key];
    if (key === 'monthlySalary' && rec)
      value = Number(rec.monthlySalaryCent || 0) / 100;
    if (key === 'parentId' && type === 'departments')
      options = [['', '— 无上级 —']].concat(
        hrRows
          .filter(function (x) {
            return !rec || x.id !== rec.id;
          })
          .map(function (x) {
            return [x.id, x.departmentName];
          }),
      );
    var attr =
      ' name="' +
      key +
      '" ' +
      (required ? 'required ' : '') +
      (kind === 'number' ? 'min="0" step="0.01" ' : '');
    if (kind === 'textarea')
      return (
        '<div class="field full"><label>' +
        label +
        (required ? ' *' : '') +
        '</label><textarea' +
        attr +
        '>' +
        h(value) +
        '</textarea></div>'
      );
    if (kind === 'select') {
      return (
        '<div class="field"><label>' +
        label +
        (required ? ' *' : '') +
        '</label><select' +
        attr +
        '>' +
        options
          .map(function (o) {
            var val = Array.isArray(o) ? o[0] : o,
              txt = Array.isArray(o) ? o[1] : o;
            return (
              '<option value="' +
              h(val) +
              '" ' +
              (String(val) === String(value) ? 'selected' : '') +
              '>' +
              h(txt) +
              '</option>'
            );
          })
          .join('') +
        '</select></div>'
      );
    }
    return (
      '<div class="field"><label>' +
      label +
      (required ? ' *' : '') +
      '</label><input type="' +
      kind +
      '" value="' +
      h(value) +
      '"' +
      attr +
      '></div>'
    );
  }
  function openHrModal(rec) {
    var type = tabMap[hrTab];
    hrEditing = rec || null;
    var modal = document.getElementById('hrEntityModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'hrEntityModal';
      modal.className = 'modal-backdrop';
      modal.innerHTML =
        '<div class="modal hr-modal"><div class="modal-head"><h3 id="hrModalTitle"></h3><button class="modal-close" data-act="hr-close">×</button></div><form id="hrEntityForm"><div class="form-grid" id="hrFields"></div><div class="modal-foot"><button class="btn" type="button" data-act="hr-close">取消</button><button class="btn primary" type="submit">保存正式数据</button></div></form></div>';
      document.body.appendChild(modal);
      document
        .getElementById('hrEntityForm')
        .addEventListener('submit', saveHrEntity);
    }
    document.getElementById('hrModalTitle').textContent =
      (rec ? '编辑' : '新增') + titles[type];
    document.getElementById('hrFields').innerHTML = fieldSets[type]
      .map(function (f) {
        return fieldHtml(f, type, rec);
      })
      .join('');
    modal.classList.add('open');
  }
  function closeHrModal() {
    var m = document.getElementById('hrEntityModal');
    if (m) m.classList.remove('open');
    hrEditing = null;
  }
  async function saveHrEntity(e) {
    e.preventDefault();
    var type = tabMap[hrTab],
      fd = new FormData(e.currentTarget),
      body = {};
    fieldSets[type].forEach(function (f) {
      body[f[0]] = String(fd.get(f[0]) || '').trim();
    });
    var wasEditing = Boolean(hrEditing);
    if (hrEditing) body.version = hrEditing.version;
    var url = '/api/hr/' + type + (hrEditing ? '/' + hrEditing.id : ''),
      r = await fetch(url, {
        method: hrEditing ? 'PATCH' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }),
      d = await r.json();
    if (!r.ok) {
      say(d.message || '保存失败');
      return;
    }
    closeHrModal();
    await loadHrSection();
    say((wasEditing ? '数据已更新' : '数据已保存') + '，操作已写入审计日志');
  }
  async function removeHrEntity(id) {
    if (!confirm('确认删除这条人事记录？系统将执行可审计的软删除。')) return;
    var rec = hrRows.find(function (x) {
        return x.id === id;
      }),
      type = tabMap[hrTab],
      r = await fetch('/api/hr/' + type + '/' + id, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ version: rec && rec.version }),
      }),
      d = await r.json();
    if (!r.ok) throw new Error(d.message || '删除失败');
    await loadHrSection();
    say('记录已删除，历史审计仍保留');
  }
  function exportHr() {
    if (hrTab === '三方字段映射') {
      say('请使用字段映射表中的保存功能');
      return;
    }
    var type = tabMap[hrTab],
      rows = [Object.keys(hrRows[0] || {})].concat(
        hrRows.map(function (x) {
          return Object.keys(hrRows[0] || {}).map(function (k) {
            var v = x[k];
            return typeof v === 'object' ? JSON.stringify(v) : v;
          });
        }),
      ),
      csv =
        '\ufeff' +
        rows
          .map(function (row) {
            return row
              .map(function (v) {
                return (
                  '"' + String(v == null ? '' : v).replaceAll('"', '""') + '"'
                );
              })
              .join(',');
          })
          .join('\n'),
      a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8' }),
    );
    a.download =
      'DTEN-HR-' + hrTab + '-' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    say('当前正式数据已导出');
  }
  function filterHr() {
    var q = (
        (document.getElementById('hrSearch') &&
          document.getElementById('hrSearch').value) ||
        ''
      ).toLowerCase(),
      s =
        (document.getElementById('hrStatusFilter') &&
          document.getElementById('hrStatusFilter').value) ||
        '',
      type = tabMap[hrTab],
      rows = hrRows.filter(function (x) {
        return (
          (!q || JSON.stringify(x).toLowerCase().includes(q)) &&
          (!s || (x.employmentStatus || x.status) === s)
        );
      }),
      box = document.getElementById('hrTable');
    if (box) box.innerHTML = rowsTable(type, rows);
  }
  var priorRender = render;
  render = function (n) {
    if (n === 'HR 中心') renderHr();
    else priorRender(n);
  };
  document.addEventListener(
    'click',
    async function (e) {
      var tab = e.target.closest('[data-hr-tab]');
      if (tab) {
        e.preventDefault();
        hrTab = tab.dataset.hrTab;
        renderHr();
        return;
      }
      var a = e.target.closest('[data-act]');
      if (!a || active !== 'HR 中心') return;
      var act = a.dataset.act;
      if (
        [
          'hr-new',
          'hr-edit',
          'hr-delete',
          'hr-close',
          'hr-refresh',
          'hr-export',
          'hr-salary-toggle',
        ].indexOf(act) < 0
      )
        return;
      e.preventDefault();
      e.stopImmediatePropagation();
      try {
        if (act === 'hr-new') openHrModal(null);
        else if (act === 'hr-edit')
          openHrModal(
            hrRows.find(function (x) {
              return x.id === a.dataset.id;
            }),
          );
        else if (act === 'hr-delete') await removeHrEntity(a.dataset.id);
        else if (act === 'hr-close') closeHrModal();
        else if (act === 'hr-refresh') await loadHrSection();
        else if (act === 'hr-export') exportHr();
        else if (act === 'hr-salary-toggle') {
          showSalary = !showSalary;
          await loadHrSection();
        }
      } catch (err) {
        say(err.message);
      }
    },
    true,
  );
  document.addEventListener('input', function (e) {
    if (active === 'HR 中心' && e.target.id === 'hrSearch') filterHr();
  });
  document.addEventListener('change', function (e) {
    if (active === 'HR 中心' && e.target.id === 'hrStatusFilter') filterHr();
  });
  var style = document.createElement('style');
  style.textContent =
    '.hr-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid var(--line)}.hr-toolbar .filters{display:flex;gap:8px}.hr-toolbar input,.hr-toolbar select{height:34px;border:1px solid var(--line);border-radius:8px;background:#fff;padding:0 10px;color:#536078}.hr-toolbar input{width:280px}.hr-modal{width:min(940px,100%)}.hr-modal .form-grid{grid-template-columns:repeat(3,1fr)}.table td small{display:block;color:var(--m);font-size:9px;margin-top:4px}.group small{display:block;margin-top:6px;line-height:1.5}.group{cursor:default}@media(max-width:900px){.hr-modal .form-grid{grid-template-columns:1fr 1fr}}@media(max-width:700px){.hr-toolbar{align-items:stretch;flex-direction:column}.hr-toolbar .filters{flex-direction:column}.hr-toolbar input{width:100%}.hr-modal .form-grid{grid-template-columns:1fr}}';
  document.head.appendChild(style);
  if (active === 'HR 中心') renderHr();
})();
