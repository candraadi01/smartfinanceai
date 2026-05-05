import { isApiMode } from '../../config/env'
import { getRecommendations as getLocalRecommendations } from '../analytics/financeAnalytics'
import { financeRepository } from './financeRepository'
import { authRepository } from './authRepository'
import * as recommendationApi from '../api/recommendationApi'

export const recommendationRepository = {
  async getRecommendations() {
    if (isApiMode) return recommendationApi.getRecommendations()

    const [transactions, user] = await Promise.all([
      financeRepository.getTransactions(),
      authRepository.getProfile(),
    ])

    return getLocalRecommendations(transactions, user)
  },
}
