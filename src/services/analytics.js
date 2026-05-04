export const getSummary = (transactions, user) => {
  const income = transactions.filter(t => t.type === 'income').reduce((a,b)=>a + Number(b.amount),0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((a,b)=>a + Number(b.amount),0);
  const balance = income - expense;
  const savingProgress = Math.min(Math.round((Math.max(balance, 0) / Math.max(user.savingTarget || 1, 1)) * 100), 100);
  return { income, expense, balance, savingProgress };
};
export const getCategoryData = (transactions) => {
  const map = {};
  transactions.filter(t => t.type === 'expense').forEach(t => map[t.category] = (map[t.category] || 0) + Number(t.amount));
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
};
export const getTrendData = (transactions) => {
  return transactions.slice().reverse().map((t, i) => ({ name: `T${i+1}`, income: t.type === 'income' ? t.amount : 0, expense: t.type === 'expense' ? t.amount : 0 }));
};
export const getRecommendations = (transactions, user) => {
  const categories = getCategoryData(transactions);
  const top = categories[0];
  const expense = categories.reduce((a,b)=>a+b.value,0);
  const income = transactions.filter(t=>t.type==='income').reduce((a,b)=>a+Number(b.amount),0) || user.monthlyIncome;
  const ratio = income ? Math.round((expense / income) * 100) : 0;
  return [
    { title: 'Kategori paling boros', text: top ? `${top.name} menjadi pengeluaran terbesar. Coba batasi 10–15% minggu ini.` : 'Belum ada pengeluaran.' },
    { title: 'Rasio pengeluaran', text: `Pengeluaranmu sekitar ${ratio}% dari pemasukan. Target aman idealnya di bawah 70%.` },
    { title: 'Strategi tabungan', text: 'Gunakan metode 50/30/20: kebutuhan, gaya hidup, dan tabungan/investasi.' },
  ];
};
