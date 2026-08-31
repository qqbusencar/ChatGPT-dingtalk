const modules = {
  '审批看板': ['所有流程，在一个看板里推进', '按职能归类，优先呈现即将超时与需要你决策的事项。', [['待我审批', '12', '3 项今天到期'], ['审批通过率', '91%', '较上周 +4%'], ['平均耗时', '1.6 天', '目标 < 2 天']]],
  '文化看板': ['让文化、制度和真实声音被看见', '公司政策、制度解读、员工心声与跨团队讨论在这里持续沉淀。', [['本周新制度', '4', '等待阅读确认'], ['员工心声', '18', '6 条待回应'], ['参与率', '78%', '较上月 +9%']]],
  '项目看板': ['围绕里程碑，拉齐每一个需求、Bug 与计划', '项目以进度条展示，任务责任人和时间点同步到每个人的工作台。', [['活跃项目', '9', '2 个存在风险'], ['本周里程碑', '6', '4 项按期'], ['待关闭 Bug', '23', '5 项高优']]],
  '效能看板': ['从出勤到 Bug 闭环，看到团队真实效能', '钉钉考勤、Redmine 指标和研发机器人 Run 记录将按权限自动汇总。', [['本月出勤率', '94.2%', '钉钉同步成功'], ['Bug 关闭率', '87%', '高优 5 项未关闭'], ['Run 成功率', '92%', 'Redmine 只读']]],
  'HR 中心': ['人员、薪酬与资产，一处可管', '员工信息库、薪酬资料、固定资产和低值易耗品台账将分级授权管理。', [['在职员工', '286', '本月新增 7 人'], ['待归还资产', '8', '2 项超期'], ['薪酬核算', '已完成', '8 月待复核']]],
  '营销中心': ['用客户进展驱动增长', '客户档案、销售漏斗、合同与回款节点连接到项目和供应链协同。', [['本月签约额', '¥680万', '目标完成 78%'], ['重点商机', '16', '4 项本周推进'], ['回款健康度', 'A', '逾期 2 笔']]],
  '供应链中心': ['让供应保障与生产计划保持同频', '供应商绩效、库存预警、物料台账和生产计划的关键节点会集中呈现。', [['库存预警', '6', '3 项需补货'], ['准时交付率', '96%', '供应商月度评分'], ['生产计划', '18', '1 项待排产']]],
  '系统设置': ['为每个岗位配置恰当的访问范围', '组织架构、角色权限、集成连接和数据字典将在这里统一维护。', [['组织部门', '14', '本月更新 2 次'], ['角色权限', '28', '待审计 3 项'], ['集成连接', '4', '钉钉、Redmine 已接入']]],
};

const nav = [
  ['⌂', '我的工作台', '8'], ['✓', '审批看板', '0'], ['◌', '文化看板', '3'],
  ['▥', '项目看板', '2'], ['ϟ', '效能看板', '4'], ['♟', 'HR 中心', ''],
  ['◆', '营销中心', '3'], ['▣', '供应链中心', '2'], ['⚙', '系统设置', ''],
];

const projects = [
  ['DTEN 研发机器人', '陈锦', 68, '验证中'],
  ['M3 会议平板', '林哲', 46, '研发中'],
  ['海外渠道数字化', '王敏', 82, '量产准备'],
];

const projectRows = () => projects.map(([name, owner, progress, phase]) => `
  <div class="project-row">
    <div><b>${name}</b><small>负责人：${owner} · 需求 12 · Bug 5</small></div>
    <div class="bar"><i style="width:${progress}%"></i></div>
    <div class="project-end"><b>${progress}%</b><small>${phase}</small></div>
  </div>`).join('');

const home = `
  <section class="heading"><div><em>我的工作台</em><h1>今天，需要你推进的事</h1></div><button class="primary">✓ 一键确认已读</button></section>
  <div class="layout">
    <div class="stack">
      <section class="card"><header><div><h3>待办事宜 <strong>8</strong></h3><p>按到期时间排序，确认后将同步更新责任人视图</p></div><button class="link">查看全部 ›</button></header>
        <div class="todo"><i class="blue"></i><div><b>确认 M3 版本的测试策略</b><small>研发机器人 · CP0 人工确认</small></div><time>今天 15:00</time><button>处理</button></div>
        <div class="todo"><i class="amber"></i><div><b>审批供应商季度评审表</b><small>供应链中心 · 采购审批</small></div><time>今天 17:30</time><button>处理</button></div>
        <div class="todo"><i class="rose"></i><div><b>补充 8 月考勤异常说明</b><small>效能看板 · 钉钉数据同步</small></div><time>明天 10:00</time><button>处理</button></div>
      </section>
      <section class="card"><header><div><h3>项目进度</h3><p>从需求到量产，全生命周期进度一目了然</p></div><button class="dots">•••</button></header>${projectRows()}</section>
    </div>
    <aside class="stack">
      <section class="score"><div class="score-top"><span>⌁</span><mark>数据已同步</mark></div><p>研发效能 · 本周</p><h2>86.4<small> 分</small></h2><div class="score-grid"><div><b>94%</b><small>出勤率</small></div><div><b>12</b><small>已关闭 Bug</small></div><div><b>7</b><small>进行中 Run</small></div></div></section>
      <section class="card bot"><header><h3>研发机器人</h3><mark>Redmine 只读</mark></header><div class="event"><i class="blue-dot"></i><div><b>DTEN-284 已进入测试验证</b><small>等待 CP0 策略确认 · 负责人：陈锦</small></div></div><div class="event"><i class="amber-dot"></i><div><b>模拟平台正在运行 3 个任务</b><small>轮询状态正常 · 预计 42 分钟完成</small></div></div><button class="wide">◷ 查看 Run 记录</button></section>
    </aside>
  </div>`;

function modulePage(name) {
  const [title, detail, metrics] = modules[name];
  return `<section class="heading"><div><em>${name}</em><h1>${title}</h1><p>${detail}</p></div><button class="primary">进入管理 ›</button></section>
  <div class="metrics">${metrics.map(([label, value, note]) => `<section class="card metric"><p>${label}</p><h2>${value}</h2><small>${note}</small></section>`).join('')}</div>
  <div class="layout section-gap"><section class="card"><header><div><h3>${name === '项目看板' ? '项目里程碑与责任人' : '需要优先处理的事项'}</h3><p>责任人和截止时间已同步到个人工作台</p></div><button class="dots">•••</button></header>${name === '项目看板' ? projectRows() : ['确认本月数据口径与责任人', '处理即将超时的协同事项', '查看外部平台最新同步结果'].map((x, i) => `<div class="action"><span>${i + 1}</span><div><b>${x}</b><small>责任人已明确 · 截止时间已同步</small></div><button>查看</button></div>`).join('')}</section>
  <aside class="score connect"><div class="score-top"><span>⌁</span><mark>运行正常</mark></div><h3>数据连接状态</h3><p>钉钉、Redmine、历史导入数据将通过统一连接器接入；敏感数据按角色授权。</p>${['钉钉考勤', 'Redmine Dashboard', '历史数据导入'].map((x, i) => `<div class="connect-row"><span>${x}</span><b>${i === 2 ? '待配置' : '已连接'}</b></div>`).join('')}</aside></div>`;
}

const html = String.raw`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DTEN ERP｜一体化工作台</title><meta name="description" content="DTEN 组织协同、项目管理与研发效能的一体化工作台。"><style>
*{box-sizing:border-box}body{margin:0;background:#f5f7fb;color:#14213d;font-family:Inter,"Microsoft YaHei",Arial,sans-serif}.sidebar{position:fixed;inset:0 auto 0 0;width:248px;background:#fff;border-right:1px solid #e7ecf5;padding:24px 16px;display:flex;flex-direction:column;z-index:3}.brand{display:flex;align-items:center;gap:12px;padding:0 8px;margin-bottom:30px}.logo{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#2164e8;color:#fff;font-size:18px;font-weight:900;box-shadow:0 8px 18px #2164e83f}.brand b{display:block}.brand small,.sidebar-note small{display:block;color:#9aa7bf;margin-top:4px}.nav{display:grid;gap:6px}.nav button{width:100%;height:44px;border:0;border-radius:12px;background:transparent;color:#52617b;display:flex;align-items:center;gap:12px;padding:0 12px;font:500 14px inherit;cursor:pointer}.nav button:hover{background:#f4f7fc}.nav button.active{background:#eaf1ff;color:#2164e8;font-weight:700}.nav .icon{font-size:18px;width:18px}.nav .label{flex:1;text-align:left}.count{display:grid;place-items:center;min-width:20px;height:20px;padding:0 5px;border-radius:20px;background:#f04d5b;color:white;font-size:11px;font-weight:700}.count.zero{background:#d6dbe5}.sidebar-note{margin-top:auto;background:#f3f7ff;border-radius:16px;padding:16px}.sidebar-note b{color:#2164e8;font-size:12px}.sidebar-note p{font-size:14px;line-height:1.5}.shell{margin-left:248px;min-height:100vh}.topbar{height:76px;position:sticky;top:0;z-index:2;background:#ffffffef;backdrop-filter:blur(10px);border-bottom:1px solid #e7ecf5;padding:0 36px;display:flex;align-items:center;justify-content:space-between}.topbar p{margin:0;color:#8a97ae;font-size:13px}.topbar h2{margin:4px 0 0;font-size:20px}.user{display:flex;align-items:center;gap:10px;border-left:1px solid #e7ecf5;padding-left:16px;font-size:14px}.avatar{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#ddecff;color:#2164e8;font-weight:800}.content{max-width:1440px;margin:auto;padding:32px 36px}.heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:28px}.heading em{font-style:normal;color:#2164e8;font-size:14px;font-weight:600}.heading h1{font-size:30px;margin:6px 0 0;letter-spacing:-.5px}.heading p{color:#7b89a2;font-size:14px;margin:9px 0 0}.primary{height:40px;border:0;border-radius:12px;background:#2164e8;color:white;padding:0 16px;font-weight:600;box-shadow:0 8px 18px #2164e82e;cursor:pointer}.layout{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:20px}.stack{display:grid;align-content:start;gap:20px}.card{background:#fff;border:1px solid #e5ebf5;border-radius:16px;padding:20px;box-shadow:0 10px 35px #2948980d}.card header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:16px}.card h3{margin:0;font-size:16px}.card header p,.metric p{margin:5px 0 0;color:#8a97ae;font-size:13px}.card strong{color:#f04d5b}.card button,.action button{border:1px solid #e5ebf5;background:#fff;color:#52617b;border-radius:8px;padding:7px 10px;cursor:pointer}.card button:hover{background:#f4f7fc}.link,.dots{border:0!important;color:#2164e8!important}.todo{display:grid;grid-template-columns:4px minmax(0,1fr) 95px auto;align-items:center;gap:16px;padding:14px 0;border-top:1px solid #edf1f7}.todo:first-of-type{border-top:0}.todo>i{height:40px;border-radius:8px}.blue{background:#2164e8}.amber{background:#efad35}.rose{background:#f04d5b}.todo b,.project-row b,.event b,.action b{display:block;font-size:14px}.todo small,.project-row small,.event small,.action small{display:block;color:#8a97ae;font-size:12px;margin-top:5px}.todo time{font-size:13px;font-weight:600}.project-row{display:grid;grid-template-columns:minmax(170px,1.1fr) minmax(180px,2fr) 80px;gap:20px;align-items:center;margin-top:18px}.bar{height:8px;border-radius:10px;background:#edf1f7;overflow:hidden}.bar i{display:block;height:100%;background:#2164e8;border-radius:10px}.project-end{text-align:right}.score{background:#1d3f8f;color:white;border-radius:16px;padding:20px;box-shadow:0 14px 35px #1d3f8f33}.score-top{display:flex;align-items:center;justify-content:space-between}.score-top>span{background:#ffffff22;padding:8px;border-radius:9px}.score mark,.bot mark{border-radius:20px;background:#6ee7b7;color:#075a3d;padding:5px 9px;font-size:11px;font-weight:700}.score>p{color:#c9d6ff;font-size:13px;margin:22px 0 4px}.score h2{font-size:38px;margin:0}.score h2 small{font-size:16px}.score-grid{display:grid;grid-template-columns:repeat(3,1fr);margin-top:24px}.score-grid div{text-align:center;border-left:1px solid #ffffff22}.score-grid div:first-child{border-left:0}.score-grid b{display:block}.score-grid small{display:block;color:#c9d6ff;margin-top:6px}.event{display:flex;gap:12px;margin:18px 0}.event>i{width:10px;height:10px;border-radius:50%;margin-top:4px}.blue-dot{background:#2164e8}.amber-dot{background:#efad35}.wide{width:100%;margin-top:4px}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.metric h2{font-size:30px;margin:14px 0 8px}.metric small{color:#8a97ae}.section-gap{margin-top:20px}.action{display:flex;align-items:center;gap:14px;padding:13px 0}.action>span{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:#eaf1ff;color:#2164e8;font-weight:700}.action>div{flex:1}.connect h3{font-size:20px;margin:24px 0 8px}.connect>p{margin:0 0 20px;color:#c9d6ff;line-height:1.6}.connect-row{display:flex;justify-content:space-between;background:#ffffff16;padding:12px;margin-top:10px;border-radius:10px;font-size:13px}.connect-row b{color:#8ef0c4}.loading{display:grid;place-items:center;min-height:500px;color:#8a97ae}
@media(max-width:980px){.sidebar{width:76px;padding:20px 10px}.brand>div:last-child,.nav .label,.count,.sidebar-note{display:none}.brand{padding:0;justify-content:center}.nav button{justify-content:center}.shell{margin-left:76px}.layout{grid-template-columns:1fr}.metrics{grid-template-columns:1fr 1fr}.content{padding:24px}.topbar{padding:0 24px}}
@media(max-width:640px){.sidebar{position:static;width:100%;height:auto;padding:12px}.brand{justify-content:flex-start;margin-bottom:12px}.brand>div:last-child{display:block}.nav{display:flex;overflow:auto}.nav button{flex:0 0 48px;padding:0}.shell{margin-left:0}.topbar{display:none}.content{padding:20px 14px}.heading{align-items:flex-start}.heading h1{font-size:24px}.primary{display:none}.metrics{grid-template-columns:1fr}.todo{grid-template-columns:4px 1fr auto}.todo time{display:none}.project-row{grid-template-columns:1fr 80px}.bar{grid-column:1/-1;grid-row:2}.layout{grid-template-columns:1fr}}
</style></head><body>
<aside class="sidebar"><div class="brand"><div class="logo">D</div><div><b>DTEN ERP</b><small>一体化工作台</small></div></div><nav class="nav" id="nav"></nav><div class="sidebar-note"><b>本周关键节点</b><p>研发机器人 CP0 确认将于今天 15:00 到期。</p><small>立即处理 ›</small></div></aside>
<main class="shell"><header class="topbar"><div><p>周一，8 月 31 日</p><h2>早上好，陈锦</h2></div><div class="user"><span>通知</span><span class="avatar">陈</span><b>研发中心</b></div></header><div class="content" id="app">${home}</div></main>
<script>
const nav=${JSON.stringify(nav)}, modules=${JSON.stringify(modules)}, projects=${JSON.stringify(projects)}, home=${JSON.stringify(home)};
const navEl=document.getElementById('nav'),app=document.getElementById('app');
function renderNav(active){navEl.innerHTML=nav.map(([icon,label,count])=>'<button data-name="'+label+'" class="'+(label===active?'active':'')+'"><span class="icon">'+icon+'</span><span class="label">'+label+'</span>'+(count?'<span class="count '+(count==='0'?'zero':'')+'">'+count+'</span>':'')+'</button>').join('');}
function projectRows(){return ${projectRows.toString()}()}
function modulePage(name){const [title,detail,metrics]=modules[name];return '<section class="heading"><div><em>'+name+'</em><h1>'+title+'</h1><p>'+detail+'</p></div><button class="primary">进入管理 ›</button></section><div class="metrics">'+metrics.map(([l,v,n])=>'<section class="card metric"><p>'+l+'</p><h2>'+v+'</h2><small>'+n+'</small></section>').join('')+'</div><div class="layout section-gap"><section class="card"><header><div><h3>'+(name==='项目看板'?'项目里程碑与责任人':'需要优先处理的事项')+'</h3><p>责任人和截止时间已同步到个人工作台</p></div><button class="dots">•••</button></header>'+(name==='项目看板'?projectRows():['确认本月数据口径与责任人','处理即将超时的协同事项','查看外部平台最新同步结果'].map((x,i)=>'<div class="action"><span>'+(i+1)+'</span><div><b>'+x+'</b><small>责任人已明确 · 截止时间已同步</small></div><button>查看</button></div>').join(''))+'</section><aside class="score connect"><div class="score-top"><span>⌁</span><mark>运行正常</mark></div><h3>数据连接状态</h3><p>钉钉、Redmine、历史导入数据将通过统一连接器接入；敏感数据按角色授权。</p>'+['钉钉考勤','Redmine Dashboard','历史数据导入'].map((x,i)=>'<div class="connect-row"><span>'+x+'</span><b>'+(i===2?'待配置':'已连接')+'</b></div>').join('')+'</aside></div>'}
navEl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const name=b.dataset.name;renderNav(name);app.innerHTML=name==='我的工作台'?home:modulePage(name);window.scrollTo(0,0)});renderNav('我的工作台');
</script></body></html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' } });
    }
    if (url.pathname === '/favicon.ico') return new Response(null, { status: 204 });
    return new Response('Not found', { status: 404 });
  },
};
