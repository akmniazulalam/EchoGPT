const Loader = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center bg-white dark:bg-[#090A0F]">
      <div className="w-35 h-35 animate-fade-in">
        <img
          src="/logo.svg"
          alt="logo"
          width={140}
          height={140}
          className="animate-pulse"
        />
      </div>

      <div className="text-[24px] font-extrabold tracking-[10px] bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
        EchoGPT
      </div>
    </div>
  );
};

export default Loader;
