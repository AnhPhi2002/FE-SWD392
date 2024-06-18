import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
const sidebarItems = [
  { icon: <ShoppingBag />, title: 'Dashboard' },
  { icon: <ShoppingBag />, title: 'Order' },
  { icon: <ShoppingBag />, title: 'Customer' },
  { icon: <ShoppingBag />, title: 'Reviews' }
];
function DashboardLayout() {
  const [selected, setSelected] = useState('Dashboard');
  function handleClickSidebar(title: string) {
    setSelected(title);
  }
  return (
    <div className="flex">
      <aside className="w-1/4 px-8">
        <h1 className="text-2xl font-semibold my-8 text-center ">Dashboard</h1>
        {sidebarItems.map(({ icon, title }, index) => (
          <div
            key={index}
            className={`flex gap-4 px-4 py-3 items-center ${title === selected ? 'bg-[#f6f6f6] text-[#0E1422]' : 'text-[#5C5F6A]'} `}
            onClick={() => {
              handleClickSidebar(title);
            }}
          >
            {icon}
            <p className="text-lg font-medium">{title}</p>
          </div>
        ))}
      </aside>
      <div className="w-3/4">{selected}</div>
    </div>
  );
}

export default DashboardLayout;
