import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { sidebarItem } from "./data";
import MyOrders from "./my-order";

import AccountDetail from "./account-detail";
import { useNavigate } from "react-router-dom";
import TrackingPage from "./tracking";


const Profile = () => {
  const [currentTabs, setCurrentTabs] = useState('Orders');
  function handleClickTab(name: string) {
    setCurrentTabs(name);
  }

  return (
    <>
      <h1 className="text-black text-2xl font-semibold h-[20vh] px-[12%] py-8 bg-[#f6f6f6]">My Account</h1>
      <div className="px-[12%] py-10 h-[100vh] flex">
        <aside className="w-1/3 border-r-2 pt-[6%] pr-8 border-[#f6f6f6]">
          {sidebarItem.map((item, index) => (
            <SidebarItem key={index} {...item} active={currentTabs == item.name} onClick={() => handleClickTab(item.name)} />
          ))}
        </aside>
        <div className="pl-8 pt-4 w-2/3">
          <h2 className="text-xl font-semibold">{currentTabs}</h2>
          <div className="space-y-6 mt-10 h-[70%] overflow-y-scroll scrollbar pr-5">
            {currentTabs === "Orders" && <MyOrders />}  
          
            {currentTabs === "Account Detail" && <AccountDetail />}
            {currentTabs === "Tracking" && <TrackingPage/>} 
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
