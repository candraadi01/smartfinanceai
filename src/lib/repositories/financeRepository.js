import { isApiMode } from '../../config/env'
import * as localFinance from '../storage/localFinanceRepository'
import * as transactionApi from '../api/transactionApi'

export const formatIDR = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value || 0)

export const financeRepository = {
  async getTransactions() {
    return isApiMode ? transactionApi.getTransactions() : localFinance.getTransactions()
  },

  async createTransaction(payload) {
    return isApiMode ? transactionApi.createTransaction(payload) : localFinance.createTransaction(payload)
  },

  async updateTransaction(id, payload) {
    return isApiMode ? transactionApi.updateTransaction(id, payload) : localFinance.updateTransaction(id, payload)
  },

  async deleteTransaction(id) {
    return isApiMode ? transactionApi.deleteTransaction(id) : localFinance.deleteTransaction(id)
  },
}
