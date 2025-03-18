import Topbar from "../components/layout/Topbar";
import { Outlet } from "react-router";
import { SidebarLayout } from "../components/layout/Sidebar";


export default function Layout() {
  return (
    <div>
      <SidebarLayout>
        <Topbar />
        <Outlet />
      </SidebarLayout>
    </div>
  );
};