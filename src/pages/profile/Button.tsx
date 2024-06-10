const Button = ({ children }: any) => {
  return (
    <button className="bg-black text-white px-6 rounded-lg py-2">
      {children}
    </button>
  );
};

export default Button;
