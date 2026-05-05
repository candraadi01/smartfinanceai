export const env = {
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'local',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  otpLength: Number(import.meta.env.VITE_OTP_LENGTH || 6),
}

export const isApiMode = env.dataSource === 'api'
