import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { ChangeRoleType } from './columns';
import ChangeRole from '../change-role';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { sendHttp } from '@/utils/send-http';
import { userAPI } from '@/lib/api/user-api';
import { useAppDispatch } from '@/hooks/useRedux';
import { userActions } from '@/lib/api/redux/userSlice';

const TableActions = (user: ChangeRoleType) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const modalElement = document.getElementById('modal');
  async function handleDeleteUser() {
    const res = await sendHttp(userAPI.deleteUserApi, user.user_id, '', { success: 'Delete user successfully', error: 'Delete user failed' });
    if (res) {
      dispatch(userActions.deleteUser(user.user_id));
      setOpenMenu(false);
    }
  }
  useEffect(() => {
    return () => {
      document.body.removeAttribute('style');
    };
  }, [open]);
  return (
    <>
      <DropdownMenu onOpenChange={setOpenMenu} open={openMenu}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Change Role
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              handleDeleteUser();
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {modalElement && createPortal(<ChangeRole {...user} open={open} setOpen={setOpen} />, modalElement)}
    </>
  );
};

export default TableActions;
