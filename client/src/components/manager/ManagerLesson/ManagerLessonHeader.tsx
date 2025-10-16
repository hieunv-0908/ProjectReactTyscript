import React from "react";
import { Layout, Space, Badge, Dropdown, Avatar, Button } from "antd";
import {
  AppstoreFilled,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

interface ManagerLessonHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  colorBgContainer: string;
}

const ManagerLessonHeader: React.FC<ManagerLessonHeaderProps> = ({
  onToggle,
  colorBgContainer,
}) => {
  return (
    <Header
      style={{
        padding: "0 16px",
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={<AppstoreFilled style={{ fontSize: "18px" }} />}
        onClick={onToggle}
      />

      <Space size="large" align="center">
        <Badge count={3}>
          <BellOutlined style={{ fontSize: 22 }} />
        </Badge>

        <Dropdown
          menu={{
            items: [
              {
                key: "logout",
                label: (
                  <Button
                    type="text"
                    danger
                    icon={<LogoutOutlined />}
                    style={{ width: "100%", textAlign: "left" }}
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.replace("/login");
                    }}
                  >
                    Đăng xuất
                  </Button>
                ),
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <SettingOutlined style={{ fontSize: 22, cursor: "pointer" }} />
        </Dropdown>

        <Avatar
          src="https://i.pravatar.cc/300"
          style={{ fontSize: "12px", marginBottom: "10px" }}
        />
      </Space>
    </Header>
  );
};

export default ManagerLessonHeader;
