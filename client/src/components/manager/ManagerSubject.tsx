import React, { useEffect, useState } from "react";
import {
    ExclamationCircleOutlined,
    CloseCircleFilled,
} from "@ant-design/icons";
import { Button, Layout, Input, Modal, notification } from "antd";
import { Footer } from "antd/es/layout/layout";
import Radio from "antd/es/radio/radio";
import "../../css/radio.css";
import "../../css/notification.css";
import "../../css/tabelMNGS.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ManagerSubjectSiderBar from "./ManagerSubject/ManagerSubjectSiderBar";
import ManagerSubjectHeader from "./ManagerSubject/ManagerSubjectHeader";
import ManagerSubjectContent from "./ManagerSubject/ManagerSubjectContent";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import {
    fetchSubject,
    addSubject,
    editSubject,
    deleteSubject,
} from "../../../redux/feature/subject/subjectSlice";

const ManagerSubject: React.FC = () => {
    // ---------------- STATE ----------------
    const [open, setOpen] = useState<boolean>(false);
    const [modalInputFocus, setModalInputFocus] = useState<boolean>(false);
    const [subjectInput, setSubjectInput] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<any>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { subjects, loading } = useSelector(
        (state: RootState) => state.subject
    );

    // ---------------- FETCH DATA ----------------
    useEffect(() => {
        dispatch(fetchSubject());
    }, [dispatch]);

    // ---------------- HANDLER ----------------
    const showModal = (value: boolean) => setOpen(value);

    const handleCollapsed = () => setCollapsed(!collapsed);
    const handleIsDelete = (value: boolean) => setIsDelete(value);
    const handleIsEdit = (value: boolean) => setIsEdit(value);

    // ✅ Gửi dữ liệu từ Content sang khi click Sửa
    const handleEditSubject = (subject: any) => {
        setIsEdit(true);
        setIsDelete(false);
        setSelectedSubject(subject);
        setSubjectInput(subject.subject_name);
        setIsActive(subject.active);
        setOpen(true);
    };

    const handleAddSubject = () => {
        setIsEdit(false);
        setIsDelete(false);
        setSubjectInput("");
        setIsActive(true);
        setOpen(true);
    };

    const handleDeleteSubject = (subject: any) => {
        setIsDelete(true);        // để hiện modal Xoá
        setIsEdit(false);
        setSelectedSubject(subject); // lưu subject đang muốn xoá
        setOpen(true);            // mở modal xác nhận
    };

    const handleDelete = () => {
        if (!selectedSubject) return;

        dispatch(deleteSubject(selectedSubject.id));
        notification.success({
            message: "Thành công",
            description: "Xoá môn học thành công",
        });
        setOpen(false);
    };

    // ---------------- VALIDATE ----------------
    const validateSubject = (name: string, currentId?: number) => {
        if (name.trim() === "") {
            notification.error({
                message: "Lỗi",
                description: "Tên môn học không được để trống!",
            });
            return false;
        }
        const existed = subjects.find(
            (s) =>
                s.subject_name.trim().toLowerCase() === name.trim().toLowerCase() &&
                s.id !== currentId
        );
        if (existed) {
            notification.error({
                message: "Lỗi",
                description: "Tên môn học đã tồn tại!",
            });
            return false;
        }
        return true;
    };

    // ---------------- SUBMIT HANDLERS ----------------
    const handleAdd = () => {
        if (!validateSubject(subjectInput)) return;
        dispatch(addSubject({ subject_name: subjectInput, active: isActive }));
        notification.success({
            message: "Thành công",
            description: "Thêm môn học thành công",
        });
        setOpen(false);
    };

    const handleEdit = () => {
        if (!selectedSubject) return;
        if (!validateSubject(subjectInput, selectedSubject.id)) return;

        dispatch(
            editSubject({
                id: selectedSubject.id,
                subject_name: subjectInput,
                active: isActive,
            })
        );
        notification.success({
            message: "Thành công",
            description: "Cập nhật môn học thành công",
        });
        setOpen(false);
    };

    return (
        <Layout style={{ width: "100%", height: "100vh" }}>
            {/* Sidebar */}
            <ManagerSubjectSiderBar collapsed={collapsed} />

            {/* Main layout */}
            <Layout>
                <ManagerSubjectHeader handleCollapsed={handleCollapsed} />

                {/* Nội dung */}
                <ManagerSubjectContent
                    handleIsDelete={handleIsDelete}
                    handleIsEdit={handleIsEdit}
                    showModal={showModal}
                    onEdit={handleEditSubject}
                    onAdd={handleAddSubject}
                    onDelete={handleDeleteSubject}
                />
            </Layout>

            {/* Modal Thêm / Sửa */}
            {!isDelete && (
                <Modal
                    title={isEdit ? "Cập nhật môn học" : "Thêm mới môn học"}
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setOpen(false)}>
                            Huỷ
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={isEdit ? handleEdit : handleAdd}
                        >
                            {isEdit ? "Lưu" : "Xác nhận"}
                        </Button>,
                    ]}
                >
                    <div>
                        <label style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: "bold" }}>Tên môn học</span>
                            <Input
                                value={subjectInput}
                                onChange={(e) => setSubjectInput(e.target.value)}
                                onFocus={() => setModalInputFocus(true)}
                                onBlur={() => setModalInputFocus(false)}
                                style={{
                                    borderColor:
                                        modalInputFocus && subjectInput.length === 0
                                            ? "red"
                                            : "",
                                }}
                            />
                            {modalInputFocus && subjectInput.length === 0 && (
                                <span style={{ color: "red" }}>
                                    Tên môn học không được để trống
                                </span>
                            )}
                        </label>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            marginTop: "16px",
                        }}
                    >
                        <span style={{ fontWeight: "bold" }}>Trạng thái</span>
                        <Radio.Group
                            name="radiogroup"
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                            options={[
                                { value: true, label: "Đang hoạt động" },
                                { value: false, label: "Không hoạt động" },
                            ]}
                        />
                    </div>
                </Modal>
            )}

            {/* Modal Xóa */}
            {isDelete && (
                <Modal
                    title={
                        <span>
                            <ExclamationCircleOutlined
                                style={{ color: "#D92D20", fontSize: 24 }}
                            />
                        </span>
                    }
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setOpen(false)}>
                            Huỷ
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            danger
                            onClick={handleDelete}
                        >
                            Xoá
                        </Button>
                    ]}
                >
                    <div>
                        <h3>Xác nhận</h3>
                        <span>
                            Bạn có chắc chắn muốn xóa môn học{" "}
                            <strong>
                                {selectedSubject
                                    ? selectedSubject.subject_name
                                    : "N/A"}
                            </strong>{" "}
                            khỏi hệ thống không?
                        </span>
                    </div>
                </Modal>
            )}
        </Layout>
    );
};

export default ManagerSubject;
