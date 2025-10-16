import React from 'react'
import Button from 'antd/es/button'
import { Header } from 'antd/es/layout/layout'
import {
    AppstoreFilled,
    BellFilled,
    QuestionCircleFilled,
    SettingFilled,
} from "@ant-design/icons";
import {
    Avatar,
    Badge,
} from "antd";

import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';

interface propsType {
    handleCollapsed: () => void
}

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link onClick={(e) => { e.preventDefault(); sessionStorage.removeItem("user") }} to={"/login"}>
                Logout
            </Link>
        ),
    }
];

function ManagerSubjectHeader({ handleCollapsed }: propsType) {

    return (
        <Header
            style={{
                padding: "0 16px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Button
                type="text"
                icon={<AppstoreFilled style={{ fontSize: "18px", color: "#5B6871" }} />}
                onClick={() => handleCollapsed()}
            />

            <Space size="large" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Badge count={3}>
                    <BellFilled style={{ fontSize: 22, color: "#5B6871" }} />
                </Badge>
                <QuestionCircleFilled style={{ fontSize: 22, color: "#5B6871" }} />
                <SettingFilled style={{ fontSize: 22, color: "#5B6871" }} />
                <Dropdown menu={{ items }} >
                    <a >
                        <Space >
                            <Avatar style={{
                                fontSize: "12px",
                                marginBottom: "10px"
                            }} src="https://i.pravatar.cc/300" />
                        </Space>
                    </a>
                </Dropdown>
            </Space>
        </Header>
    )
}

export default ManagerSubjectHeader