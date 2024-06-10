import Input from "@/pages/login/components/Input";
import Button from "../Button";

const Password = () => {
  return (
    <>
      <Input label="New Password" id="new-password" type="password" />
      <Input label="Confirm Password" id="confirm-password" type="password" />
      <Button>Save Changes</Button>
    </>
  );
};

export default Password;
