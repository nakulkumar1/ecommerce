import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'

function Products({ addToCart }) {
  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default Products
