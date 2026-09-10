import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount, selectCartTotal } from '../store/cartSlice'
import { formatBRL } from '../utils/format'

function Header() {
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)

  return (
    <header className="vault-header">
      <Link to="/" className="vault-header__brand">
        <span className="vault-header__dial" aria-hidden="true" />
        <span>
          Cofre <strong>Nerd</strong>
        </span>
      </Link>

      <Link to="/carrinho" className="vault-header__cart">
        <span className="vault-header__cart-label">Carrinho</span>
        <span className="vault-header__cart-count">{count}</span>
        <span className="vault-header__cart-total">{formatBRL(total)}</span>
      </Link>
    </header>
  )
}

export default Header
