import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Profile from './pages/profile';
import Layout from './layout';
import ProductDetail from './pages/product-detail';
import { Toaster } from 'sonner';


import Cart from './pages/cart';
import AuthLayout from './layout/auth';
import Register from './pages/register';
import ForgetPassword from './pages/forget-password';
import DashboardLayout from './layout/dashboard';
import CheckOut from './pages/checkout';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>  
        <Route path="/dashboard" element={<DashboardLayout />}></Route>
      </Routes>
      <Toaster position="top-right" closeButton duration={1000} richColors />
    </Router>
  );
}

export default App;
