interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  id: string;
  label: string;
}
const Input = ({ id, label, ...props }: InputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-gray-500 block text-lg font-normal">
        {label}
      </label>
      <input
        {...props}
        id={id}
        className="border-2 outline-none border-gray-500 px-4 py-2 rounded-md w-full"
        required
      />
    </div>
  );
};

export default Input;
