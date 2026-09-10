import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

// Transforma o "poder" total do Pokémon numa raridade de carta colecionável
function getRarity(statTotal) {
  if (statTotal >= 480) return 'Lendária'
  if (statTotal >= 400) return 'Rara'
  if (statTotal >= 320) return 'Incomum'
  return 'Comum'
}

function Store() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchProducts() {
      setLoading(true)
      setError(null)

      try {
        // 1. Busca a lista inicial de cartas (nome + link de detalhe)
        const listResponse = await axios.get(`${POKEAPI_BASE}/pokemon`, {
          params: { limit: 21, offset: 0 },
        })

        // 2. Busca os detalhes de cada carta em paralelo (imagem + status)
        const detailRequests = listResponse.data.results.map((pokemon) =>
          axios.get(pokemon.url)
        )
        const detailResponses = await Promise.all(detailRequests)

        const items = detailResponses.map(({ data }) => {
          const statTotal = data.stats.reduce((sum, stat) => sum + stat.base_stat, 0)

          return {
            id: data.id,
            name: data.name.replace(/^\w/, (letter) => letter.toUpperCase()),
            image:
              data.sprites.other?.['official-artwork']?.front_default ||
              data.sprites.front_default,
            price: Math.round(20 + statTotal / 4),
            rarity: getRarity(statTotal),
          }
        })

        if (isMounted) {
          setProducts(items.sort((a, b) => a.id - b.id))
        }
      } catch (err) {
        if (isMounted) {
          setError('Não foi possível abrir o cofre agora. Tente novamente em instantes.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="state state--loading">
        <span className="state__dial" aria-hidden="true" />
        <p>Destravando o cofre...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state state--error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section>
      <div className="section-heading">
        <h1>Coleção da semana</h1>
        <p>Cartas Pokémon avaliadas e prontas para entrar no seu cofre pessoal.</p>
      </div>

      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Store
