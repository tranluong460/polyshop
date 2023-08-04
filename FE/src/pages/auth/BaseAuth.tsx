import { Outlet } from "react-router-dom";

const BaseAuth = () => {
  return (
    <>
      <div className="relative h-screen w-full bg-[url('/images/background.avif')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-gray-30 w-full h-full lg:bg-opacity-30 pt-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BaseAuth;
