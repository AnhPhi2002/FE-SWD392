import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '../Button';
import { Input } from '@/components/ui/input';
const AccountDetail = () => {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Input />
      <Input />
      <Button>Save Changes</Button>
    </>
  );
};

export default AccountDetail;
