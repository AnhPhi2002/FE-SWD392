import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';

export default function UserNav() {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="pl-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-4 cursor-pointer">
            <Avatar className="h-7 w-7">
              <AvatarImage src={'https://avatar.iran.liara.run/public/boy?username=FAMS'} alt="@fams" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-10" align="end" forceMount>
          <DropdownMenuSeparator />
          <Link to="/profile">
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          {token ? (
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>Logout</DropdownMenuItem>
          ) : (
            <Link to="/auth">
              <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
