import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { sidebarItem } from "./data";
import MyOrders from "./my-order";
import Wishlist from "./wishlist";
import Address from "./address";
import Password from "./password";
import AccountDetail from "./account-detail";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [currentTabs, setCurrentTabs] = useState("Orders");
  function handleClickTab(name: string) {
    setCurrentTabs(name);
  }

  const items = [1, 2, 3, 4, 6, 7];
  return (
    <>
      <h1 className="text-black text-2xl font-semibold h-[20vh] px-[12%] py-8 bg-[#f6f6f6]">
        My Account
      </h1>
      <div className="px-[12%] py-10 h-[100vh] flex">
        <aside className="w-1/3 border-r-2 pt-[6%] pr-8 border-[#f6f6f6]">
          {sidebarItem.map((item, index) => (
            <SidebarItem
              key={index}
              {...item}
              active={currentTabs == item.name}
              onClick={() => handleClickTab(item.name)}
            />
          ))}
        </aside>
        <div className="pl-8 pt-4 w-2/3">
          <h2 className="text-xl font-semibold">{currentTabs}</h2>
          <div className="space-y-6 mt-10 h-[70%] overflow-y-scroll scrollbar pr-5">
            {currentTabs === "Orders" &&
              items.map((item, index) => <MyOrders key={index} />)}
            {currentTabs === "Wishlist" &&
              items.map((item, index) => <Wishlist key={index} />)}
            {currentTabs === "Address" && <Address />}
            {currentTabs === "Passowrd" && <Password />}
            {currentTabs === "Account Detail" && <AccountDetail />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
