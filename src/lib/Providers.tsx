"use client";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntResistry";
import store from "@/Redux/store";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            // colorPrimary: "red",
            borderRadius: 8,
            colorText: "#000",
            fontFamily: "default",
            colorBgSpotlight: "red",
            // Alias Token
            colorBgContainer: "#fff",
          },
        }}
      >
        <Provider store={store}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Provider>
      </ConfigProvider>
    </>
  );
};

export default Providers;
