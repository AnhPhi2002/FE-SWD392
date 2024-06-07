import { AvatarLogo } from "./Avatar";
import { InputMenu } from "./InputMenu";
import { Menu } from "./Menu";
import Unigate from "./unigate";
import UserNav from "./user-nav";

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
        <Unigate />
        <UserNav />
      </div>
    </header>
  );
}
