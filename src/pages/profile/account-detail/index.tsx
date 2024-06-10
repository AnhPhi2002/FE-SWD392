import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Input from "@/pages/login/components/Input";
import Button from "../Button";
const AccountDetail = () => {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Input label="Full Name" id="full-name" />
      <Input label="Email" id="email" />
      <Button>Save Changes</Button>
    </>
  );
};

export default AccountDetail;
