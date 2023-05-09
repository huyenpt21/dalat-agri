import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import logo from "../../assets/image 2.png";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;

export default function LayoutMain() {
  const navigate = useNavigate();
  const handleClickMenu = (value) => {
    if (value.key === "danh-muc-cay-trong") {
      navigate(value.key);
    }
  };
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
          mode="inline"
          items={[
            {
              label: "Danh mục cây trồng",
              key: "danh-muc-cay-trong",
            },
            { label: "Thông tin cây trồng", key: "2" },
            { label: "Nông hộ", key: "3" },
          ]}
          onClick={handleClickMenu}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: "14px", background: "#ccc" }}>
          <div style={{ fontSize: "18px" }}>Trang chủ</div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item
              onClick={() => {
                navigate("/");
              }}
            >
              Trang chủ
            </Breadcrumb.Item>
            <Breadcrumb.Item>Danh mục cây trồng</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: "90%",
              background: "#9DE783",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
