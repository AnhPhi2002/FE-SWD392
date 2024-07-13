import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '../Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { updateAccount } from '@/schema/auth';
import InputCustome from '../Input';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useEffect } from 'react';
import { userAPI } from '@/lib/api/user-api';
import { useAppDispatch } from '@/hooks/useRedux';
import { userActions } from '@/lib/api/redux/userSlice';
const AccountDetail = () => {
  const dispatch = useAppDispatch()
  const { handleFileInputClick, avatarUrl, setAvatarUrl } = useUploadImage();
  const form = useForm<z.infer<typeof updateAccount>>({
    resolver: zodResolver(updateAccount),
    defaultValues: {
      phone: '',
      full_name: '',
      address: '',
      gender: 'male',
      birthday: new Date()
    }
  });

  async function onSubmit(values: z.infer<typeof updateAccount>) {
    const data = { ...values, avatar_url: avatarUrl, birthday: values.birthday.toISOString() };
    dispatch(userActions.setCurrentUser(data));
    try {
      const resData = await userAPI.updateUserApi(data);
      if (resData.status === 200) {
        toast.success('Update success');
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  async function getUser() {
    try {
      const resData = await userAPI.getUserApi();
      dispatch(userActions.setCurrentUser(resData.data));
      if (resData.status === 200) {
        form.setValue('phone', resData.data.phone);
        form.setValue('full_name', resData.data.full_name);
        form.setValue('address', resData.data.address);
        form.setValue('gender', resData.data.gender);
        form.setValue('birthday', new Date(resData.data.birthday));
        setAvatarUrl(resData.data.avatar_url);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Avatar>
        <AvatarImage
          className="w-20 h-20"
          src={avatarUrl}
          onClick={() => {
            handleFileInputClick();
          }}
        />
        <AvatarFallback
          onClick={() => {
            handleFileInputClick();
          }}
        >
          CN
        </AvatarFallback>
      </Avatar>
      <div className="px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8">
              <InputCustome label="Phone" name="phone" type="number" form={form} />
              <InputCustome label="FullName" name="full_name" type="text" form={form} />
              <InputCustome label="Address" name="address" type="text" form={form} />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => {
                  console.log(field.value);
                  return (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="block px-4 py-2 text-base border rounded-md border-gray-400">
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <Button>Save Changes</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AccountDetail;
