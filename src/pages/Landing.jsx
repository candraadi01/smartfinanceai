import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  CheckCircle2,
  CreditCard,
  LineChart,
  LockKeyhole,
  PieChart,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  WalletCards,
  Zap,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const metrics = [
  ['4.8/5', 'User experience'],
  ['24/7', 'Insight monitoring'],
  ['15%', 'Target hemat bulanan'],
];

const features = [
  ['Pencatatan Super Cepat', 'Input income dan expense harian dengan kategori yang jelas.', WalletCards],
  ['Dashboard Visual', 'Pantau saldo, cashflow, kategori boros, dan progress tabungan.', BarChart3],
  ['AI Money Coach', 'Rekomendasi personal berdasarkan kebiasaan transaksi pengguna.', Bot],
];

const transactions = [
  ['Food & Drink', '-Rp185rb', 'expense'],
  ['Freelance', '+Rp750rb', 'income'],
  ['Entertainment', '-Rp120rb', 'expense'],
];

export default function Landing({ theme, onToggleTheme }) {
  useEffect(() => {
    const items = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.18 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing landing-pro">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <header className="landing-nav pro-nav">
        <Link to="/" className="brand dark brand-pro">
          <div className="brand-mark"><WalletCards size={24} /></div>
          <b>SmartFinance <span>AI</span></b>
        </Link>
        <div className="nav-menu">
          <a href="#features">Fitur</a>
          <a href="#demo">Demo</a>
          <a href="#security">Keamanan</a>
        </div>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Link to="/login">Login</Link>
          <Link className="btn small nav-cta" to="/register">Mulai Gratis</Link>
        </div>
      </header>

      <section className="hero pro-hero" id="demo">
        <div className="hero-copy pro-copy reveal-up">
          <div className="eyebrow pro-eyebrow"><Sparkles size={16} /> Fintech AI untuk generasi muda</div>
          <h1>Kelola uang lebih tenang dengan insight yang pintar.</h1>
          <p>
            SmartFinance AI membantu kamu mencatat transaksi, membaca pola pengeluaran,
            dan memberikan rekomendasi finansial yang mudah dipahami.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-glow" to="/register">Mulai Kelola Uang <ArrowRight size={18} /></Link>
            <Link className="btn ghost glass-btn" to="/dashboard">Lihat Dashboard Demo</Link>
          </div>
          <div className="hero-metrics">
            {metrics.map(([value, label]) => (
              <div className="metric-card" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal-float">
          <div className="floating-tag tag-left"><BellRing size={16} /> Lifestyle naik 12%</div>
          <div className="floating-tag tag-right"><CheckCircle2 size={16} /> Budget aman</div>

          <div className="dashboard-preview">
            <div className="preview-top">
              <div>
                <span>Saldo Bulan Ini</span>
                <h2>Rp3,72 jt</h2>
              </div>
              <div className="preview-icon"><Sparkles size={22} /></div>
            </div>

            <div className="preview-chart">
              <span style={{ height: '42%' }}></span>
              <span style={{ height: '68%' }}></span>
              <span style={{ height: '52%' }}></span>
              <span style={{ height: '86%' }}></span>
              <span style={{ height: '64%' }}></span>
              <span style={{ height: '92%' }}></span>
              <span style={{ height: '74%' }}></span>
            </div>

            <div className="preview-grid">
              <div><small>Income</small><b>Rp4,3 jt</b></div>
              <div><small>Expense</small><b>Rp1,5 jt</b></div>
            </div>

            <div className="insight-strip">
              <Zap size={17} /> Kurangi hiburan 15% agar target tabungan tetap tercapai.
            </div>
          </div>

          <div className="transaction-float">
            <div className="mini-title"><CreditCard size={17} /> Recent Transactions</div>
            {transactions.map(([name, amount, type]) => (
              <div className="mini-transaction" key={name}>
                <span className={type}></span>
                <p>{name}</p>
                <b className={type}>{amount}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-grid pro-features scroll-reveal" id="features">
        {features.map(([title, desc, Icon]) => (
          <div className="feature pro-feature magnetic" key={title}>
            <div className="feature-icon"><Icon size={28} /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      <section className="startup-section scroll-reveal">
        <div className="section-copy">
          <span className="eyebrow"><ShieldCheck size={16} /> Built like real fintech</span>
          <h2>Pengalaman aplikasi terasa premium, cepat, dan siap demo.</h2>
          <p>Micro interaction, loading state, hover cards, serta dark mode dibuat native CSS agar ringan saat dijalankan di laptop maupun saat deployment.</p>
        </div>
        <div className="workflow-card parallax-card">
          <div><b>01</b><span>Input transaksi</span></div>
          <div><b>02</b><span>Analisis cashflow</span></div>
          <div><b>03</b><span>Insight personal</span></div>
          <div><b>04</b><span>Rekomendasi AI</span></div>
        </div>
      </section>

      <section className="landing-bottom scroll-reveal" id="security">
        <div className="bottom-card dark-card">
          <LockKeyhole size={28} />
          <h2>Siap disambung ke backend dan REST API.</h2>
          <p>Struktur frontend sudah rapi untuk login, dashboard, transaksi, rekomendasi, dan integrasi database.</p>
        </div>
        <div className="bottom-card light-card">
          <div className="stack-icons">
            <LineChart /><PieChart /><TrendingDown /><ShieldCheck />
          </div>
          <h2>Data-driven, cepat, dan ringan.</h2>
          <p>Animasi dibuat memakai CSS ringan tanpa library berat, sehingga tampilan tetap profesional tapi tidak lemot.</p>
        </div>
      </section>
    </div>
  );
}
