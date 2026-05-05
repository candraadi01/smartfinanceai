import { isApiMode } from '../../config/env'
import * as localFinance from '../storage/localFinanceRepository'
import * as authApi from '../api/authApi'
import { STORAGE_KEYS } from '../utils/storageKeys'
import { normalizeUser } from '../utils/financeAdapters'

function persistToken(result) {
  const token = result?.token || result?.accessToken || result?.data?.token || result?.data?.accessToken

  if (token) {
    localStorage.setItem(STORAGE_KEYS.accessToken, token)
  }

  return token
}

function extractUser(result) {
  return normalizeUser(result?.user || result?.data?.user || result?.data || result)
}

export const authRepository = {
  isAuthenticated() {
    return Boolean(localStorage.getItem(STORAGE_KEYS.accessToken))
  },

  async login(payload) {
    const result = isApiMode ? await authApi.login(payload) : await localFinance.login(payload)
    persistToken(result)
    return extractUser(result)
  },

  async register(payload) {
    const result = isApiMode ? await authApi.register(payload) : await localFinance.register(payload)
    return {
      ...result,
      user: extractUser(result),
      requiresOtp: result?.requiresOtp ?? result?.requires_otp ?? true,
    }
  },

  async verifyOtp(payload) {
    const result = isApiMode ? await authApi.verifyOtp(payload) : await localFinance.verifyOtp(payload)
    persistToken(result)
    return extractUser(result)
  },

  async resendOtp(payload) {
    return isApiMode ? authApi.resendOtp(payload) : localFinance.resendOtp(payload)
  },

  async getProfile() {
    return isApiMode ? authApi.getProfile() : localFinance.getUser()
  },

  async updateProfile(payload) {
    return isApiMode ? authApi.updateProfile(payload) : localFinance.saveUser(payload)
  },

  async logout() {
    localStorage.removeItem(STORAGE_KEYS.accessToken)
    if (!isApiMode) await localFinance.logout()
  },
}
