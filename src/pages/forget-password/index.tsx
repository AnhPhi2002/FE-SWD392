import { useSearchParams } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import SendOtp from './SendOtp';

function ForgetPassword() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  return (
    <>
      <h1 className="text-2xl text-black font-bold h-[20vh] flex justify-center items-center">Forget Password</h1>
      {mode === 'reset' ? <ResetPassword /> : <SendOtp />}
    </>
  );
}

export default ForgetPassword;
