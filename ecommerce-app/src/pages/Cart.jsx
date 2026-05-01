import { Link } from 'react-router-dom'

function Cart({ cart, removeFromCart, updateQuantity }) {
  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-quantity">
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
        <Link to="/products" className="continue-shopping-link">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Cart
