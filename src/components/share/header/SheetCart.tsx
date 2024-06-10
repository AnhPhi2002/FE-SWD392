
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import Iconography from '@/components/icons/Iconography';

// Define the CartItem and SheetCartProps interfaces
interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface SheetCartProps {
  items: CartItem[];
}

// Define the SheetCart component
export function SheetCart({ items }: SheetCartProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Iconography icon="cart" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img src={item.imageUrl} className="w-16 h-16"/>
              <div className="flex-grow">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500">{item.size}</div>
                <div className="flex items-center mt-2 ">
                  <Button variant="outline" size="sm">-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button variant="outline" size="sm">+</Button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>  
        <SheetFooter className="pt-5">
          <SheetClose asChild>
            <Button className="w-full">Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}



