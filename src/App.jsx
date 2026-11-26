import { useMemo, useState } from 'react'
import { ArrowRight, Heart, Mic, Search, ShoppingBag, Star, User, Volume2, ChevronLeft, ChevronRight, Plus, Minus, X } from 'lucide-react'
import './App.css'

const products = [
  { id: 1, name: 'Aura Silk Dress', category: 'Women', price: 3499, mrp: 4999, rating: 4.9, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=90' },
  { id: 2, name: 'Maison Structured Tote', category: 'Accessories', price: 2899, mrp: 3899, rating: 4.8, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=90' },
  { id: 3, name: 'Solstice Linen Set', category: 'Men', price: 4299, mrp: 5799, rating: 4.9, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=90' },
  { id: 4, name: 'Noir Chronograph', category: 'Accessories', price: 5499, mrp: 6999, rating: 4.7, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=90' },
]

const categories = [
  { name: 'Women', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Men', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=700&q=85' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=700&q=85' },
]

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [voiceOn, setVoiceOn] = useState(false)
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    if (!query.trim()) return products
    return products.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()))
  }, [query])
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      if (found) return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      return [...current, { ...product, qty: 1 }]
    })
  }
  const changeQty = (id, delta) => setCart((current) =>
    current.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0)
  )
  const toggleWishlist = (id) => setWishlist((current) =>
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  )

  return (
    <div className="app">
      <div className="announcement"><span>Complimentary shipping on orders over ₹2,999</span><button>Discover more <ArrowRight size={13} /></button></div>
      <header>
        <button className="mobile-menu" aria-label="Menu"><span /><span /></button>
        <a className="brand" href="#">AVM<span>AI VOICE MART</span></a>
        <nav><a href="#new">New In</a><a href="#collections">Women</a><a href="#collections">Men</a><a href="#collections">Accessories</a><a href="#new">The Edit</a></nav>
        <div className="header-actions">
          <button aria-label="Search"><Search size={20} /></button>
          <button className="desktop-icon" aria-label="Account"><User size={20} /></button>
          <button aria-label="Shopping bag" className="bag-button" onClick={() => setCartOpen(true)}><ShoppingBag size={20} />{cartCount > 0 && <b>{cartCount}</b>}</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">The spring chapter · 2026</p>
            <h1>Quiet confidence,<br /><em>beautifully yours.</em></h1>
            <p className="hero-text">Considered pieces for an intentional wardrobe. Modern silhouettes, exceptional fabrics, and enduring form.</p>
            <button className="primary">Shop the collection <ArrowRight size={17} /></button>
          </div>
          <div className="hero-media">
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=92" alt="Woman wearing an elegant dress" />
            <button className="voice-card" onClick={() => setVoiceOn(!voiceOn)}>
              <span className={voiceOn ? 'mic active' : 'mic'}><Mic size={19} /></span>
              <span><small>Ask AVM</small><strong>{voiceOn ? 'Listening...' : 'Find my style'}</strong></span>
              <Volume2 size={17} />
            </button>
          </div>
        </section>

        <section className="categories" id="collections">
          <div className="section-heading"><div><p className="eyebrow">Curated for you</p><h2>Shop by category</h2></div><div className="arrows"><button><ChevronLeft size={18} /></button><button><ChevronRight size={18} /></button></div></div>
          <div className="category-grid">
            {categories.map((category) => <a className="category-card" href="#new" key={category.name}><img src={category.image} alt={category.name} /><div><h3>{category.name}</h3><span>Explore <ArrowRight size={14} /></span></div></a>)}
          </div>
        </section>

        <section className="products" id="new">
          <div className="section-heading"><div><p className="eyebrow">Just arrived</p><h2>New expressions</h2></div><div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the collection" />{query && <button onClick={() => setQuery('')}><X size={14} /></button>}</div></div>
          <div className="product-grid">
            {filtered.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image"><img src={product.image} alt={product.name} />{product.id === 1 && <span className="badge">New</span>}<button className={wishlist.includes(product.id) ? 'wish active' : 'wish'} onClick={() => toggleWishlist(product.id)} aria-label="Add to wishlist"><Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => addToCart(product)}>Add to bag <Plus size={16} /></button></div>
                <div className="product-info"><div><p>{product.category}</p><h3>{product.name}</h3></div><div className="rating"><Star size={12} fill="currentColor" /> {product.rating}</div><div className="price"><strong>₹{product.price.toLocaleString('en-IN')}</strong><s>₹{product.mrp.toLocaleString('en-IN')}</s></div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial"><img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90" alt="Summer fashion editorial" /><div><p className="eyebrow">The AVM edit</p><h2>Made for the moments<br />you'll remember.</h2><p>Discover a thoughtful collection shaped by ease, elegance, and everyday possibility.</p><button className="text-link">Explore the edit <ArrowRight size={16} /></button></div></section>
      </main>
      <footer><a className="brand footer-brand" href="#">AVM<span>AI VOICE MART</span></a><p>Luxury, spoken into existence.</p></footer>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}
      <aside className={cartOpen ? 'cart-drawer open' : 'cart-drawer'}>
        <div className="cart-header"><div><p className="eyebrow">Your selection</p><h2>Shopping bag <span>({cartCount})</span></h2></div><button onClick={() => setCartOpen(false)}><X size={21} /></button></div>
        <div className="cart-items">{cart.length === 0 ? <div className="empty"><ShoppingBag size={42} /><h3>Your bag is empty</h3><p>Explore pieces selected for you.</p><button className="primary" onClick={() => setCartOpen(false)}>Continue shopping</button></div> : cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3><p>{item.category}</p><strong>₹{item.price.toLocaleString('en-IN')}</strong><div className="qty"><button onClick={() => changeQty(item.id, -1)}><Minus size={13} /></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)}><Plus size={13} /></button></div></div></div>)}</div>
        {cart.length > 0 && <div className="cart-footer"><div><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div><p>Shipping calculated at checkout</p><button className="checkout">Continue to checkout <ArrowRight size={17} /></button></div>}
      </aside>
    </div>
  )
}

export default App
