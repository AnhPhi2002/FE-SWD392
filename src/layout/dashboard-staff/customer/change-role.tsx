import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { sendHttp } from '@/utils/send-http';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '@/hooks/useRedux';
import { userActions } from '@/lib/api/redux/userSlice';
import { userAPI } from '@/lib/api/user-api';
import { roleSchema } from '@/schema/auth';
import { toast } from 'sonner';
import { ChangeRoleType } from './table/columns';
interface ChangeRoleProps extends ChangeRoleType {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const ROLE = ['admin', 'user', 'staff'] as const;
const ChangeRole = ({ user_id, role, open, setOpen }: ChangeRoleProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: role
    }
  });
  const handleCloseModal = () => {
    setOpen(false);
  };
  async function onSubmit(values: z.infer<typeof roleSchema>) {
    toast.message(JSON.stringify({ ...values, user_id }));
    const data = { ...values, user_id };
    const res = await sendHttp(userAPI.updateRoleApi, data, '', { success: 'Change role successfully', error: 'Change role failed' });
    console.log(res);
    if (res) {
      dispatch(userActions.updateRole(data));
      handleCloseModal();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ROLE.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseModal();
                  }}
                  className="border mt-2 border-black px-4 py-2 h-10 font-medium rounded-lg"
                >
                  Close
                </button>
                <Button type="submit" className="mt-2">
                  Change
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
