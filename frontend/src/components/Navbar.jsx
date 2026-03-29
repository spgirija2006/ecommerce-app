import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token || ['/login', '/register'].includes(location.pathname)) return null

  const logout = () => { localStorage.clear(); navigate('/login') }
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  return (
    <nav className="navbar">
      <div className="navbar-brand">🛍 ShopEasy</div>
      <div className="navbar-links">
        {user.isAdmin ? (
          <>
            <Link to="/admin" className={isActive('/admin')}>📊 Dashboard</Link>
            <span className="user-info">👤 {user.name} <span className="admin-tag">Admin</span></span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className={isActive('/')}>🏠 Home</Link>
            <Link to="/cart" className={isActive('/cart')}>🛒 Cart</Link>
            <Link to="/orders" className={isActive('/orders')}>📦 Orders</Link>
            <span className="user-info">👤 {user.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}