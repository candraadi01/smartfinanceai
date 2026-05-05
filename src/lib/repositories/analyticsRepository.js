import { isApiMode } from '../../config/env'
import * as analyticsApi from '../api/analyticsApi'
import { getCategoryData, getSummary, getTrendData } from '../analytics/financeAnalytics'
import { authRepository } from './authRepository'
import { financeRepository } from './financeRepository'

export const analyticsRepository = {
  async getDashboardAnalytics() {
    if (isApiMode) return analyticsApi.getSummary()

    const [transactions, user] = await Promise.all([
      financeRepository.getTransactions(),
      authRepository.getProfile(),
    ])

    return {
      user,
      transactions,
      summary: getSummary(transactions, user),
      categories: getCategoryData(transactions),
      trend: getTrendData(transactions),
    }
  },
}
