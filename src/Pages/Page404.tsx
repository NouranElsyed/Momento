
const Page404 = () => {
  return (
    <>
      <div
        className="flex justify-center items-center w-full "
      >
        <div className=" flex flex-col md:flex-row justify-center items-center gap-15 text-2xl md:text-3xl lg:text-4xl  font-bold text-blue-950 rounded-4xl p-10 md:w-8/10 w-7/10">
          <img src="/public/page404.png" alt="" className="w-30 md:w-40 lg:w-50" />
          <div className="flex flex-col items-start">
            <span>Oops! The page</span>
            <span> you’re looking for</span>
            <span>doesn’t exist 👀</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
