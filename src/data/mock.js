export const defaultUser = {
  name: 'Candra Adi',
  email: 'candra@student.com',
  monthlyIncome: 4300000,
  savingTarget: 1200000,
  avatar: 'CA',
};

export const defaultTransactions = [
  { id: 1, title: 'Gaji freelance', type: 'income', category: 'Income', amount: 4300000, date: '2026-05-01', note: 'Project website' },
  { id: 2, title: 'Kopi & nongkrong', type: 'expense', category: 'Lifestyle', amount: 185000, date: '2026-05-03', note: 'Weekend' },
  { id: 3, title: 'Makan siang', type: 'expense', category: 'Food', amount: 95000, date: '2026-05-04', note: 'Kampus' },
  { id: 4, title: 'Transport', type: 'expense', category: 'Transport', amount: 75000, date: '2026-05-05', note: 'Ojol' },
  { id: 5, title: 'Langganan aplikasi', type: 'expense', category: 'Subscription', amount: 99000, date: '2026-05-06', note: 'Premium' },
  { id: 6, title: 'Belanja skincare', type: 'expense', category: 'Shopping', amount: 310000, date: '2026-05-07', note: 'Promo' },
];

export const categories = ['Food', 'Transport', 'Lifestyle', 'Shopping', 'Education', 'Subscription', 'Health', 'Income'];
