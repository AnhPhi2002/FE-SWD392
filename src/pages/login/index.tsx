import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from '@/schema/login';
import { loginApi } from '@/lib/api/login-api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await loginApi(values);
      localStorage.setItem('accessToken', res.data.token);
      toast.success('Login successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {
      toast.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="shadow-lg min-w-[300px] px-8 pb-8">
        <h1 className="text-2xl text-black font-bold h-[20vh] flex justify-center items-center">Admin</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="active:outline-none focus-visible:ring-0" />
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
            <button className="bg-black text-white mt-8 w-full py-2">Login</button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
