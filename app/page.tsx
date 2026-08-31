'use client';

import { useState } from 'react';

import {
  Activity,
  Bell,
  Bolt,
  Boxes,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileClock,
  FolderKanban,
  HeartHandshake,
  Home,
  MoreHorizontal,
  PackageCheck,
  Settings,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const dynamic = 'force-static';

const navigation = [
  { label: '我的工作台', icon: Home, count: 8 },
  { label: '审批看板', icon: ClipboardCheck, count: 0 },
  { label: '文化看板', icon: HeartHandshake, count: 3 },
  { label: '项目看板', icon: FolderKanban, count: 2 },
  { label: '效能看板', icon: Bolt, count: 4 },
  { label: 'HR 中心', icon: Users },
  { label: '营销中心', icon: PackageCheck, count: 3 },
  { label: '供应链中心', icon: Boxes, count: 2 },
  { label: '系统设置', icon: Settings },
];

const workItems = [
  { title: '确认 M3 版本的测试策略', meta: '研发机器人 · CP0 人工确认', due: '今天 15:00', tone: 'blue' },
  { title: '审批供应商季度评审表', meta: '供应链中心 · 采购审批', due: '今天 17:30', tone: 'amber' },
  { title: '补充 8 月考勤异常说明', meta: '效能看板 · 钉钉数据同步', due: '明天 10:00', tone: 'rose' },
];

const projects = [
  { name: 'DTEN 研发机器人', owner: '陈锦', progress: 68, phase: '验证中', color: '#3167e8' },
  { name: 'M3 会议平板', owner: '林哲', progress: 46, phase: '研发中', color: '#22a06b' },
  { name: '海外渠道数字化', owner: '王敏', progress: 82, phase: '量产准备', color: '#b7791f' },
];

const moduleDescriptions: Record<string, { eyebrow: string; title: string; detail: string; primary: string; metrics: { label: string; value: string; note: string }[] }> = {
  '审批看板': { eyebrow: '审批中心', title: '所有流程，在一个看板里推进', detail: '按职能归类，优先呈现即将超时与需要你决策的事项。', primary: '发起审批', metrics: [{ label: '待我审批', value: '12', note: '3 项今天到期' }, { label: '审批通过率', value: '91%', note: '较上周 +4%' }, { label: '平均耗时', value: '1.6 天', note: '目标 < 2 天' }] },
  '文化看板': { eyebrow: '组织共识', title: '让文化、制度和真实声音被看见', detail: '公司政策、制度解读、员工心声与跨团队讨论在这里持续沉淀。', primary: '发布讨论', metrics: [{ label: '本周新制度', value: '4', note: '等待阅读确认' }, { label: '员工心声', value: '18', note: '6 条待回应' }, { label: '参与率', value: '78%', note: '较上月 +9%' }] },
  '项目看板': { eyebrow: '全生命周期项目管理', title: '围绕里程碑，拉齐每一个需求、Bug 与计划', detail: '项目以进度条展示，任务责任人和时间点同步到每个人的工作台。', primary: '新建项目', metrics: [{ label: '活跃项目', value: '9', note: '2 个存在风险' }, { label: '本周里程碑', value: '6', note: '4 项按期' }, { label: '待关闭 Bug', value: '23', note: '5 项高优' }] },
  '效能看板': { eyebrow: '研发效能与考勤', title: '从出勤到 Bug 闭环，看到团队真实效能', detail: '钉钉考勤、Redmine 指标和研发机器人 Run 记录将按权限自动汇总。', primary: '同步数据', metrics: [{ label: '本月出勤率', value: '94.2%', note: '钉钉同步成功' }, { label: 'Bug 关闭率', value: '87%', note: '高优 5 项未关闭' }, { label: 'Run 成功率', value: '92%', note: '研发机器人只读 Redmine' }] },
  'HR 中心': { eyebrow: '人力与行政', title: '人员、薪酬与资产，一处可管', detail: '员工信息库、薪酬资料、固定资产和低值易耗品台账将分级授权管理。', primary: '新增员工', metrics: [{ label: '在职员工', value: '286', note: '本月新增 7 人' }, { label: '待归还资产', value: '8', note: '2 项超期' }, { label: '薪酬核算', value: '已完成', note: '8 月待复核' }] },
  '营销中心': { eyebrow: '客户与业绩', title: '用客户进展驱动增长', detail: '客户档案、销售漏斗、合同与回款节点连接到项目和供应链协同。', primary: '新建客户', metrics: [{ label: '本月签约额', value: '¥ 680 万', note: '目标完成 78%' }, { label: '重点商机', value: '16', note: '4 项本周推进' }, { label: '回款健康度', value: 'A', note: '逾期 2 笔' }] },
  '供应链中心': { eyebrow: '采购、仓储与物料', title: '让供应保障与生产计划保持同频', detail: '供应商绩效、库存预警、物料台账和生产计划的关键节点会集中呈现。', primary: '新增物料', metrics: [{ label: '库存预警', value: '6', note: '3 项需补货' }, { label: '准时交付率', value: '96%', note: '供应商月度评分' }, { label: '生产计划', value: '18', note: '1 项待排产' }] },
  '系统设置': { eyebrow: '组织与权限', title: '为每个岗位配置恰当的访问范围', detail: '组织架构、角色权限、集成连接和数据字典将在这里统一维护。', primary: '管理角色', metrics: [{ label: '组织部门', value: '14', note: '本月更新 2 次' }, { label: '角色权限', value: '28', note: '待审计 3 项' }, { label: '集成连接', value: '4', note: '钉钉、Redmine 已接入' }] },
};

function ModulePanel({ active }: { active: string }) {
  const data = moduleDescriptions[active];
  const isProject = active === '项目看板';
  const isPerformance = active === '效能看板';
  return (
    <div className="mx-auto max-w-[1440px] px-9 py-8">
      <div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-medium text-[#2164e8]">{data.eyebrow}</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">{data.title}</h2><p className="mt-2 text-sm text-[#7b89a2]">{data.detail}</p></div><Button className="h-10 rounded-xl bg-[#2164e8] px-4">{data.primary} <ChevronRight /></Button></div>
      <div className="grid gap-5 md:grid-cols-3">{data.metrics.map((metric) => <section key={metric.label} className="rounded-2xl border border-[#e5ebf5] bg-white p-5 shadow-[0_10px_35px_rgba(41,72,152,.05)]"><p className="text-sm text-[#7b89a2]">{metric.label}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{metric.value}</p><p className="mt-2 text-xs text-[#8a97ae]">{metric.note}</p></section>)}</div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.9fr]">
        <section className="rounded-2xl border border-[#e5ebf5] bg-white p-5 shadow-[0_10px_35px_rgba(41,72,152,.05)]">
          <div className="flex items-center justify-between"><div><h3 className="font-semibold">{isProject ? '项目里程碑与责任人' : isPerformance ? '本周效能趋势' : '需要优先处理的事项'}</h3><p className="mt-1 text-sm text-[#8a97ae]">{isProject ? '需求、Bug 与任务按阶段聚合' : isPerformance ? '数据会在授权后由外部系统自动同步' : '建议先处理临近到期的事项'}</p></div><Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button></div>
          <div className="mt-6 space-y-5">{isProject ? projects.map((project) => <div key={project.name} className="grid grid-cols-[minmax(170px,1fr)_minmax(200px,2fr)_110px] items-center gap-5"><div><p className="font-medium">{project.name}</p><p className="mt-1 text-xs text-[#8a97ae]">负责人：{project.owner} · 需求 12 · Bug 5</p></div><Progress value={project.progress} className="[&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-indicator]]:bg-[#2164e8]" /><div className="text-right"><p className="font-semibold">{project.progress}%</p><p className="text-xs text-[#8a97ae]">{project.phase}</p></div></div>) : ['确认本月数据口径与责任人', '处理即将超时的协同事项', '查看外部平台最新同步结果'].map((item, index) => <div key={item} className="flex items-center gap-4"><span className={`grid h-8 w-8 place-items-center rounded-lg ${index === 0 ? 'bg-[#eaf1ff] text-[#2164e8]' : index === 1 ? 'bg-[#fff5df] text-[#cf8a12]' : 'bg-[#eef8f3] text-[#15915b]'}`}>{index + 1}</span><div className="flex-1"><p className="text-sm font-medium">{item}</p><p className="mt-1 text-xs text-[#8a97ae]">责任人已明确 · 截止时间已同步至工作台</p></div><Button variant="outline" size="sm">查看</Button></div>)}</div>
        </section>
        <aside className="rounded-2xl bg-[#1d3f8f] p-5 text-white shadow-[0_14px_35px_rgba(29,63,143,.2)]"><div className="flex items-center justify-between"><span className="rounded-lg bg-white/15 p-2"><Activity className="h-5 w-5" /></span><Badge className="border-0 bg-[#6ee7b7] text-[#075a3d]">运行正常</Badge></div><h3 className="mt-6 text-xl font-semibold">数据连接状态</h3><p className="mt-2 text-sm leading-6 text-[#c9d6ff]">钉钉、Redmine、历史导入数据将通过统一连接器接入；敏感数据按角色与组织范围授权。</p><div className="mt-6 space-y-3">{['钉钉考勤', 'Redmine Dashboard', '历史数据导入'].map((item, index) => <div key={item} className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5"><span className="text-sm">{item}</span><span className={`text-xs ${index === 2 ? 'text-[#c9d6ff]' : 'text-[#8ef0c4]'}`}>{index === 2 ? '待配置' : '已连接'}</span></div>)}</div></aside>
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState('我的工作台');
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#14213d]">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-[248px] flex-col border-r border-[#e7ecf5] bg-white px-4 py-6">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#2164e8] text-lg font-black text-white shadow-[0_8px_18px_rgba(33,100,232,.25)]">D</div>
          <div><p className="font-semibold tracking-tight text-[#152447]">DTEN ERP</p><p className="text-xs text-[#9aa7bf]">一体化工作台</p></div>
        </div>
        <nav aria-label="主导航" className="space-y-1.5">
          {navigation.map(({ label, icon: Icon, count }) => (
            <button key={label} aria-current={active === label ? 'page' : undefined} onClick={() => setActive(label)} className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm transition ${active === label ? 'bg-[#eaf1ff] font-semibold text-[#2164e8]' : 'text-[#52617b] hover:bg-[#f4f7fc]'}`} type="button">
              <Icon className="h-[18px] w-[18px]" strokeWidth={active === label ? 2.4 : 1.9} /><span className="flex-1 text-left">{label}</span>
              {count !== undefined && <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold ${count ? 'bg-[#f04d5b] text-white' : 'bg-[#d6dbe5] text-white'}`}>{count}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#f3f7ff] p-4"><p className="text-xs font-semibold text-[#2164e8]">本周关键节点</p><p className="mt-2 text-sm font-medium leading-5">研发机器人 CP0 确认将于今天 15:00 到期。</p><Button variant="link" size="sm" className="mt-2 h-auto p-0 text-[#2164e8]">立即处理 <ChevronRight /></Button></div>
      </aside>
      <section className="ml-[248px] min-h-screen">
        <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-[#e7ecf5] bg-white/95 px-9 backdrop-blur">
          <div><p className="text-sm text-[#8a97ae]">周一，8 月 31 日</p><h1 className="mt-0.5 text-xl font-semibold tracking-tight">早上好，陈锦</h1></div>
          <div className="flex items-center gap-4"><button aria-label="通知" className="relative grid h-10 w-10 place-items-center rounded-xl bg-[#f5f7fb] text-[#65738d]" type="button"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#f04d5b]" /></button><div className="flex items-center gap-2 border-l border-[#e7ecf5] pl-4"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#ddecff] text-sm font-bold text-[#2164e8]">陈</div><span className="text-sm font-medium">研发中心</span></div></div>
        </header>
        {active === '我的工作台' ? (
        <div className="mx-auto max-w-[1440px] px-9 py-8">
          <div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-medium text-[#2164e8]">我的工作台</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">今天，需要你推进的事</h2></div><Button className="h-10 rounded-xl bg-[#2164e8] px-4 shadow-[0_8px_18px_rgba(33,100,232,.18)]"><CheckCircle2 /> 一键确认已读</Button></div>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-5">
              <section className="rounded-2xl border border-[#e5ebf5] bg-white p-5 shadow-[0_10px_35px_rgba(41,72,152,.05)]"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-semibold">待办事宜 <span className="ml-1 text-[#f04d5b]">8</span></h3><p className="mt-1 text-sm text-[#8a97ae]">按到期时间排序，确认后将同步更新责任人视图</p></div><Button variant="ghost" size="sm" className="text-[#2164e8]">查看全部 <ChevronRight /></Button></div><div className="divide-y divide-[#edf1f7]">{workItems.map((item) => <div key={item.title} className="flex items-center gap-4 py-4 first:pt-1 last:pb-1"><div className={`h-10 w-1 rounded-full ${item.tone === 'blue' ? 'bg-[#2164e8]' : item.tone === 'amber' ? 'bg-[#efad35]' : 'bg-[#f04d5b]'}`} /><div className="min-w-0 flex-1"><p className="font-medium">{item.title}</p><p className="mt-1 text-sm text-[#8a97ae]">{item.meta}</p></div><div className="text-right"><p className={`text-sm font-semibold ${item.tone === 'rose' ? 'text-[#e64a59]' : 'text-[#53617b]'}`}>{item.due}</p><Button variant="outline" size="sm" className="mt-2 rounded-lg">处理</Button></div></div>)}</div></section>
              <section className="rounded-2xl border border-[#e5ebf5] bg-white p-5 shadow-[0_10px_35px_rgba(41,72,152,.05)]"><div className="mb-5 flex items-center justify-between"><div><h3 className="font-semibold">项目进度</h3><p className="mt-1 text-sm text-[#8a97ae]">从需求到量产，全生命周期进度一目了然</p></div><Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button></div><div className="space-y-5">{projects.map((project) => <div key={project.name} className="grid grid-cols-[minmax(160px,1.1fr)_minmax(190px,2fr)_100px] items-center gap-5"><div><p className="font-medium">{project.name}</p><p className="mt-1 text-xs text-[#8a97ae]">负责人：{project.owner}</p></div><Progress value={project.progress} className="gap-1.5 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-indicator]]:bg-[var(--project-color)]" style={{ '--project-color': project.color } as React.CSSProperties}><span className="text-xs text-[#8a97ae]">{project.phase}</span></Progress><div className="text-right"><span className="text-lg font-semibold">{project.progress}%</span><p className="text-xs text-[#8a97ae]">整体完成</p></div></div>)}</div></section>
            </div>
            <aside className="space-y-5">
              <section className="rounded-2xl bg-[#1d3f8f] p-5 text-white shadow-[0_14px_35px_rgba(29,63,143,.2)]"><div className="flex items-center justify-between"><span className="rounded-lg bg-white/15 p-2"><Activity className="h-5 w-5" /></span><Badge className="border-0 bg-[#6ee7b7] text-[#075a3d]">数据已同步</Badge></div><p className="mt-6 text-sm text-[#c9d6ff]">研发效能 · 本周</p><p className="mt-1 text-4xl font-semibold">86.4<span className="ml-1 text-lg">分</span></p><div className="mt-6 grid grid-cols-3 divide-x divide-white/15 text-center"><div><p className="text-lg font-semibold">94%</p><p className="mt-1 text-xs text-[#c9d6ff]">出勤率</p></div><div><p className="text-lg font-semibold">12</p><p className="mt-1 text-xs text-[#c9d6ff]">已关闭 Bug</p></div><div><p className="text-lg font-semibold">7</p><p className="mt-1 text-xs text-[#c9d6ff]">进行中 Run</p></div></div></section>
              <section className="rounded-2xl border border-[#e5ebf5] bg-white p-5 shadow-[0_10px_35px_rgba(41,72,152,.05)]"><div className="flex items-center justify-between"><h3 className="font-semibold">研发机器人</h3><Badge variant="secondary" className="bg-[#eaf1ff] text-[#2164e8]">Redmine 只读</Badge></div><div className="mt-5 space-y-4"><div className="flex gap-3"><div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2164e8]"/><div><p className="text-sm font-medium">DTEN-284 已进入测试验证</p><p className="mt-1 text-xs text-[#8a97ae]">等待 CP0 策略确认 · 负责人：陈锦</p></div></div><div className="flex gap-3"><div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#efad35]"/><div><p className="text-sm font-medium">模拟平台正在运行 3 个任务</p><p className="mt-1 text-xs text-[#8a97ae]">轮询状态正常 · 预计 42 分钟完成</p></div></div></div><Button variant="outline" className="mt-5 w-full rounded-xl"><FileClock /> 查看 Run 记录</Button></section>
            </aside>
          </div>
        </div>
        ) : (
          <ModulePanel active={active} />
        )}
      </section>
    </main>
  );
}
