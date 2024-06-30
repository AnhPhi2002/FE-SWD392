// DashboardLayout.tsx
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Chat from './StaffChat/Chat';

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
    <div className="flex h-screen">
      <aside className="w-1/4 px-8 bg-white">
        <h1 className="text-2xl font-semibold my-8 text-center">Dashboard</h1>
        {sidebarItems.map(({ icon, title }, index) => (
          <div
            key={index}
            className={`flex gap-4 px-4 py-3 items-center cursor-pointer ${title === selected ? 'bg-[#f6f6f6] text-[#517adb]' : 'text-[#5C5F6A]'}`}
            onClick={() => handleClickSidebar(title)}
          >
            {icon}
            <p className="text-lg font-medium">{title}</p>
          </div>
        ))}
      </aside>
      <div className="flex-grow p-4">
        <div>{selected}</div>
      </div>
      <Chat isStaff={true} />
    </div>
  );
}

export default DashboardLayout;
