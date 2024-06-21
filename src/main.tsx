import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './lib/api/redux/store.ts';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/index.tsx';

import ErrorPage from './pages/error-page/index.tsx';
import CheckOut from './pages/checkout/index.tsx';
import Login from './pages/login/index.tsx';
import Profile from './pages/profile/index.tsx';
import AuthLayout from './layout/auth/index.tsx';
import AboutPage from './pages/about/index.tsx';
import ContactPage from './pages/contact/index.tsx';
import ProductDetail from './pages/product-detail/index.tsx';
import DashboardLayout from './layout/dashboard/index.tsx';
import { CartProvider } from './context/CartContext.tsx';

import HomePage from './pages/home/index.tsx';
import ProductListings from './pages/product-list/index.tsx';
import TrackingPage from './pages/tracking/index.tsx';
import BlogPage from './pages/blog/index.tsx';
import ForgetPassword from './pages/forget-password/index.tsx';
import Register from './pages/register/index.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'checkout',
        element: <CheckOut />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'product-listing',
        element: <ProductListings />
      },
      {
        path: 'product-detail/:productId',
        element: <ProductDetail />
      },
      // {
      //   path: 'after-payment',
      //   element: <AfterPayment />
      // }, 
      {
        path: 'tracking',
        element: <TrackingPage />
      },
      {
        path: 'blog',
        element: <BlogPage />
      },
      
    ]
  },
  {
    path: 'auth',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  
  },
  {
    path: 'forget-password',
    element: <ForgetPassword />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: (<DashboardLayout />

    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
