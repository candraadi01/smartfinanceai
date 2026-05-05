import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Wallet } from 'lucide-react'
import { authRepository } from '../../../lib/repositories/authRepository'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const isRegister = location.pathname === '/register'

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (isRegister && !form.name.trim()) return 'Nama lengkap wajib diisi.'
    if (!form.email.trim()) return 'Email wajib diisi.'
    if (!emailRegex.test(form.email)) return 'Format email tidak valid.'
    if (!form.password) return 'Password wajib diisi.'
    if (!passwordRegex.test(form.password)) return 'Password minimal 8 karakter dan harus mengandung huruf serta angka.'
    if (isRegister && !form.confirmPassword) return 'Konfirmasi password wajib diisi.'
    if (isRegister && form.password !== form.confirmPassword) return 'Password dan konfirmasi password tidak sama.'
    return ''
  }

  const handleLoginRedirect = (user) => {
    if (user.status === 'pending') {
      navigate('/verify-otp', { state: { email: user.email } })
      return
    }

    if (!user.onboarding_completed && !user.onboardingCompleted) {
      navigate('/onboarding')
      return
    }

    const redirectTo = location.state?.from && location.state.from !== '/login' ? location.state.from : '/dashboard'
    navigate(redirectTo)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationMessage = validateForm()
    if (validationMessage) {
      setError(validationMessage)
      return
    }

    try {
      setLoading(true)
      setError('')

      if (isRegister) {
        await authRepository.register({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        })

        navigate('/verify-otp', { state: { email: form.email.trim().toLowerCase() } })
        return
      }

      const user = await authRepository.login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })

      handleLoginRedirect(user)
    } catch (err) {
      setError(err?.message || 'Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">
          <span className="brand-icon"><Wallet size={22} /></span>
          <span>SmartFinance AI</span>
        </Link>

        <div className="auth-header">
          <p className="eyebrow">{isRegister ? 'Buat akun baru' : 'Selamat datang kembali'}</p>
          <h1>{isRegister ? 'Mulai kelola keuanganmu' : 'Masuk ke akunmu'}</h1>
          <p>
            {isRegister
              ? 'Daftar, verifikasi OTP, lalu lengkapi profil finansial awalmu.'
              : 'Masuk untuk melanjutkan pengelolaan keuanganmu.'}
          </p>
        </div>

        {location.state?.reason === 'session_expired' && (
          <div className="form-alert error">Sesi kamu berakhir. Silakan masuk kembali.</div>
        )}
        {error && <div className="form-alert error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label className="form-group">
              <span>Nama Lengkap</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                autoComplete="name"
              />
            </label>
          )}

          <label className="form-group">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              autoComplete="email"
            />
          </label>

          <label className="form-group">
            <span>Password</span>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter + angka"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {isRegister && (
            <label className="form-group">
              <span>Konfirmasi Password</span>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
          )}

          <button className="btn primary auth-submit" type="submit" disabled={loading}>
            {loading && <Loader2 size={18} className="spin" />}
            {isRegister ? 'Daftar Sekarang' : 'Masuk'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
          <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Masuk di sini' : 'Daftar di sini'}</Link>
        </p>
      </section>
    </main>
  )
}
