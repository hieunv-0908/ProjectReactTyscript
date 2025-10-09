import React from "react";
import { Input, Menu } from "antd";
import { UserOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div className="header" style={{ paddingLeft: "10px" }}>
            <div>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    style={{ width: 700, padding: "16px", backgroundColor: "#F5F5F5" }}
                />
            </div>
            <div>
                <div className="menu">
                    <NavLink to={"/home"} className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Trang chủ</NavLink>
                    <NavLink to={"/"} className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Môn học</NavLink>
                    <NavLink to={"/"} className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Bài học</NavLink>
                </div>
            </div>
            <div className="header-icons">
                <HeartOutlined />
                <UserOutlined />
            </div>
        </div>
    );
};

export default Header;
