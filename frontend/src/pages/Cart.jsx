import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'))
  const [address, setAddress] = useState('')
  const [payment, setPayment] = useState('COD')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    const updated = cart.map(i => i._id === id ? {...i, qty} : i)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (id) => {
    const updated = cart.filter(i => i._id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const placeOrder = async () => {
    if (!address.trim()) return alert('Please enter shipping address!')
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/orders', {
        items: cart.map(i => ({ product: i._id, name: i.name, qty: i.qty, price: i.price })),
        totalPrice: total,
        paymentMethod: payment,
        shippingAddress: address
      }, { headers: { Authorization: `Bearer ${token}` } })
      localStorage.removeItem('cart')
      alert('✅ Order placed successfully!')
      navigate('/orders')
    } catch { alert('Order failed!') }
    setLoading(false)
  }

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>🛒 Cart is empty!</p>
          <button onClick={() => navigate('/')}>Shop Now</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(i => (
              <div key={i._id} className="cart-item">
                <div className="item-emoji">{i.emoji || '🛒'}</div>
                <div className="item-details">
                  <h4>{i.name}</h4>
                  <p className="item-price">₹{Number(i.price).toLocaleString()}</p>
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQty(i._id, i.qty - 1)}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => updateQty(i._id, i.qty + 1)}>+</button>
                </div>
                <div className="item-total">₹{Number(i.price * i.qty).toLocaleString()}</div>
                <button onClick={() => removeItem(i._id)} className="remove-btn">🗑</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Items ({cart.length})</span><span>₹{Number(total).toLocaleString()}</span></div>
            <div className="summary-row"><span>Delivery</span><span className="free">FREE</span></div>
            <div className="summary-total"><span>Total</span><span>₹{Number(total).toLocaleString()}</span></div>

            <div className="payment-section">
              <label><b>Payment Method</b></label>
              <div className="payment-options">
                <label className={payment === 'COD' ? 'pay-opt selected' : 'pay-opt'}>
                  <input type="radio" value="COD" checked={payment === 'COD'} onChange={() => setPayment('COD')} />
                  💵 Cash on Delivery
                </label>
                <label className={payment === 'Online' ? 'pay-opt selected' : 'pay-opt'}>
                  <input type="radio" value="Online" checked={payment === 'Online'} onChange={() => setPayment('Online')} />
                  💳 Online Payment
                </label>
              </div>
            </div>

            <div className="address-section">
              <label><b>Shipping Address</b></label>
              <textarea
                placeholder="Enter full address..."
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={3}
              />
            </div>

            <button onClick={placeOrder} className="order-btn" disabled={loading}>
              {loading ? 'Placing Order...' : `Place Order ₹${Number(total).toLocaleString()}`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}