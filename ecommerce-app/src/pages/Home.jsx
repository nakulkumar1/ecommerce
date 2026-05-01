import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to MyShop</h1>
        <p>Discover amazing products at great prices!</p>
        <Link to="/products" className="shop-now-btn">
          Shop Now
        </Link>
      </div>
      <div className="features">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💳</span>
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature">
          <span className="feature-icon">↩️</span>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </div>
    </div>
  )
}

export default Home
