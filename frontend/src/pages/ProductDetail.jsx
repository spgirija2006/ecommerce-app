import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(r => setProduct(r.data))
  }, [id])

  const addToCart = () => {
    if (product.stock === 0) return alert('Out of stock!')
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i._id === product._id)
    if (existing) existing.qty += 1
    else cart.push({ ...product, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('✅ Added to cart!')
  }

  const toggleLike = async () => {
    const { data } = await axios.post(`http://localhost:5000/api/products/${id}/like`, {},
      { headers: { Authorization: `Bearer ${token}` } })
    setProduct(data)
  }

  const submitReview = async () => {
    if (!comment.trim()) return alert('Write a review first!')
    await axios.post(`http://localhost:5000/api/products/${id}/review`,
      { userName: user.name, comment, rating },
      { headers: { Authorization: `Bearer ${token}` } })
    setComment('')
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
    setProduct(data)
  }

  if (!product) return <div className="loading">Loading...</div>

  const liked = product.likes?.includes(user.id)
  const avg = product.reviews?.length
    ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
    : null

  return (
    <div className="detail">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>

      <div className="detail-top">
        <div className="detail-img">{product.emoji || '🛒'}</div>
        <div className="detail-info">
          <span className="detail-cat">{product.category}</span>
          <h2>{product.name}</h2>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-meta">
            <span className="detail-price">₹{Number(product.price).toLocaleString()}</span>
            {avg && <span className="detail-rating">⭐ {avg} ({product.reviews.length} reviews)</span>}
            <span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
              {product.stock > 0 ? `✅ In Stock (${product.stock})` : '❌ Out of Stock'}
            </span>
          </div>

          <div className="detail-actions">
            <button onClick={addToCart} disabled={product.stock === 0} className="cart-btn">
              🛒 Add to Cart
            </button>
            <button onClick={toggleLike} className={liked ? 'liked-btn' : 'like-btn'}>
              {liked ? '❤️' : '🤍'} {product.likes?.length || 0} Likes
            </button>
          </div>
        </div>
      </div>

      <div className="reviews">
        <h3>⭐ Reviews & Ratings</h3>
        <div className="add-review">
          <div className="star-select">
            {[1,2,3,4,5].map(s => (
              <span key={s} onClick={() => setRating(s)}
                style={{fontSize:'1.8rem', cursor:'pointer', color: s <= rating ? '#f59e0b' : '#ddd'}}>
                ★
              </span>
            ))}
            <span style={{color:'#888', marginLeft:'0.5rem'}}>({rating}/5)</span>
          </div>
          <textarea placeholder="Write your review..." value={comment}
            onChange={e => setComment(e.target.value)} rows={3} />
          <button onClick={submitReview}>Submit Review</button>
        </div>

        <div className="review-list">
          {product.reviews?.length === 0 && <p className="no-review">No reviews yet. Be the first!</p>}
          {product.reviews?.map((r, i) => (
            <div key={i} className="review-item">
              <div className="review-top">
                <span className="review-name">👤 {r.userName}</span>
                <span className="review-stars">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </span>
              </div>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}