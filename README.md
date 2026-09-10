# Cofre Nerd 🔒

E-commerce de cartas Pokémon (dados reais da [PokeAPI](https://pokeapi.co)), feito em React + Axios + Redux Toolkit.

## Rodando o projeto

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Onde cada requisito da atividade está

| Requisito | Arquivo |
|---|---|
| `axios.get()` buscando produtos, sem `fetch` | `src/pages/Store.jsx` |
| `try/catch/finally` + estados `loading`/`error` | `src/pages/Store.jsx` |
| `configureStore` | `src/store/store.js` |
| `createSlice` com `addItem` e `clearCart` (+ `removeItem` extra) | `src/store/cartSlice.js` |
| `useSelector` lendo quantidade/total sem prop drilling | `src/components/Header.jsx`, `src/pages/CartPage.jsx` |
| `useDispatch` nos botões de compra | `src/components/ProductCard.jsx` |

## Como os "produtos" são montados

A `Store.jsx` busca a lista de Pokémon na PokeAPI e, para cada um, busca os detalhes
(imagem oficial e status base). A soma dos status vira o preço da carta e define a
raridade (Comum → Lendária), só para dar um verniz de e-commerce de colecionáveis
em cima de dados reais.
