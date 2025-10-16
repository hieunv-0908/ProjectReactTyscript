import React, { useEffect, useState } from "react";
import {
    Button,
    Input,
    Select,
    Space,
    Table,
    Tag,
    Pagination,
    theme,
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store/store";
import { fetchSubject } from "../../../../redux/feature/subject/subjectSlice";

interface PropType {
    handleIsDelete: (value: boolean) => void;
    handleIsEdit: (value: boolean) => void;
    showModal: (value: boolean) => void;
    onEdit: (subject: any) => void;
    onAdd: () => void;
    onDelete: (subject: any) => void;
    
}

const ManagerSubject = ({
    handleIsDelete,
    handleIsEdit,
    showModal,
    onEdit,
    onAdd,
    onDelete,

}: PropType) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useDispatch<AppDispatch>();
    const { subjects, loading } = useSelector(
        (state: RootState) => state.subject
    );

    // ---------------- State ----------------
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | "">("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("all");

    // ---------------- Fetch data ----------------
    useEffect(() => {
        dispatch(fetchSubject());
    }, [dispatch]);

    // ---------------- Lọc & tìm kiếm local ----------------
    const filteredData = subjects
        .filter((s) => {
            const matchSearch = s.subject_name
                ?.toLowerCase()
                .includes(searchValue.toLowerCase());
            const matchFilter =
                filterValue === "all"
                    ? true
                    : filterValue === "active"
                        ? s.active
                        : !s.active;
            return matchSearch && matchFilter;
        })
        .sort((a, b) => {
            if (sortOrder === "ascend")
                return a.subject_name.localeCompare(b.subject_name);
            if (sortOrder === "descend")
                return b.subject_name.localeCompare(a.subject_name);
            return 0;
        });

    // ---------------- Phân trang local ----------------
    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    // ---------------- Cột bảng ----------------
    const columns = [
        {
            title: (
                <div
                    style={{ cursor: "pointer", userSelect: "none" }}
                    onClick={() =>
                        setSortOrder(
                            sortOrder === "ascend"
                                ? "descend"
                                : sortOrder === "descend"
                                    ? ""
                                    : "ascend"
                        )
                    }
                >
                    Tên môn học{" "}
                    {sortOrder === "ascend" ? (
                        <ArrowUpOutlined />
                    ) : sortOrder === "descend" ? (
                        <ArrowDownOutlined />
                    ) : (
                        <></>
                    )}
                </div>
            ),
            dataIndex: "subject_name",
            key: "subject_name",
        },
        {
            title: "Trạng thái",
            dataIndex: "active",
            key: "active",
            render: (active: boolean) =>
                active ? (
                    <Tag color="green" style={{ borderRadius: "9999px" }}>
                        ● Đang hoạt động
                    </Tag>
                ) : (
                    <Tag color="red" style={{ borderRadius: "9999px" }}>
                        ● Ngừng hoạt động
                    </Tag>
                ),
        },
        {
            title: "Chức năng",
            key: "action",
            width: 200,
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        type="text"
                        danger
                        onClick={() => {
                            handleIsDelete(true);
                            handleIsEdit(false);
                            showModal(true);
                            onDelete(record);
                        }}
                    >
                        <DeleteOutlined style={{ fontSize: "18px" }} />
                    </Button>
                    <Button
                        type="text"
                        onClick={() => onEdit(record)}
                    >
                        <EditOutlined style={{ fontSize: "18px" }} />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div
            style={{
                padding: "24px",
                minHeight: 280,
                background: colorBgContainer,
                borderTop: "1px solid #E5E9EB",
            }}
        >
            {/* Bộ lọc / tìm kiếm / thêm mới */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 16,
                }}
            >
                <h1>Môn học</h1>

                <Space
                    direction="vertical"
                    style={{ alignItems: "end", width: "30%", gap: "15px" }}
                >
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Select
                            defaultValue="all"
                            style={{ width: 250, height: 45 }}
                            onChange={(value) => setFilterValue(value)}
                            options={[
                                { value: "all", label: "Lọc theo trạng thái" },
                                { value: "active", label: "Đang hoạt động" },
                                { value: "inactive", label: "Ngừng hoạt động" },
                            ]}
                        />
                        <Button
                            type="primary"
                            style={{ height: 45 }}
                            onClick={onAdd}
                        >
                            Thêm mới môn học
                        </Button>
                    </div>

                    <Input
                        placeholder="Tìm kiếm môn học theo tên..."
                        style={{ width: 300 }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Space>
            </div>

            {/* Bảng */}
            <Table
                dataSource={paginatedData.map((s) => ({ key: s.id, ...s }))}
                columns={columns}
                pagination={false}
                loading={loading}
            />

            {/* Phân trang */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 24,
                }}
            >
                <Pagination
                    current={page}
                    pageSize={limit}
                    total={filteredData.length}
                    onChange={(p, size) => {
                        setPage(p);
                        setLimit(size);
                    }}
                    showSizeChanger
                />
            </div>
        </div>
    );
};

export default ManagerSubject;
