import React from "react";
import { Input, Dropdown, Button } from "antd";
import {
    UserOutlined,
    HeartOutlined,
    SearchOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {
    onSearchChange?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login", { replace: true });
    };

    const items = [
        {
            key: "logout",
            label: (
                <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    danger
                    onClick={handleLogout}
                    style={{ width: "100%", textAlign: "left" }}
                >
                    Đăng xuất
                </Button>
            ),
        },
    ];

    return (
        <div className="header-home" style={{ paddingLeft: "10px" }}>
            {/* Ô tìm kiếm */}
            <div className="Search">
                <Input
                    placeholder="Tìm kiếm môn học..."
                    prefix={<SearchOutlined />}
                    style={{ width: 700, padding: "16px", backgroundColor: "#F5F5F5" }}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                />
            </div>

            {/* Menu chính */}
            <div>
                <div className="menu">
                    <NavLink
                        to={"/home"}
                        className={({ isActive }) =>
                            isActive ? "navLink active" : "navLink"
                        }
                    >
                        Trang chủ
                    </NavLink>
                    <NavLink
                        to={"/manager/subject"}
                        className={({ isActive }) =>
                            isActive ? "navLink active" : "navLink"
                        }
                    >
                        Môn học
                    </NavLink>
                    <NavLink
                        to={"/manager/lesson"}
                        className={({ isActive }) =>
                            isActive ? "navLink active" : "navLink"
                        }
                    >
                        Bài học
                    </NavLink>
                </div>
            </div>

            {/* Icon bên phải */}
            <div className="header-icons">
                <HeartOutlined />
                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["hover"]}
                >
                    <UserOutlined />
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
