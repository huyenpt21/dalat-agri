import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import logo from "./image 2.png";
const { Header, Content, Sider } = Layout;

export default function LayoutMain() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "40px", marginRight: "12px" }}
          />
          <div style={{ fontWeight: "600" }}>DALAT’AGRI</div>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={[
            { label: "Danh mục cây trồng", key: "1" },
            { label: "Thông tin cây trồng", key: "2" },
            { label: "Nông hộ", key: "3" },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: "14px", background: "#ccc" }}>
          <div style={{ fontSize: "18px" }}>Trang chủ</div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: "90%",
              background: "#9DE783",
            }}
          >
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
