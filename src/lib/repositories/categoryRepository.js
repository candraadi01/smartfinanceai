import { isApiMode } from '../../config/env'
import * as categoryApi from '../api/categoryApi'
import * as localFinance from '../storage/localFinanceRepository'

export const categoryRepository = {
  async getCategories() {
    return isApiMode ? categoryApi.getCategories() : localFinance.getCategories()
  },

  async createCategory(payload) {
    return isApiMode ? categoryApi.createCategory(payload) : localFinance.createCategory(payload)
  },
}
