import { Link } from 'react-router-dom'

function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🛍️ MyShop</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart" className="cart-link">
            Cart
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
