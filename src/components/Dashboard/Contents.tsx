"use client";

import { Layout } from "antd";
import DashboardNabvar from "./DashboardNabvar";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        minHeight: "100vh",
        color: "black",
      }}
    >
      {/* Header     */}
      <DashboardNabvar />
      {children}
    </Content>
  );
};

export default Contents;
