import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Profile from './pages/profile';
import Layout from './layout';
import ProductDetail from './pages/product-detail';
import { Toaster } from 'sonner';
import ProductListings from './pages/product-list';
import Cart from './pages/cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product-detail/:productId" element={<ProductDetail />} />
            <Route path="/product-listing" element={<ProductListings />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster position="top-right" closeButton duration={1000} richColors />
      </Router>
    </CartProvider>
  );
}

export default App;
