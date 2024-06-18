import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { forgetPasswordSchema } from '@/schema/auth';
function ForgetPassword() {
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: ''
    }
  });
  async function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    console.log(values);
  }
  return (
    <>
      <h1 className="text-2xl text-black font-bold h-[20vh] flex justify-center items-center">Forget Password</h1>
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
          <button className="bg-black text-white mt-4 w-full py-2">Send reset link</button>
        </form>
      </Form>
    </>
  );
}

export default ForgetPassword;
