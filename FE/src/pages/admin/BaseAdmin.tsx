import { useState } from "react";
import type { MenuProps } from "antd";
import { Outlet, Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaProductHunt } from "react-icons/lia";
import { BsClipboardCheck } from "react-icons/bs";

import { Logo } from "../../components";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const BaseAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const listMenu: MenuItem[] = [
    getItem(
      <Link to="/admin/dashboard">Dashboard</Link>,
      "1",
      <BsClipboardCheck />
    ),
    getItem(
      <Link to="/admin/products">Sản phẩm</Link>,
      "2",
      <LiaProductHunt />
    ),
    getItem(
      <Link to="/admin/users">Người dùng</Link>,
      "sub3",
      <AiOutlineUser />
    ),
    getItem(
      <Link to="/admin/categories">Danh mục</Link>,
      "sub4",
      <BiCategoryAlt />
    ),
  ];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const listBreadcrumb = [
    {
      href: "/admin",
      title: <AiOutlineHome className="mt-1" />,
    },
    {
      href: "/admin/dashboard",
      title: "Dashboard",
    },
  ];

  return (
    <>
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          theme="light"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="flex justify-center p-1">
            <Logo large />
          </div>

          <Menu
            mode="inline"
            theme="light"
            items={listMenu}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={["1"]}
          />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="text-center">Header</div>
          </Header>

          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }} items={listBreadcrumb} />

            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Poly shop ©2023 Created by Alone
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default BaseAdmin;
