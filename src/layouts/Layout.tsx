import Topbar from "../components/Topbar";
import { Outlet } from "react-router";
import { SidebarLayout } from "../components/Sidebar";


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