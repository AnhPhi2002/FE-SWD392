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
import TrackingPage from './pages/profile/tracking/index.tsx';
import BlogPage from './pages/blog/index.tsx';
import ForgetPassword from './pages/forget-password/index.tsx';
import Register from './pages/register/index.tsx';
import { Toaster } from 'sonner';
import Cart from './pages/cart/index.tsx';
import AfterPayment from './pages/after-payment/index.tsx';
import PaymentPage from './pages/paypal/index.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { Roles } from './lib/roles.ts';
import CustomerManager from './layout/dashboard/customer/index.tsx';
import OrderManager from './layout/dashboard/order/index.tsx';
import DashboardLayoutStaff from './layout/dashboard-staff/index.tsx';
import ArticleManager from './layout/dashboard-staff/artical/index.tsx';
import CategoryManager from './layout/dashboard-staff/category/indext.tsx';
import ProductManager from './layout/dashboard-staff/Product/index.tsx';
import ReviewManager from './layout/dashboard-staff/review/index.tsx';
import VoucherManager from './layout/dashboard-staff/voucher/index.tsx';
import TawkToChat from './components/TawkToChat.tsx';
import BlogDetail from './pages/blog-detail/index.tsx';
import RevenueStatistics from './layout/dashboard/revenue-statistics/index.tsx';
import ProductStatisticsPage from './layout/dashboard/product-statistics/index.tsx';
import OrderStatusCountsPage from './layout/dashboard/order-status-counts/index.tsx';
import TopSellingProductsPage from './layout/dashboard/top-selling-products/index.tsx';
import CustomerStatisticsPage from './layout/dashboard/customer-statistics/index.tsx';
import RevenueByPaymentMethodPage from './layout/dashboard/revenue-by-payment-method/index.tsx';
import DashboardMain from './layout/dashboard/dashboard-main/index.tsx';

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
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <CheckOut />
      },
      {
        path: 'payment/:order_id',
        element: <PaymentPage />
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
      {
        path: 'after-payment',
        element: <AfterPayment />
      },
      {
        path: 'tracking',
        element: <TrackingPage />
      },
      {
        path: 'blog',
        element: <BlogPage />
      },
      {
        path: 'blog-detail/:blogId',
        element: <BlogDetail />
      }
    ]
  },

  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },

  // {
  //   path: '/dashboard',
  //   element: <DashboardLayout />
  // },
  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={[Roles.Admin]}>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/admin/dashboard',
        element: <DashboardMain />
      },
      {
        path: '/admin/customer',
        element: <CustomerManager />
      },  
      // {
      //   path: '/admin/order',
      //   element: <OrderManager />
      // },
      // {
      //   path: '/admin/voucher',
      //   element: <VoucherManager />
      // },    {
      //   path: '/admin/artical',
      //   element: <ArticleManager />
      // }, 
      //   {
      //   path: '/admin/categories',
      //   element: <CategoryManager />
      // },  
      //   {
      //   path: '/admin/product',
      //   element: <ProductManager />
      // },
      // {
      //   path: '/admin/reviews',
      //   element: <ReviewManager />
      // },
      {
        path: '/admin/revenuestatistics',
        element: <RevenueStatistics/>
      },
      {
        path: '/admin/productstatistics',
        element: <ProductStatisticsPage/>
      },
      {
        path: '/admin/orderstatuscounts',
        element: <OrderStatusCountsPage/>
      },
      {
        path: '/admin/topsellingproducts',
        element: <TopSellingProductsPage/>
      },
      {
        path: '/admin/customerstatistics',
        element: <CustomerStatisticsPage/>
      },
      {
        path: '/admin/revenuebypaymentmethod',
        element: <RevenueByPaymentMethodPage/>
      }
    ]
  },
  {
    path: '/staff',
    element: (
      <ProtectedRoute roles={[Roles.Staff]}>
        <DashboardLayoutStaff>
          <Outlet />
        </DashboardLayoutStaff>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/staff/dashboard',
        element: <DashboardMain />
      },
      {
        path: '/staff/customer',
        element: <CustomerManager />
      },  
      {
        path: '/staff/order',
        element: <OrderManager />
      },
      {
        path: '/staff/voucher',
        element: <VoucherManager />
      },    {
        path: '/staff/artical',
        element: <ArticleManager />
      }, 
        {
        path: '/staff/categories',
        element: <CategoryManager />
      },  
        {
        path: '/staff/product',
        element: <ProductManager />
      },
      {
        path: '/staff/reviews',
        element: <ReviewManager />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer autoClose={3000} />
        <Toaster closeButton position="top-right" richColors duration={1000} />
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
