import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import logo from "../../assets/image 2.png";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;

// layout - phần khung không website: chứa header - menu - thẻ outlet để render các page content
export default function LayoutMain() {
  // dùng hook useNavigate của react-router-dom để điều hướng các trang trong website -> điều hướng tới các page trong menu
  const navigate = useNavigate();

  const handleClickMenu = (value) => {
    if (value.key === "danh-muc-cay-trong") {
      navigate(value.key);
    }
  };
  return (
    // sử dụng các component có sẵn của Antd để tạo layout cho page: Layout, Sider, Menu, Header, Content, Breadcrumb
    <Layout>
      <Sider>
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "24px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "45px", marginRight: "12px" }}
          />
          <div style={{ fontWeight: "600" }}>DALAT’AGRI</div>
        </div>
        <Menu
          style={{ marginTop: "32px" }}
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
        <Content style={{ margin: "22px 32px" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
