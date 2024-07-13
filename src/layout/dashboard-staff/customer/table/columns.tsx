'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ColumnDef } from '@tanstack/react-table';
import TableActions from './table-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserList = {
  user_id: number;
  address: string;
  phone: string;
  gender: string;
  full_name: string;
  birthday: string;
  role: 'user' | 'admin' | 'staff';
  avatar_url: string;
};
export interface ChangeRoleType {
  user_id: number;
  role: 'user' | 'admin' | 'staff';
}
export const columns: ColumnDef<UserList>[] = [
  {
    accessorKey: 'avartar',
    header: 'Avatar',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar>
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    }
  },
  {
    accessorKey: 'full_name',
    header: 'FullName',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    accessorKey: 'birthday',
    header: 'Birthday',
    cell: ({ row }) => {
      const user = row.original;
      return new Date(user.birthday).toLocaleDateString();
    }
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return <TableActions user_id={user.user_id} role={user.role} />;
    }
  }
];
