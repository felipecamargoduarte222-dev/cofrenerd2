import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  clearCart,
  removeItem,
  selectCartItems,
  selectCartTotal,
} from '../store/cartSlice'
import { formatBRL } from '../utils/format'

function CartPage() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const dispatch = useDispatch()

  if (items.length === 0) {
    return (
      <div className="state">
        <p>O cofre está vazio por enquanto.</p>
        <Link to="/" className="link-button">
          Ver coleção
        </Link>
      </div>
    )
  }

  return (
    <section>
      <div className="section-heading">
        <h1>Seu cofre</h1>
        <p>Confira o que você separou antes de fechar a porta.</p>
      </div>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <img src={item.image} alt={item.name} />
            <div className="cart-row__info">
              <span className="cart-row__name">{item.name}</span>
              <span className="cart-row__qty">Quantidade: {item.quantity}</span>
            </div>
            <span className="cart-row__price">
              {formatBRL(item.price * item.quantity)}
            </span>
            <button
              type="button"
              className="cart-row__remove"
              onClick={() => dispatch(removeItem(item.id))}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <span>Total</span>
        <strong>{formatBRL(total)}</strong>
      </div>

      <button type="button" className="card__button" onClick={() => dispatch(clearCart())}>
        Esvaziar cofre
      </button>
    </section>
  )
}

export default CartPage
