import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import { formatBRL } from '../utils/format'

function ProductCard({ product }) {
  const dispatch = useDispatch()

  return (
    <article className="card">
      <div className="card__window">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="card__plate">
        <span className="card__id">Nº {String(product.id).padStart(3, '0')}</span>
        <span className={`card__rarity card__rarity--${product.rarity.toLowerCase()}`}>
          {product.rarity}
        </span>
      </div>

      <h3 className="card__name">{product.name}</h3>

      <div className="card__footer">
        <span className="card__price">{formatBRL(product.price)}</span>
        <button
          type="button"
          className="card__button"
          onClick={() => dispatch(addItem(product))}
        >
          Guardar no cofre
        </button>
      </div>
    </article>
  )
}

export default ProductCard
