import React, { useState } from "react";
import {
    AppstoreOutlined,
    RiseOutlined,
    BookOutlined,
    CopyOutlined,
    BellOutlined,
    SettingOutlined,
    DeleteOutlined,
    EditOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    ExclamationCircleOutlined,
    CloseOutlined,
    CloseCircleFilled,
    AppstoreFilled,
} from "@ant-design/icons";
import {
    Button,
    Layout,
    Menu,
    theme,
    Avatar,
    Badge,
    Space,
    Pagination,
    Table,
    Tag,
    Input,
    Select,
    Modal,
    notification,
    message,
} from "antd";
import { Footer } from "antd/es/layout/layout";
import Radio from "antd/es/radio/radio";
import "../../css/radio.css"
import "../../css/notification.css"
import Checkbox from "antd/es/checkbox/Checkbox";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const ManagerLesson: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    // ----------------------------------------------------------------------------------------
    const [sortOrder, setSortOrder] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalInputFocus, setModalInputFocus] = useState<boolean>(false);
    const [subjectInput, setSubjectInput] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const location = useLocation();

    // ----------------------------------------------------------------------------------------
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    // -----------------------------------------------------------------------------------------


    // Dữ liệu mẫu 
    const dataSource = [
        { key: "1", name: "Lập trình C", status: "active" },
        { key: "2", name: "Lập trình Frontend với ReactJS", status: "inactive" },
        { key: "3", name: "Lập trình Backend với Spring boot", status: "active" },
        { key: "4", name: "Lập trình Frontend với VueJS", status: "inactive" },
        { key: "5", name: "Cấu trúc dữ liệu và giải thuật", status: "inactive" },
        { key: "6", name: "Phân tích và thiết kế hệ thống", status: "inactive" },
        { key: "7", name: "Toán cao cấp", status: "active" },
        { key: "8", name: "Tiếng Anh chuyên ngành", status: "inactive" },
    ];

    // hàng trong bảng
    const columns = [
        {
            title: (
                <Checkbox ></Checkbox>
            ),
            dataIndex: "name",
            key: "name",
            render: () => (
                <Checkbox ></Checkbox>
            )
        },
        {
            title: (
                <div
                    style={{ cursor: "pointer", userSelect: "none" }}
                    onClick={() => {
                        setSortOrder(sortOrder === "ascend" ? "descend" : "ascend");
                    }}
                >
                    Tên bài học {sortOrder === "ascend" ? <ArrowUpOutlined /> : sortOrder === "descend" ? <ArrowDownOutlined /> : <><ArrowUpOutlined /> <ArrowDownOutlined /></>}
                </div>
            ),
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirection: ['ascend', 'descend']
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) =>
                status === "active" ? (
                    <Tag color="green" style={{ borderRadius: "9999px", display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", width: "45%", height: "25px" }}><span style={{
                        fontSize: "20px",
                    }}>&#8226;</span> Đang hoạt động</Tag>
                ) : (
                    <Tag color="red" style={{ borderRadius: "9999px", display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", width: "45%", height: "25px" }}><span style={{
                        fontSize: "20px",
                    }}>&#8226;</span> Ngừng hoạt động</Tag>
                ),
        },
        {
            title: "Chức năng",
            key: "action",
            render: () => (
                <Space>
                    <Button type="text" danger onClick={() => { setIsDelete(true); setIsEdit(false); showLoading() }}>
                        <DeleteOutlined style={{
                            fontSize: "20px"
                        }} />
                    </Button>
                    <Button type="text" onClick={() => { setIsEdit(true); setIsDelete(false); showLoading() }}>
                        <EditOutlined style={{
                            fontSize: "20px"
                        }}></EditOutlined>
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Layout style={{ width: "100%", height: "100vh" }}>
                {/* Sidebar bên trái */}
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
                        <span style={{ fontSize: "20px" }}>📚</span>
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
                        defaultSelectedKeys={["2"]}
                        items={[
                            { key: "1", icon: <Link to={""}><RiseOutlined /></Link>, label: "Thống kê" },
                            { key: "2", icon: <Link to={"/manager/subject"}><BookOutlined /></Link>, label: "Quản lý môn học" },
                            { key: "3", icon: <Link to={"/manager/lesson"}><CopyOutlined /></Link>, label: "Quản lý bài học" },
                        ]}
                        style={{ backgroundColor: "#f0f2f5" }}
                    />
                </Sider>

                {/* nội dung */}
                <Layout>
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
                            onClick={() => setCollapsed(!collapsed)}
                        />

                        <Space size="large" style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Badge count={3}>
                                <BellOutlined style={{ fontSize: 22 }} />
                            </Badge>
                            <SettingOutlined style={{ fontSize: 22 }} />
                            <Avatar style={{
                                fontSize: "12px",
                                marginBottom: "10px"
                            }} src="https://i.pravatar.cc/300" />
                        </Space>
                    </Header>

                    {/* Content */}
                    <Content
                        style={{
                            padding: "24px",
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <div
                            style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}
                        >
                            <h2>Môn học</h2>
                            <Space style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            }}>
                                <div style={{
                                    display: "flex",
                                    gap: "15px"
                                }}>
                                    <Select defaultValue="all" style={{ width: 160 }}>
                                        <Option value="all">Lọc theo trạng thái</Option>
                                        <Option value="active">Đang hoạt động</Option>
                                        <Option value="inactive">Ngừng hoạt động</Option>
                                    </Select>
                                    <Button type="primary" onClick={() => { showLoading(); setIsEdit(false); setIsDelete(false) }}>Thêm mới môn học</Button>
                                </div>
                            </Space>
                        </div>

                        <Table dataSource={dataSource} columns={columns} pagination={false} />
                    </Content>

                    {/* phân trang */}
                    <Footer
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                        }}
                    >
                        <Pagination defaultCurrent={1} total={50} />
                    </Footer>
                </Layout>
                {!isEdit && !isDelete ? (<Modal
                    style={{ padding: "0 0 15px 15px" }}
                    title={<span>Thêm mới môn học</span>}
                    open={open}
                    onCancel={() => setOpen(false)}
                    loading={loading}
                    footer={[
                        <Button key="cancel" onClick={() => setOpen(false)}>
                            Huỷ
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            console.log("Xác nhận thêm môn học");
                            setOpen(false);
                        }}>
                            Xác nhận
                        </Button>
                    ]}
                >
                    <div>
                        <label style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: "bold" }}>Tên môn học</span>
                            <Input type="text" style={{ width: "100%", borderColor: `${modalInputFocus && subjectInput.length === 0 ? "red" : ""}` }} value={subjectInput} onFocus={() => { setModalInputFocus(true) }} onBlur={() => { setModalInputFocus(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSubjectInput(e.target.value) }} />
                            {modalInputFocus && subjectInput.length === 0 ? (<span style={{
                                color: "red",
                            }}>Tên môn học không được để trống</span>) : (<></>)}
                        </label>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                        <span style={{ fontWeight: "bold" }}>Trạng thái</span>
                        <Radio.Group
                            name="radiogroup"
                            defaultValue={true}
                            options={[
                                { value: true, label: "Đang hoạt động" },
                                { value: false, label: "Không hoạt động" },
                            ]}
                        />
                    </div>
                    <br />
                </Modal>) : (!isDelete ? (
                    <Modal
                        style={{ padding: "0 0 15px 15px" }}
                        title={<span>Cập nhật môn học</span>}
                        open={open}
                        onCancel={() => setOpen(false)}
                        loading={loading}
                        footer={[
                            <Button key="cancel" onClick={() => setOpen(false)}>
                                Huỷ
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => {
                                console.log("Xác nhận sửa môn học");
                                setOpen(false);
                            }}>
                                Lưu
                            </Button>
                        ]}
                    >
                        <div>
                            <label style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontWeight: "bold" }}>Tên môn học</span>
                                <Input type="text" style={{ width: "100%", borderColor: `${modalInputFocus && subjectInput.length === 0 ? "red" : ""}` }} value={subjectInput} onFocus={() => { setModalInputFocus(true) }} onBlur={() => { setModalInputFocus(false) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSubjectInput(e.target.value) }} />
                                {modalInputFocus && subjectInput.length === 0 ? (<span style={{
                                    color: "red",
                                }}>Tên môn học không được để trống</span>) : (<></>)}
                            </label>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                            <span style={{ fontWeight: "bold" }}>Trạng thái</span>
                            <Radio.Group
                                name="radiogroup"
                                defaultValue={true}
                                options={[
                                    { value: true, label: "Đang hoạt động" },
                                    { value: false, label: "Không hoạt động" },
                                ]}
                            />
                        </div>
                        <br />
                    </Modal>
                ) : (
                    <Modal
                        style={{ padding: "0 0 15px 15px" }}
                        title={<span><ExclamationCircleOutlined style={{ color: '#D92D20', fontSize: 24 }} /></span>}
                        open={open}
                        onCancel={() => setOpen(false)}
                        loading={loading}
                        footer={[
                            <div style={{
                                borderTop: "1px solid #E4E4E7",
                                display: "flex",
                                gap: "4px",
                                justifyContent: "end"
                            }}>
                                <Button key="cancel" onClick={() => setOpen(false)}>
                                    Huỷ
                                </Button>,
                                <Button key="submit" type="primary" danger onClick={() => {
                                    console.log("Xác nhận xoá môn học");
                                    notification.success(
                                        {
                                            message: "Thành công",
                                            description: "Xoá môn học thành công",
                                            placement: "topRight",
                                            closeIcon: <CloseCircleFilled style={{ color: '#7A8294', backgroundColor: "#ffff", fontSize: 20, borderRadius: "50%" }} />,
                                            duration: 5,
                                        }
                                    )
                                    setOpen(false);
                                }}>
                                    Xoá
                                </Button>
                            </div>
                        ]}
                    >
                        <div>
                            <h3>Xác nhận</h3>
                            <span>Bạn có chắc chắn muốn xóa môn học <strong>Lập trình cơ bản Frontend Fundamental</strong> khỏi hệ thống không?</span>
                        </div>
                    </Modal>
                ))}
            </Layout>
        </>
    );
};

export default ManagerLesson;
