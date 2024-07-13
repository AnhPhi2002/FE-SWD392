import { userActions } from '@/lib/api/redux/userSlice';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '@/lib/api/user-api';

type ProtectedRouteProps = {
  roles: string[];
  children: ReactNode;
};
const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await userAPI.getUserApi();
        dispatch(userActions.setListUser(data));
        if (!(data && roles.includes(data?.role))) {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    };
    fetchData();
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
