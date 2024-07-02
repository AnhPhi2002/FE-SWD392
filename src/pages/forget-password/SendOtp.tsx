import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userAPI } from '@/lib/api/user-api';
import { sendHttp } from '@/utils/send-http';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { sendOtp } from '@/schema/auth';
import { useNavigate } from 'react-router-dom';
function SendOtp() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof sendOtp>>({
    resolver: zodResolver(sendOtp),
    defaultValues: {
      email: ''
    }
  });
  async function onSubmit(values: z.infer<typeof sendOtp>) {
    const res = await sendHttp(userAPI.forgetPasswordApi, { email: values.email }, '', { success: 'Otp sent to your email', error: 'Error sending otp' });
    if (res) navigate('/auth/forget-password?mode=reset');
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="active:outline-none focus-visible:ring-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button className="bg-black text-white mt-4 w-full py-2"> Send reset link</button>
      </form>
    </Form>
  );
}

export default SendOtp;
