import Input from "./components/Input";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="shadow-lg min-w-[300px] px-8 pb-8">
        <h1 className="text-2xl text-black font-bold h-[20vh] flex justify-center items-center">
          Admin
        </h1>
        <div className="space-y-4">
          <Input label="Email" id="email" type="email" />
          <Input label="Password" id="password" type="password" />
        </div>
        <button className="bg-black text-white mt-8 w-full py-2">Login</button>
      </div>
    </div>
  );
};

export default Login;
