import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async () => {
    if (!form.email || !form.password) return setError('All fields required!')
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.user.isAdmin) navigate('/admin')
      else navigate('/')
    } catch {
      setError('Invalid email or password!')
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🛍</div>
        <h2>Welcome Back!</h2>
        <p className="auth-sub">Login to ShopEasy</p>
        {error && <div className="error-box">{error}</div>}
        <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <button onClick={submit} className="auth-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="auth-switch">No account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  )
}