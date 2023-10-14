"use client";

import Contents from "@/components/Dashboard/Contents";
// import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import SideBar from "@/ui/sideBar";
import { Layout } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout hasSider>
      {/* <DashboardSidebar /> */}
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
