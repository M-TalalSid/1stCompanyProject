const SpinnerLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-[9999]">
      <div className="w-24 h-24 border-[6px] border-[#DC1F54] border-t-[#A02FCE] rounded-full animate-spin" />
    </div>
  );
};

export default SpinnerLoader;