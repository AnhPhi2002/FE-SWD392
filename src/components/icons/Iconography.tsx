import AddIcon from "@/assets/icons/Iconography/AddIcon";
import AddToCartIcon from "@/assets/icons/Iconography/AddToCartIcon";
import ArrowLeftIcon from "@/assets/icons/Iconography/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/icons/Iconography/ArrowRightIcon";
import ArrowUpIcon from "@/assets/icons/Iconography/ArrowUpIcon";
import CartIcon from "@/assets/icons/Iconography/CartIcon";
import CheckIcon from "@/assets/icons/Iconography/CheckIcon";
import ChevronDownIcon from "@/assets/icons/Iconography/ChevronDownIcon";
import ChevronLeftIcon from "@/assets/icons/Iconography/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/Iconography/ChevronRightIcon";
import CopyIcon from "@/assets/icons/Iconography/CopyIcon";
import DashboardIcon from "@/assets/icons/Iconography/DashboardIcon";
import EmptyStarIcon from "@/assets/icons/Iconography/EmptyStarIcon";
import HeartIcon from "@/assets/icons/Iconography/HeartIcon";
import HomeIcon from "@/assets/icons/Iconography/HomeIcon";
import InfoIcon from "@/assets/icons/Iconography/InfoIcon";
import KeyIcon from "@/assets/icons/Iconography/KeyIcon";
import LogoutIcon from "@/assets/icons/Iconography/LogoutIcon";
import MenuIcon from "@/assets/icons/Iconography/MenuIcon";
import MinusIcon from "@/assets/icons/Iconography/MinusIcon";
import MoreIcon from "@/assets/icons/Iconography/MoreIcon";
import ProductIcon from "@/assets/icons/Iconography/ProductIcon";
import SearchIcon from "@/assets/icons/Iconography/SearchIcon";
import SettingsIcon from "@/assets/icons/Iconography/SettingsIcon";
import ShareIcon from "@/assets/icons/Iconography/ShareIcon";
import ShieldCheckIcon from "@/assets/icons/Iconography/ShieldCheckIcon";
import SortIcon from "@/assets/icons/Iconography/SortIcon";
import StarBadgeIcon from "@/assets/icons/Iconography/StarBadgeIcon";
import StarIcon from "@/assets/icons/Iconography/StarIcon";
import UploadIcon from "@/assets/icons/Iconography/UploadIcon";
import UserIcon from "@/assets/icons/Iconography/UserIcon";
import UserOIcon from "@/assets/icons/Iconography/UserOIcon";
import UsersIcon from "@/assets/icons/Iconography/UsersIcon";
import VectorIcon from "@/assets/icons/Iconography/VectorIcon";
import WarningIcon from "@/assets/icons/Iconography/WarningIcon";
import XIcon from "@/assets/icons/Iconography/XIcon";


type IconographyPropsType = {
  icon:
    | 'search'
    | 'add-to-cart'
    | 'add'
    | 'arrow-left'
    | 'arrow-right'
    | 'arrow-up'
    | 'cart'
    | 'check'
    | 'chevron-down'
    | 'chevron-left'
    | 'chevron-right'
    | 'copy'
    | 'dashboard'
    | 'empty-star'
    | 'heart'
    | 'home'
    | 'info'
    | 'key'
    | 'logout'
    | 'menu'
    | 'minus'
    | 'more'
    | 'product'
    | 'search'
    | 'setting'
    | 'share'
    | 'shield-check'
    | 'sort'
    | 'star-badge'
    | 'star'
    | 'upload'
    | 'user'
    | 'user-o'
    | 'users'
    | 'vector'
    | 'warning'
    | 'x'
 ;
};
const Iconography = ({ icon, ...props }: IconographyPropsType & React.HTMLAttributes<SVGSVGElement>) => {
  switch (icon) {
    case 'search': {
      return <SearchIcon {...props} />;
    }
    case 'add-to-cart': {
      return <AddToCartIcon {...props} />;
    }  
    case 'add': {
      return <AddIcon {...props} />;
    }  
    case 'arrow-left': {
      return <ArrowLeftIcon {...props} />;
    }   
    case 'arrow-right': {
      return <ArrowRightIcon {...props} />;
    }
    case 'arrow-up': {
      return <ArrowUpIcon {...props} />;
    }  
    case 'cart': {
      return <CartIcon {...props} />;
    } 
    case 'check': {
      return <CheckIcon {...props} />;
    } 
    case 'chevron-down': {
      return <ChevronDownIcon {...props} />;
    }
    case 'chevron-left': {
      return <ChevronLeftIcon {...props} />;
    }  
    case 'chevron-right': {
      return <ChevronRightIcon {...props} />;
    }
    case 'copy': {
      return <CopyIcon {...props} />;
    }
    case 'dashboard': {
      return <DashboardIcon {...props} />;
    }
    case 'empty-star': {
      return <EmptyStarIcon {...props} />;
    } 
    case 'heart': {
      return <HeartIcon {...props} />;
    }
    case 'home': {
      return <HomeIcon {...props} />;
    }
    case 'info': {
      return <InfoIcon {...props} />;
    }
    case 'key': {
      return <KeyIcon {...props} />;
    }
    case 'logout': {
      return <LogoutIcon {...props} />;
    }
    case 'menu': {
      return <MenuIcon {...props} />;
    }
    case 'minus': {
      return <MinusIcon {...props} />;
    }
    case 'more': {
      return <MoreIcon {...props} />;
    }
    case 'product': {
      return <ProductIcon {...props} />;
    }
    case 'setting': {
      return <SettingsIcon {...props} />;
    }
    case 'share': {
      return <ShareIcon {...props} />;
    }
    case 'shield-check': {
      return <ShieldCheckIcon {...props} />;
    }
    case 'sort': {
      return <SortIcon {...props} />;
    }
    case 'star-badge': {
      return <StarBadgeIcon {...props} />;
    }
    case 'star': {
      return <StarIcon {...props} />;
    }
    case 'upload': {
      return <UploadIcon {...props} />;
    }
    case 'user': {
      return <UserIcon {...props} />;
    }
    case 'user-o': {
      return <UserOIcon {...props} />;
    }
    case 'users': {
      return <UsersIcon {...props} />;
    }
    case 'vector': {
      return <VectorIcon {...props} />;
    }
    case 'warning': {
      return <WarningIcon {...props} />;
    }
    case 'x': {
      return <XIcon {...props} />;
    }

  }
};

export default Iconography;
