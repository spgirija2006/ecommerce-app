import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const CATEGORIES = ['All','Electronics','Fashion','Accessories','Food','Books']
const EMOJIS = { Electronics:'📱', Fashion:'👗', Accessories:'🎧', Food:'🍕', Books:'📚', General:'🛒' }

export default function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchProducts = async (s = search, c = category) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (s) params.append('search', s)
      if (c !== 'All') params.append('category', c)
      const { data } = await axios.get(`http://localhost:5000/api/products?${params}`)
      setProducts(data)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [category])

  const addToCart = (e, product) => {
    e.stopPropagation()
    if (product.stock === 0) return alert('Out of stock!')
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i._id === product._id)
    if (existing) existing.qty += 1
    else cart.push({ ...product, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`✅ ${product.name} added to cart!`)
  }

  const avgRating = (reviews) => {
    if (!reviews?.length) return 0
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  }

  return (
    <div className="home">
      {/* Search */}
      <div className="search-wrap">
        <div className="search-box">
          <input
            placeholder="🔍 Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchProducts()}
          />
          <button onClick={() => fetchProducts()}>Search</button>
        </div>
      </div>

      {/* Categories */}
      <div className="cats">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={category === c ? 'cat active' : 'cat'}>
            {c}
          </button>
        ))}
      </div>

      <h2 className="section-title">
        {category === 'All' ? '🛍 All Products' : EMOJIS[category] + ' ' + category}
        <span className="count"> ({products.length})</span>
      </h2>

      {loading ? (
        <div className="grid">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="empty">
          <p>😕 No products found</p>
          <button onClick={() => { setSearch(''); setCategory('All') }}>Clear Filters</button>
        </div>
      ) : (
        <div className="grid">
          {products.map(p => (
            <div key={p._id} className="card" onClick={() => navigate(`/product/${p._id}`)}>
              <div className="card-img">{p.emoji || EMOJIS[p.category] || '🛒'}</div>
              <div className="card-body">
                <span className="badge">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="card-meta">
                  <span>❤️ {p.likes?.length || 0}</span>
                  <span>⭐ {avgRating(p.reviews)}</span>
                  <span className={p.stock > 0 ? 'green' : 'red'}>
                    {p.stock > 0 ? '✅ In Stock' : '❌ Out of Stock'}
                  </span>
                </div>
                <div className="card-footer">
                  <span className="price">₹{Number(p.price).toLocaleString()}</span>
                  <button onClick={e => addToCart(e, p)} disabled={p.stock === 0}>
                    {p.stock === 0 ? 'Out of Stock' : '🛒 Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}