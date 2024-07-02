import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userAPI } from '@/lib/api/user-api';
import { sendHttp } from '@/utils/send-http';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { resetPasswordSchema } from '@/schema/auth';
import { Link, useNavigate } from 'react-router-dom';
function ResetPassword() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: '',
      password: ''
    }
  });
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const res = await sendHttp(userAPI.resetPasswordApi, { password: values.password }, values.otp, { success: 'Password reset successfully', error: 'Error resetting password' });
    if (res) navigate('/auth');
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Otp</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="active:outline-none focus-visible:ring-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="active:outline-none focus-visible:ring-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button className="bg-black text-white mt-4 w-full py-2">Reset Password</button>
        <div className="text-right mt-2">
          <Link to="/auth/forget-password" className="text-sm font-medium text-gray-600">
            Send OTP
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default ResetPassword;
