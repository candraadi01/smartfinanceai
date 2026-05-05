import { defaultCategories, defaultTransactions, defaultUser } from '../../mocks/finance.mock'
import { STORAGE_KEYS } from '../utils/storageKeys'
import {
  normalizeCategory,
  normalizeTransaction,
  normalizeUser,
  toApiProfilePayload,
} from '../utils/financeAdapters'

const DEMO_OTP = '123456'

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function hasLocalSession() {
  return Boolean(localStorage.getItem(STORAGE_KEYS.accessToken))
}

export async function getUser() {
  return normalizeUser(readJson(STORAGE_KEYS.user, defaultUser))
}

export async function saveUser(user) {
  const currentUser = await getUser()
  const partialPayload = toApiProfilePayload(user)
  const nextUser = normalizeUser({ ...currentUser, ...user, ...partialPayload })
  return writeJson(STORAGE_KEYS.user, nextUser)
}

export async function login(payload) {
  const currentUser = await getUser()

  if (currentUser.email && payload.email && currentUser.email !== payload.email) {
    throw new Error('Email belum terdaftar di mode lokal. Gunakan register terlebih dahulu atau pakai demo@smartfinance.ai.')
  }

  if (currentUser.status === 'pending') {
    throw new Error('Akun belum diverifikasi. Masukkan OTP terlebih dahulu.')
  }

  const user = normalizeUser({
    ...currentUser,
    email: payload.email || currentUser.email,
  })

  writeJson(STORAGE_KEYS.user, user)
  localStorage.setItem(STORAGE_KEYS.accessToken, 'local-demo-token')

  return { user, token: 'local-demo-token' }
}

export async function register(payload) {
  const user = normalizeUser({
    id: `local-${Date.now()}`,
    name: payload.name,
    email: payload.email,
    monthlyIncome: 0,
    savingTarget: 0,
    nickname: '',
    status: 'pending',
    onboarding_completed: false,
    emailVerifiedAt: null,
  })

  writeJson(STORAGE_KEYS.user, user)
  writeJson(STORAGE_KEYS.otp, {
    email: payload.email,
    otp_code: DEMO_OTP,
    purpose: 'register',
    is_used: false,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    attempts: 0,
  })

  return { user, requiresOtp: true, message: 'OTP dikirim ke email kamu.', demoOtp: DEMO_OTP }
}

export async function verifyOtp(payload) {
  const otp = readJson(STORAGE_KEYS.otp, null)

  if (!otp || otp.email !== payload.email || otp.purpose !== (payload.purpose || 'register')) {
    throw new Error('OTP tidak ditemukan. Silakan kirim ulang OTP.')
  }

  if (otp.is_used) throw new Error('OTP sudah digunakan.')
  if (new Date(otp.expires_at).getTime() < Date.now()) throw new Error('OTP sudah kedaluwarsa.')
  if ((otp.attempts || 0) >= 5) throw new Error('Percobaan OTP terlalu banyak. Kirim ulang kode OTP.')

  const code = String(payload.otp_code || payload.otpCode || payload.code || '')

  if (code !== otp.otp_code) {
    writeJson(STORAGE_KEYS.otp, { ...otp, attempts: (otp.attempts || 0) + 1 })
    throw new Error('Kode OTP salah.')
  }

  const currentUser = await getUser()
  const user = normalizeUser({
    ...currentUser,
    email: payload.email,
    status: 'active',
    emailVerifiedAt: new Date().toISOString(),
  })

  writeJson(STORAGE_KEYS.user, user)
  writeJson(STORAGE_KEYS.otp, { ...otp, is_used: true })
  localStorage.setItem(STORAGE_KEYS.accessToken, 'local-demo-token')

  return { user, token: 'local-demo-token' }
}

export async function resendOtp(payload) {
  writeJson(STORAGE_KEYS.otp, {
    email: payload.email,
    otp_code: DEMO_OTP,
    purpose: payload.purpose || 'register',
    is_used: false,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    attempts: 0,
  })

  return { message: 'OTP baru dikirim.', demoOtp: DEMO_OTP }
}

export async function logout() {
  localStorage.removeItem(STORAGE_KEYS.accessToken)
}

export async function getCategories() {
  return readJson(STORAGE_KEYS.categories || 'sf-categories', defaultCategories).map(normalizeCategory)
}

export async function createCategory(payload) {
  const items = await getCategories()
  const category = normalizeCategory({ ...payload, id: Date.now() })
  const next = [...items, category]
  writeJson(STORAGE_KEYS.categories || 'sf-categories', next)
  return category
}

export async function getTransactions() {
  return readJson(STORAGE_KEYS.transactions, defaultTransactions).map(normalizeTransaction)
}

export async function saveTransactions(items) {
  return writeJson(STORAGE_KEYS.transactions, items.map(normalizeTransaction))
}

export async function createTransaction(tx) {
  const items = await getTransactions()
  const nextItem = normalizeTransaction({ ...tx, id: Date.now(), created_at: new Date().toISOString() })
  const next = [nextItem, ...items]
  await saveTransactions(next)
  return nextItem
}

export async function updateTransaction(id, payload) {
  const items = await getTransactions()
  const next = items.map((item) =>
    Number(item.id) === Number(id)
      ? normalizeTransaction({ ...item, ...payload, updated_at: new Date().toISOString() })
      : item,
  )
  await saveTransactions(next)
  return next.find((item) => Number(item.id) === Number(id))
}

export async function deleteTransaction(id) {
  const items = await getTransactions()
  const next = items.filter((item) => Number(item.id) !== Number(id))
  await saveTransactions(next)
  return { id }
}
