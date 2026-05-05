import { categoryOptions } from '../lib/utils/financeAdapters'

export const defaultUser = {
  id: 'local-user',
  name: 'Demo User',
  email: 'demo@smartfinance.ai',
  monthlyIncome: 4300000,
  monthly_income: 4300000,
  savingTarget: 1200000,
  saving_target: 1200000,
  nickname: 'Demo',
  age_range: '18-24',
  spending_style: 'balanced',
  financial_goal: 'saving',
  main_priority: 'increase_saving',
  risk_profile: 'moderate',
  onboarding_completed: true,
  status: 'active',
  email_verified_at: new Date().toISOString(),
  avatar: 'DU',
}

export const defaultTransactions = [
  { id: 1, title: 'Gaji freelance', type: 'income', category: 'Income', category_id: 10, amount: 4300000, transaction_date: '2026-05-01', note: 'Project website' },
  { id: 2, title: 'Kopi & nongkrong', type: 'expense', category: 'Lifestyle', category_id: 3, amount: 185000, transaction_date: '2026-05-03', note: 'Weekend' },
  { id: 3, title: 'Makan siang', type: 'expense', category: 'Food', category_id: 1, amount: 95000, transaction_date: '2026-05-04', note: 'Kampus' },
  { id: 4, title: 'Transportasi', type: 'expense', category: 'Transport', category_id: 2, amount: 75000, transaction_date: '2026-05-05', note: 'Ojol' },
  { id: 5, title: 'Langganan aplikasi', type: 'expense', category: 'Subscription', category_id: 6, amount: 99000, transaction_date: '2026-05-06', note: 'Premium' },
  { id: 6, title: 'Belanja skincare', type: 'expense', category: 'Shopping', category_id: 4, amount: 310000, transaction_date: '2026-05-07', note: 'Promo' },
]

export const defaultCategories = categoryOptions
export const categories = categoryOptions.map((category) => category.name)
