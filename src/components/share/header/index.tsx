import DeliveryIcon from "@/assets/icons/Iconography/DeliveryIcon";
import { AvatarLogo } from "./Avatar";
import { InputMenu } from "./InputMenu";
import { Menu } from "./Menu";
import { SheetCart } from "./SheetCart";
import UserNav from "./user-nav";
import TrackingOrderHome from "./TrackingOrderHome";

// Define the cart items
const cartItems = [
  {
    id: 1,
    name: 'Raw Black T-Shirt Lineup',
    size: 'M',
    price: 75.00,
    quantity: 1,
    imageUrl: '',
  },
  {
    id: 2,
    name: 'Essential Neutrals',
    size: 'S',
    price: 22.00,
    quantity: 1,
    imageUrl: '',
  },
];

export default function Header() {
  return (
    <header className="flex bg-white justify-between pl-40 pr-40 py-5 sticky top-0 z-[10]">
      <div className="items-center justify-center flex">
        <AvatarLogo />
      </div>
      <div>
        <Menu />
      </div>
      <div className="flex gap-4 items-center">
        <InputMenu />
        <TrackingOrderHome />
        <SheetCart  />
        <UserNav />
      </div>
    </header>
  );
}
