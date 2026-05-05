const toNumber = (value) => Number(value || 0)
const formatMonth = (date) => new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date)

export const getSummary = (transactions = [], user = {}) => {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + toNumber(item.amount), 0)

  const expense = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + toNumber(item.amount), 0)

  const balance = income - expense
  const savingTarget = toNumber(user?.savingTarget ?? user?.saving_target)
  const savingProgress = savingTarget > 0 ? Math.min(Math.round((Math.max(balance, 0) / savingTarget) * 100), 100) : 0
  const expenseRatio = income > 0 ? Math.round((expense / income) * 100) : 0
  const savingRate = income > 0 ? Math.round((Math.max(balance, 0) / income) * 100) : 0

  return { income, expense, balance, savingProgress, expenseRatio, savingRate }
}

export const getCategoryData = (transactions = []) => {
  const map = {}

  transactions
    .filter((item) => item.type === 'expense')
    .forEach((item) => {
      const key = item.categoryLabel || item.category || 'Lainnya'
      map[key] = (map[key] || 0) + toNumber(item.amount)
    })

  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export const getTrendData = (transactions = []) => {
  const map = new Map()

  transactions.forEach((item) => {
    const rawDate = item.transaction_date || item.date
    const date = rawDate ? new Date(rawDate) : new Date()
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const label = `${formatMonth(date)} ${date.getFullYear()}`
    const current = map.get(key) || { name: label, income: 0, expense: 0 }

    if (item.type === 'income') current.income += toNumber(item.amount)
    if (item.type === 'expense') current.expense += toNumber(item.amount)

    map.set(key, current)
  })

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value)
}

export const getRecommendations = (transactions = [], user = {}) => {
  const categories = getCategoryData(transactions)
  const summary = getSummary(transactions, user)
  const topCategory = categories[0]
  const recommendations = []

  if (!transactions.length) {
    return [
      {
        id: 'empty-transaction',
        title: 'Mulai dari transaksi pertama',
        text: 'Tambahkan pemasukan dan pengeluaran pertamamu agar SmartFinance AI bisa membuat insight yang relevan.',
        priority: 'medium',
        source: 'rule_based',
        recommendation_type: 'starter',
      },
    ]
  }

  if (topCategory) {
    recommendations.push({
      id: 'top-category',
      title: 'Kategori pengeluaran terbesar',
      text: `${topCategory.name} menjadi pengeluaran terbesar. Coba tetapkan batas mingguan agar cashflow lebih terkontrol.`,
      priority: 'high',
      source: 'rule_based',
      recommendation_type: 'spending_pattern',
    })
  }

  if (summary.expenseRatio > 70) {
    recommendations.push({
      id: 'expense-ratio-high',
      title: 'Rasio pengeluaran cukup tinggi',
      text: `Pengeluaranmu sekitar ${summary.expenseRatio}% dari pemasukan. Target aman untuk MVP ini adalah menjaga pengeluaran di bawah 70%.`,
      priority: 'high',
      source: 'rule_based',
      recommendation_type: 'cashflow_health',
    })
  } else {
    recommendations.push({
      id: 'expense-ratio-safe',
      title: 'Cashflow mulai terkendali',
      text: `Rasio pengeluaranmu sekitar ${summary.expenseRatio}%. Pertahankan kebiasaan ini dan alokasikan selisihnya untuk tabungan.`,
      priority: 'medium',
      source: 'rule_based',
      recommendation_type: 'cashflow_health',
    })
  }

  if ((user.financial_goal || user.financialGoal) === 'emergency_fund') {
    recommendations.push({
      id: 'emergency-fund',
      title: 'Fokus dana darurat',
      text: 'Karena tujuanmu membangun dana darurat, prioritaskan menyisihkan dana tetap setelah pemasukan masuk.',
      priority: 'medium',
      source: 'rule_based',
      recommendation_type: 'goal_based',
    })
  } else if ((user.spending_style || user.spendingStyle) === 'impulsive') {
    recommendations.push({
      id: 'impulsive-spending',
      title: 'Kurangi pembelian impulsif',
      text: 'Gunakan aturan tunggu 24 jam sebelum membeli barang non-prioritas agar pengeluaran tidak membengkak.',
      priority: 'medium',
      source: 'rule_based',
      recommendation_type: 'behavior_based',
    })
  } else {
    recommendations.push({
      id: 'budget-method',
      title: 'Strategi budget sederhana',
      text: 'Gunakan metode 50/30/20: kebutuhan, gaya hidup, dan tabungan agar alokasi uang lebih terstruktur.',
      priority: 'low',
      source: 'rule_based',
      recommendation_type: 'budgeting',
    })
  }

  return recommendations
}
