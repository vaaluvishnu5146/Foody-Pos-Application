import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/styles.css';
import ProductContextProvider from './Contexts/Product.context.jsx';
import CartContextProvider from './Contexts/Cart.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductContextProvider>
    <CartContextProvider>
      <Router>
        <App />
      </Router>
    </CartContextProvider>
  </ProductContextProvider>
)
