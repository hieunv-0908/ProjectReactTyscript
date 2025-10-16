import Sider from 'antd/es/layout/Sider'
import Menu from 'antd/es/menu'
import React, { useState } from 'react'
import {
    RiseOutlined,
    BookOutlined,
    CopyOutlined,
} from "@ant-design/icons";
import { Link } from 'react-router-dom'

interface propType {
    collapsed: boolean
}

function ManagerSubjectSiderBar({ collapsed }: propType) {
    return (
        <Sider
            width="10%"
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: "#F6F8F9" }}
        >
            <div
                style={{
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    // backgroundColor:"red",
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
                style={{
                    backgroundColor: "#F6F8F9"
                }}
                defaultSelectedKeys={["2"]}
                items={[
                    { key: "1", icon: <Link to={""}><RiseOutlined /></Link>, label: "Thống kê" },
                    { key: "2", icon: <Link to={"/manager/subject"}><BookOutlined /></Link>, label: "Quản lý môn học" },
                    { key: "3", icon: <Link to={"/manager/lesson"}><CopyOutlined /></Link>, label: "Quản lý bài học" },
                ]}
            />
        </Sider>
    )
}

export default ManagerSubjectSiderBar