import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '@/schema/auth';
import { toast } from 'sonner';
import { authAPI } from '@/lib/api/auth-api';
function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      phone: ''
    }
  });

  const navigate = useNavigate(); //

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const resData = await authAPI.register(values);
      if (resData.data) {
        form.reset();
        toast.success('Register success');

        navigate('/auth'); //
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <h1 className="text-2xl text-black font-bold h-[20vh] flex justify-center items-center">Register</h1>
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="active:outline-none focus-visible:ring-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button className="bg-black text-white mt-4 w-full py-2">Register</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="../" className="text-sm  font-medium text-gray-600">
            Already have an account? Log in
          </Link>
        </div>
      </Form>
    </>
  );
}

export default Register;
