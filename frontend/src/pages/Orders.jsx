import { useEffect, useState } from 'react'
import axios from 'axios'
import './Orders.css'

const STATUS_COLOR = { Pending:'#f59e0b', Processing:'#3b82f6', Shipped:'#8b5cf6', Delivered:'#10b981', Cancelled:'#ef4444' }

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => { setOrders(r.data); setLoading(false) })
  }, [])

  if (loading) return <div className="orders-page"><p>Loading...</p></div>

  return (
    <div className="orders-page">
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders"><p>No orders yet!</p></div>
      ) : (
        orders.map(o => (
          <div key={o._id} className="order-card">
            <div className="order-top">
              <div>
                <span className="order-id">Order #{o._id.slice(-8).toUpperCase()}</span>
                <span className="order-date">{new Date(o.createdAt).toLocaleDateString()}</span>
              </div>
              <span className="order-status" style={{background: STATUS_COLOR[o.status] + '20', color: STATUS_COLOR[o.status]}}>
                {o.status}
              </span>
            </div>
            <div className="order-items">
              {o.items.map((item, i) => (
                <div key={i} className="order-item">
                  <span>{item.name}</span>
                  <span>x{item.qty}</span>
                  <span>₹{Number(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="order-bottom">
              <span>💳 {o.paymentMethod}</span>
              <span>📍 {o.shippingAddress}</span>
              <span className="order-total">Total: ₹{Number(o.totalPrice).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}