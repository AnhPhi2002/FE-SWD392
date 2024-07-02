import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="shadow-lg min-w-[300px] px-8 pb-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
