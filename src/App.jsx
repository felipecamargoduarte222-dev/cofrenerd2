import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Store from './pages/Store'
import CartPage from './pages/CartPage'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/carrinho" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
