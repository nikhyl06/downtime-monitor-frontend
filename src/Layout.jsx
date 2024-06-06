import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default Layout;
