import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  GlobalOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  BranchesOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  SolutionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ selectedKey, onSelect }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
      return;
    }

    navigate(key);
    if (onSelect) {
      onSelect(key);
    }
  };

  return (
    <>
      {/* Custom CSS for selected item */}
      <style>
        {`
          .ant-menu-dark .ant-menu-item-selected {
            background-color: #1890ff !important; /* Blue background */
            color: #fff !important;
            font-weight: bold;
          }

          .ant-menu-dark .ant-menu-item-selected:hover {
            background-color: #40a9ff !important;
          }

          .ant-menu-dark .ant-menu-item:hover {
            background-color: #262626 !important;
          }
        `}
      </style>

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        theme="dark"
        style={{ display: "flex", flexDirection: "column" }}
      >
       <div
  className="logo"
  style={{
    backgroundColor: "#1890ff", // Ant Design blue
    padding: "16px",
    textAlign: "center",
  }}
>
  <h2 style={{ color: "white", margin: 0, fontSize: collapsed ? "160px" : "20px" }}>
    {collapsed ? "App" : "Job Creation"}
  </h2>
</div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>

            <SubMenu key="job" icon={<SolutionOutlined />} title="Job">
              <Menu.Item key="/jobs" icon={<FileDoneOutlined />}>
                Jobs
              </Menu.Item>
              <Menu.Item key="/job-types" icon={<AppstoreOutlined />}>
                Job Types
              </Menu.Item>
            </SubMenu>

            <SubMenu key="staff" icon={<UsergroupAddOutlined />} title="Staff">
              <Menu.Item key="/staff/admin" icon={<TeamOutlined />}>
                Admin
              </Menu.Item>
              <Menu.Item key="/staff/area-coordinator" icon={<BranchesOutlined />}>
                Area Coordinator
              </Menu.Item>
              <Menu.Item key="/staff/support-person" icon={<QuestionCircleOutlined />}>
                Support Person
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/areacode" icon={<GlobalOutlined />}>
              Area Code
            </Menu.Item>

            <Menu.Item key="/customers" icon={<CustomerServiceOutlined />}>
              Customers
            </Menu.Item>
          </Menu>
        </div>

        {/* Fixed Logout Button */}
        <div style={{ padding: "12px" }}>
          <Menu theme="dark" mode="inline" onClick={handleMenuClick} selectable={false}>
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;
