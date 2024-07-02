import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from '@/schema/auth';
import { authAPI } from '@/lib/api/auth-api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

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
      const res = await authAPI.login(values);
      localStorage.setItem('accessToken', res.data.token);
      toast.success('Login successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <h1 className="text-2xl text-black font-bold h-[20vh] flex justify-center items-center">Login</h1>
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
          </div>
          <div className="text-right mt-4">
            <Link to="/forget-password" className="text-sm font-medium text-gray-600">
              Forgot Password?
            </Link>
          </div>
          <button className="bg-black text-white mt-4 w-full py-2">Login</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-sm  font-medium text-gray-600">
            Don't have an account? Sign up
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
