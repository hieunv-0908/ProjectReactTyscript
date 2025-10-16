import React from "react";
import { Layout, Menu } from "antd";
import { RiseOutlined, BookOutlined, CopyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

interface ManagerLessonSiderBarProps {
    collapsed: boolean;
    onCollapse: (value: boolean) => void;
}

const ManagerLessonSiderBar: React.FC<ManagerLessonSiderBarProps> = ({
    collapsed,
}) => {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: "#f0f2f5" }}
        >
            <div
                style={{
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                }}
            >
                <Link to={"/home"}><span style={{ fontSize: "20px" }}> 📚</span></Link>
                {!collapsed && (
                    <div style={{ marginLeft: "8px" }}>
                        <b style={{ fontSize: "12px" }}>Study Tracker</b>
                        <div style={{ fontSize: "11px", color: "gray" }}>
                            Quản lý tiến độ học tập
                        </div>
                    </div>
                )}
            </div>

            <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={["3"]}
                items={[
                    { key: "1", icon: <RiseOutlined />, label: <Link to="">Thống kê</Link> },
                    { key: "2", icon: <BookOutlined />, label: <Link to="/manager/subject">Quản lý môn học</Link> },
                    { key: "3", icon: <CopyOutlined />, label: <Link to="/manager/lesson">Quản lý bài học</Link> },
                ]}
                style={{ backgroundColor: "#f0f2f5" }}
            />
        </Sider>
    );
};

export default ManagerLessonSiderBar;
