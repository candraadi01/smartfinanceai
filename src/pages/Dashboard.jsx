import { useEffect, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowDownRight, ArrowUpRight, PiggyBank, Wallet } from 'lucide-react';
import StatCard from '../components/StatCard';
import { DashboardSkeleton } from '../components/Skeleton';
import { formatIDR, getTransactions, getUser } from '../services/storage';
import { getCategoryData, getRecommendations, getSummary, getTrendData } from '../services/analytics';

export default function Dashboard(){
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const user=getUser();const tx=getTransactions();const s=getSummary(tx,user);const cats=getCategoryData(tx);const trend=getTrendData(tx);const rec=getRecommendations(tx,user)[0];
  if (loading) return <DashboardSkeleton />;
  return <section className="page page-enter"><div className="page-title"><div><p>Halo, {user.name?.split(' ')[0]} 👋</p><h1>Dashboard Keuangan</h1></div><button className="btn pulse-click">Export Report</button></div><div className="stats"><StatCard label="Saldo" value={formatIDR(s.balance)} icon={Wallet} caption="Sisa bulan ini"/><StatCard label="Income" value={formatIDR(s.income)} icon={ArrowUpRight} tone="blue"/><StatCard label="Expense" value={formatIDR(s.expense)} icon={ArrowDownRight} tone="orange"/><StatCard label="Saving Goal" value={`${s.savingProgress}%`} icon={PiggyBank} tone="purple" caption={formatIDR(user.savingTarget)}/></div><div className="dashboard-grid"><div className="panel large interactive-card"><div className="panel-head"><h2>Cashflow Trend</h2><span>Realtime mock data</span></div><ResponsiveContainer width="100%" height={280}><AreaChart data={trend}><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.35}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis hide/><Tooltip formatter={(v)=>formatIDR(v)}/><Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#g1)"/><Area type="monotone" dataKey="expense" stroke="#f97316" fill="#fed7aa"/></AreaChart></ResponsiveContainer></div><div className="panel interactive-card"><div className="panel-head"><h2>Expense Category</h2><span>Top kategori</span></div><ResponsiveContainer width="100%" height={280}><BarChart data={cats}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis hide/><Tooltip formatter={(v)=>formatIDR(v)}/><Bar dataKey="value" fill="#16a34a" radius={[12,12,0,0]}/></BarChart></ResponsiveContainer></div><div className="panel insight interactive-card"><span className="badge">AI Preview</span><h2>{rec.title}</h2><p>{rec.text}</p></div><div className="panel progress-panel interactive-card"><h2>Progress Tabungan</h2><div className="progress"><span style={{width:`${s.savingProgress}%`}}></span></div><p>{s.savingProgress}% dari target {formatIDR(user.savingTarget)}</p></div></div></section>}
