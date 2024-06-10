interface SidebarItemProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  active: boolean;
  icon: React.ReactNode;
}

const SidebarItem = ({ name, icon, active, ...props }: SidebarItemProps) => {
  return (
    <div
      className={`flex gap-4 items-center px-6 rounded-lg py-4 cursor-pointer ${
        active ? "bg-[#f6f6f6] text-black" : "text-gray-500"
      }`}
      {...props}
    >
      {icon}
      <h2 className="text-xl font-semibold">{name}</h2>
    </div>
  );
};

export default SidebarItem;
