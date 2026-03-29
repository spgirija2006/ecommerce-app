import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminDashboard.css'

const EMOJIS = ['🛒','📱','💻','👗','🎧','🍕','📚','⌚','🎮','👟','🏠','💄','🎁','🔧','🖥️']
const STATUS_COLOR = { Pending:'#f59e0b', Processing:'#3b82f6', Shipped:'#8b5cf6', Delivered:'#10b981', Cancelled:'#ef4444' }

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('orders')
  const [form, setForm] = useState({ name:'', description:'', price:'', category:'Electronics', stock:'10', emoji:'🛒' })
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(r => setProducts(r.data))
    axios.get('http://localhost:5000/api/orders/all', { headers }).then(r => setOrders(r.data))
  }, [])

  const addProduct = async () => {
    if (!form.name || !form.price) return alert('Name and price are required!')
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/products', form, { headers })
      setProducts([data, ...products])
      setForm({ name:'', description:'', price:'', category:'Electronics', stock:'10', emoji:'🛒' })
      alert('✅ Product added!')
      setTab('products')
    } catch { alert('Failed to add product!') }
    setLoading(false)
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await axios.delete(`http://localhost:5000/api/products/${id}`, { headers })
    setProducts(products.filter(p => p._id !== id))
  }

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, { headers })
    setOrders(orders.map(o => o._id === id ? {...o, status} : o))
  }

  const pending = orders.filter(o => o.status === 'Pending').length

  return (
    <div className="admin">
      <div className="admin-header">
        <h2>🛠 Admin Dashboard</h2>
        <div className="admin-stats">
          <div className="stat">📦 <b>{products.length}</b> Products</div>
          <div className="stat">🛒 <b>{orders.length}</b> Orders</div>
          <div className="stat">⏳ <b>{pending}</b> Pending</div>
          <div className="stat">✅ <b>{orders.filter(o=>o.status==='Delivered').length}</b> Delivered</div>
        </div>
      </div>

      <div className="admin-tabs">
        <button onClick={() => setTab('orders')} className={tab==='orders' ? 'tab active' : 'tab'}>
          🔔 Orders {pending > 0 && <span className="notif">{pending}</span>}
        </button>
        <button onClick={() => setTab('products')} className={tab==='products' ? 'tab active' : 'tab'}>
          📦 Products
        </button>
        <button onClick={() => setTab('add')} className={tab==='add' ? 'tab active' : 'tab'}>
          ➕ Add Product
        </button>
      </div>

      {/* ADD PRODUCT */}
      {tab === 'add' && (
        <div className="admin-card">
          <h3>➕ Add New Product</h3>
          <div className="form-grid">
            <div>
              <label>Product Name *</label>
              <input placeholder="e.g. iPhone 15" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label>Price (₹) *</label>
              <input type="number" placeholder="e.g. 79999" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            </div>
            <div>
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Accessories</option>
                <option>Food</option>
                <option>Books</option>
                <option>General</option>
              </select>
            </div>
            <div>
              <label>Stock Quantity</label>
              <input type="number" placeholder="e.g. 10" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
            </div>
          </div>
          <label>Description</label>
          <input placeholder="Product description..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <label>Pick Icon</label>
          <div className="emoji-grid">
            {EMOJIS.map(e => (
              <span key={e} onClick={() => setForm({...form, emoji: e})}
                className={form.emoji === e ? 'emoji-opt selected' : 'emoji-opt'}>
                {e}
              </span>
            ))}
          </div>
          <div className="preview-card">
            <span style={{fontSize:'3rem'}}>{form.emoji}</span>
            <div>
              <b>{form.name || 'Product Name'}</b>
              <p style={{color:'#4f46e5',fontWeight:'700'}}>₹{form.price || '0'}</p>
              <p style={{color:'#888',fontSize:'0.85rem'}}>{form.category}</p>
            </div>
          </div>
          <button onClick={addProduct} className="add-btn" disabled={loading}>
            {loading ? 'Adding...' : '➕ Add Product'}
          </button>
        </div>
      )}

      {/* PRODUCTS LIST */}
      {tab === 'products' && (
        <div className="admin-card">
          <h3>📦 All Products ({products.length})</h3>
          {products.length === 0 ? <p style={{color:'#888'}}>No products yet. Add some!</p> : (
            <div className="product-list">
              {products.map(p => (
                <div key={p._id} className="product-row">
                  <span className="product-icon">{p.emoji || '🛒'}</span>
                  <div className="product-row-info">
                    <b>{p.name}</b>
                    <span>{p.category}</span>
                  </div>
                  <div className="product-row-stats">
                    <span className="price-tag">₹{Number(p.price).toLocaleString()}</span>
                    <span>Stock: {p.stock}</span>
                    <span>❤️ {p.likes?.length || 0}</span>
                    <span>⭐ {p.reviews?.length || 0}</span>
                  </div>
                  <button onClick={() => deleteProduct(p._id)} className="del-btn">🗑 Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ORDERS */}
      {tab === 'orders' && (
        <div className="admin-card">
          <h3>🔔 All Orders ({orders.length})</h3>
          {orders.length === 0 ? <p style={{color:'#888'}}>No orders yet!</p> : (
            orders.map(o => (
              <div key={o._id} className="order-notif">
                <div className="notif-top">
                  <div>
                    <b>Order #{o._id.slice(-8).toUpperCase()}</b>
                    <span style={{color:'#888',fontSize:'0.85rem',marginLeft:'1rem'}}>
                      {new Date(o.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <span className="status-pill" style={{background: STATUS_COLOR[o.status]+'20', color: STATUS_COLOR[o.status]}}>
                    {o.status}
                  </span>
                </div>
                <div className="notif-info">
                  <p>👤 <b>{o.user?.name}</b> ({o.user?.email})</p>
                  <p>💰 Total: <b>₹{Number(o.totalPrice).toLocaleString()}</b></p>
                  <p>💳 Payment: {o.paymentMethod}</p>
                  <p>📍 {o.shippingAddress}</p>
                </div>
                <div className="notif-items">
                  {o.items.map((item, i) => (
                    <span key={i} className="order-item-tag">{item.name} x{item.qty}</span>
                  ))}
                </div>
                <div className="notif-action">
                  <label>Update Status:</label>
                  <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}