import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
interface InputProps {
  form: any;
  type: string;
  label: string;
  name: string;
}
const InputCustome = ({ form, type, label, name }: InputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} className="active:outline-none focus-visible:ring-0" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputCustome;
