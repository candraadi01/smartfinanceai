import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Sparkles, User, WalletCards } from 'lucide-react';
const links=[['/dashboard',LayoutDashboard,'Dashboard'],['/transactions',ReceiptText,'Transactions'],['/recommendations',Sparkles,'AI Insight'],['/profile',User,'Profile']];
export default function Sidebar(){return <aside className="sidebar"><div className="brand"><div className="brand-mark"><WalletCards size={24}/></div><div><b>SmartFinance</b><span>AI money coach</span></div></div><nav>{links.map(([to,Icon,label])=><NavLink key={to} to={to} className={({isActive})=>`nav-link ${isActive?'active':''}`}><Icon size={19}/><span>{label}</span></NavLink>)}</nav><div className="side-card"><p>Capstone Mode</p><b>Frontend siap disambung REST API</b></div></aside>}
