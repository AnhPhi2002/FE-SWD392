import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '@/lib/api/user-api';
import { userActions } from '@/lib/api/redux/userSlice';


export default function UserNav() {
  const token = localStorage.getItem('accessToken');
  const users = useAppSelector((store) => store.user.currentUser);
  const dispatch = useAppDispatch()
  
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleAvatarClick = () => {
    if (!token) {
      navigate('/auth');
    }
  };
  const getUser = async () => {
    const resData = await userAPI.getUserApi();
    dispatch(userActions.setCurrentUser(resData.data));
  };
  useEffect(() => {
    getUser();
  }, [])
  
  return (
    <div className="pl-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-4 cursor-pointer" onClick={handleAvatarClick}>
            <Avatar className="h-7 w-7">
            
              <AvatarImage src={users?.avatar_url ? users.avatar_url : 'https://avatar.iran.liara.run/public/boy?username=FAMS'} alt="@fams" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        {token && (
          <DropdownMenuContent className="w-10" align="end" forceMount>
            <DropdownMenuSeparator />
            <Link to="/profile">
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        )}
        {!token && (
          <DropdownMenuContent className="w-10" align="end" forceMount>
            <DropdownMenuSeparator />
            <Link to="/auth">
              <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
            </Link>
  
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
