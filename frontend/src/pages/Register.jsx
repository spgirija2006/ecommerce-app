import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required (ex: user@mail.com)'
    if (form.password.length < 8) e.password = 'Min 8 characters'
    else if (!/[A-Z]/.test(form.password)) e.password = 'Need 1 uppercase letter'
    else if (!/[!@#$%^&*]/.test(form.password)) e.password = 'Need 1 special character (!@#$%^&*)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/users/register', form)
      alert('Registered successfully!')
      navigate('/login')
    } catch {
      setErrors({ ...errors, email: 'Email already exists!' })
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🛍</div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join ShopEasy today</p>
        <input placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} />
        {errors.name && <p className="err">{errors.name}</p>}
        <input placeholder="Email (user@mail.com)" type="email" onChange={e => setForm({...form, email: e.target.value})} />
        {errors.email && <p className="err">{errors.email}</p>}
        <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        {errors.password && <p className="err">{errors.password}</p>}
        <div className="pass-rules">
          <span className={form.password.length >= 8 ? 'rule valid' : 'rule'}>✅ 8+ characters</span>
          <span className={/[A-Z]/.test(form.password) ? 'rule valid' : 'rule'}>✅ Uppercase</span>
          <span className={/[!@#$%^&*]/.test(form.password) ? 'rule valid' : 'rule'}>✅ Special char</span>
        </div>
        <button onClick={submit} className="auth-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </button>
        <p className="auth-switch">Have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}