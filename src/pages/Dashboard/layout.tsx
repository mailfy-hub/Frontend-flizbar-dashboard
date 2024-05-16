import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import {
} from "../../components/lineChart";
import { SidebarLayout } from "../../components/sidebar";

export const Layout = () => {
  return (
    <div className="w-full h-full bg-GRAY_100 flex relative">
      <SidebarLayout />
      <div className="w-full overflow-auto">
        <Header />
        <div className="p-12 w-full h-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};
