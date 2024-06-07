import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';



export default function UserNav() {

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-4 cursor-pointer">
            <Avatar className="h-7 w-7">
              <AvatarImage src= {'https://avatar.iran.liara.run/public/boy?username=FAMS'} alt="@fams" />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            {/* <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
              </p>
              <p className="text-xs leading-none text-muted-foreground"> </p>
            </div> */}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem  className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
