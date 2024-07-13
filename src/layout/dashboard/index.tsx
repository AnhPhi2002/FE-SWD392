// DashboardLayout.tsx
import { Children, useState } from 'react';
import { LogOut, ShoppingBag } from 'lucide-react';
import Chat from './StaffChat/Chat';
import CustomerManager from './customer';
import VoucherManager from './voucher';
import ArticleManager from './artical';
import CategoryManager from './category/indext';
import ProductManager from './Product';
import ReviewManager from './review';
import OrderManager from './order';
import { Link, useNavigate } from 'react-router-dom';

const sidebarItems = [
  { icon: <ShoppingBag />, title: 'Dashboard', href: '/admin/dashboard' },
  { icon: <ShoppingBag />, title: 'Order', href: '/admin/order' },
  { icon: <ShoppingBag />, title: 'Customer', href: '/admin/customer' },
  { icon: <ShoppingBag />, title: 'Voucher', href: '/admin/voucher' },
  { icon: <ShoppingBag />, title: 'Artical', href: '/admin/artical' },
  { icon: <ShoppingBag />, title: 'Categories', href: '/admin/categories' },
  { icon: <ShoppingBag />, title: 'Products', href: '/admin/product' },
  { icon: <ShoppingBag />, title: 'Reviews', href: '/admin/reviews' }
];

function DashboardLayout({ children }: any) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('Dashboard');

  function handleClickSidebar(title: string) {
    setSelected(title);
  }
  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  return (
    <div className="flex h-screen">
      <aside className="w-1/4 px-8 bg-white ">
        <h1 className="text-2xl font-semibold my-8 text-center">Dashboard</h1>
        {sidebarItems.map(({ icon, title, href }, index) => (
          <Link  key={index} to={href}>
            <div
             
              className={`flex gap-4 px-4 py-3 items-center cursor-pointer ${title === selected ? 'bg-[#f6f6f6] text-[#517adb]' : 'text-[#5C5F6A]'}`}
              onClick={() => handleClickSidebar(title)}
            >
              {icon}
              <p className="text-lg font-medium">{title}</p>
            </div>
          </Link>
        ))}
      </aside>
      <div className="flex-grow p-4 bg-[#F5F5F5] px-8">
        <LogOut
          className="mt-5 float-right"
          onClick={() => {
            logout();
          }}
        />

        {/* {selected === 'Customer' && <CustomerManager />}
        {selected === 'Voucher' && <VoucherManager />}
        {selected === 'Artical' && <ArticleManager />}
        {selected === 'Categories' && <CategoryManager />}
        {selected === 'Products' && <ProductManager />}
        {selected === 'Reviews' && <ReviewManager />}
        {selected === 'Order' && <OrderManager />} */}
        {children}
      </div>
      <Chat isStaff={true} />
    </div>
  );
}

export default DashboardLayout;
