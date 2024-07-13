import { useEffect } from 'react';
import { UserList, columns } from './table/columns';
import { DataTable } from './table/data-table';
import { sendHttp } from '@/utils/send-http';
import { userAPI } from '@/lib/api/user-api';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { userActions } from '@/lib/api/redux/userSlice';

function CustomerManager() {
  const dispatch = useAppDispatch();
  const dataTable = useAppSelector((state) => state.user.listUser);
  async function fetchDataTable() {
    const res = await sendHttp(userAPI.getAllUsersApi, {}, '', { success: 'Get data success', error: 'Get data failed' });
    const data = res.data.map(({ user_id, address, avatar_url, birthday, full_name, gender, phone, role }: UserList) => ({
      user_id,
      address,
      avatar_url,
      birthday,
      full_name,
      gender,
      role,
      phone
    }));
    dispatch(userActions.setListUser(data));
  }
  useEffect(() => {
    fetchDataTable();
  }, []);
  return (
    <div className="mt-[10%] bg-white px-6 py-4">
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}

export default CustomerManager;
