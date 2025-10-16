import React, { useState, useMemo, useEffect } from "react";
import {
  Layout,
  Table,
  Tag,
  Button,
  Modal,
  Input,
  Radio,
  Space,
  Select,
  Pagination,
  notification,
  Checkbox,
  Spin,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store/store";
import {
  fetLesson,
  addLesson,
  updateLesson,
  deleteLesson,
} from "../../../../redux/feature/lesson/lessonSlice";

const { Content, Footer } = Layout;
const { Option } = Select;
const { Search } = Input;

const ManagerLessonContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.lesson);

  const [sortOrder, setSortOrder] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [subjectInput, setSubjectInput] = useState<string>("");
  const [status, setStatus] = useState<string>("incomplete");
  const [subjectId, setSubjectId] = useState<string>("");
  const [time, setTime] = useState<number | null>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetLesson());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchStatus =
        filterStatus === "all" ? true : item.status === filterStatus;
      const matchSearch = item.lesson_name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [data, filterStatus, searchText]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage]);

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={false}
          disabled
          style={{ opacity: 0 }}
        />
      ),
      render: (record: any) => (
        <Checkbox
          checked={record.status === "completed"}
          onChange={(e) => handleToggleStatus(record, e.target.checked)}
        />
      ),
    },
    {
      title: (
        <div
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() =>
            setSortOrder(sortOrder === "ascend" ? "descend" : "ascend")
          }
        >
          Tên bài học{" "}
          {sortOrder === "ascend" ? (
            <ArrowUpOutlined />
          ) : sortOrder === "descend" ? (
            <ArrowDownOutlined />
          ) : (
            <>
              <ArrowUpOutlined /> <ArrowDownOutlined />
            </>
          )}
        </div>
      ),
      dataIndex: "lesson_name",
      sorter: (a: any, b: any) => a.lesson_name.localeCompare(b.lesson_name),
      sortOrder: sortOrder as any,
    },

    {
      title: (
        <div
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() => handleSortByTime()}
        >
          Thời gian (phút){" "}
          {sortOrder === "timeAsc" ? (
            <ArrowUpOutlined />
          ) : sortOrder === "timeDesc" ? (
            <ArrowDownOutlined />
          ) : (
            <>
              <ArrowUpOutlined /> <ArrowDownOutlined />
            </>
          )}
        </div>
      ),
      dataIndex: "time",
      render: (time: number) => `${time}`,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) =>
        status === "completed" ? (
          <Tag color="green" style={{ borderRadius: "9999px" }}>
            ● Hoàn thành
          </Tag>
        ) : (
          <Tag color="orange" style={{ borderRadius: "9999px" }}>
            ● Chưa hoàn thành
          </Tag>
        ),
    },
    {
      title: "Chức năng",
      render: (record: any) => (
        <Space>
          <Button
            type="text"
            danger
            onClick={() => {
              setSelectedLesson(record);
              setIsDelete(true);
              setIsEdit(false);
              setOpen(true);
            }}
          >
            <DeleteOutlined style={{ fontSize: "18px" }} />
          </Button>
          <Button
            type="text"
            onClick={() => {
              setSelectedLesson(record);
              setSubjectInput(record.lesson_name);
              setStatus(record.status);
              setSubjectId(record.subject_id);
              setTime(record.time);
              setIsEdit(true);
              setIsDelete(false);
              setOpen(true);
            }}
          >
            <EditOutlined style={{ fontSize: "18px" }} />
          </Button>
        </Space>
      ),
    },
  ];


  const validateLesson = (isEditMode = false) => {
    if (!subjectInput.trim()) {
      notification.error({ message: "Tên bài học không được để trống" });
      return false;
    }
    if (!subjectId.trim()) {
      notification.error({ message: "Vui lòng chọn loại môn học" });
      return false;
    }
    if (time === null || time <= 0) {
      notification.error({ message: "Thời gian học phải lớn hơn 0" });
      return false;
    }

    const duplicate = data.find(
      (l) =>
        l.lesson_name.toLowerCase() === subjectInput.toLowerCase() &&
        (!isEditMode || l.id !== selectedLesson?.id)
    );
    if (duplicate) {
      notification.error({ message: "Tên bài học đã tồn tại" });
      return false;
    }

    return true;
  };

  const handleAddLesson = async () => {
    if (!validateLesson()) return;
    setModalLoading(true);
    await dispatch(
      addLesson({
        subject_id: subjectId,
        lesson_name: subjectInput,
        time: time!,
        status: status,
      })
    );
    setModalLoading(false);
    setOpen(false);
    setSubjectInput("");
    setSubjectId("");
    setTime(null);
    notification.success({
      message: "Thành công",
      description: "Thêm bài học thành công",
    });
  };

  const handleEditLesson = async () => {
    if (!validateLesson(true)) return;
    setModalLoading(true);
    await dispatch(
      updateLesson({
        ...selectedLesson,
        lesson_name: subjectInput,
        subject_id: subjectId,
        time: time!,
        status: status,
      })
    );
    setModalLoading(false);
    setOpen(false);
    notification.success({
      message: "Thành công",
      description: "Cập nhật bài học thành công",
    });
  };

  const handleDeleteLesson = async () => {
    setModalLoading(true);
    await dispatch(deleteLesson(selectedLesson.id));
    setModalLoading(false);
    setOpen(false);
    notification.success({
      message: "Thành công",
      description: "Xoá bài học thành công",
      closeIcon: (
        <CloseCircleFilled
          style={{
            color: "#7A8294",
            backgroundColor: "#fff",
            fontSize: 20,
            borderRadius: "50%",
          }}
        />
      ),
    });
  };

  const handleToggleStatus = async (record: any, checked: boolean) => {
    const newStatus = checked ? "completed" : "incomplete";
    await dispatch(
      updateLesson({
        ...record,
        status: newStatus,
      })
    );
    notification.success({
      message: "Đã cập nhật trạng thái",
      description: `Bài học "${record.lesson_name}" đã được đánh dấu là ${checked ? "hoàn thành" : "chưa hoàn thành"
        }.`,
    });
  };

  const handleSortByTime = () => {
    if (sortOrder === "timeAsc") {
      setSortOrder("timeDesc");
      data.sort((a: any, b: any) => b.time - a.time);
    } else {
      setSortOrder("timeAsc");
      data.sort((a: any, b: any) => a.time - b.time);
    }
  };

  return (
    <>
      <Content style={{ padding: "24px", minHeight: 280, background: "#fff" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2>Bài học</h2>
          <Space>
            <Search
              placeholder="Tìm kiếm bài học..."
              allowClear
              onSearch={(value) => setSearchText(value)}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 220 }}
            />

            <Select
              value={filterStatus}
              onChange={(value) => {
                setFilterStatus(value);
                setCurrentPage(1);
              }}
              style={{ width: 180 }}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="completed">Hoàn thành</Option>
              <Option value="incomplete">Chưa hoàn thành</Option>
            </Select>

            <Button
              type="primary"
              onClick={() => {
                setIsEdit(false);
                setIsDelete(false);
                setOpen(true);
                setSubjectInput("");
                setSubjectId("");
                setTime(null);
              }}
            >
              Thêm bài học
            </Button>
          </Space>
        </div>

        {loading ? (
          <Spin tip="Đang tải..." />
        ) : (
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            style={{ marginTop: 16 }}
            rowKey="id"
          />
        )}
      </Content>

      <Footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </Footer>

      {/* Modal Thêm/Sửa/Xoá */}
      {!isEdit && !isDelete ? (
        <Modal
          title="Thêm mới bài học"
          open={open}
          onCancel={() => setOpen(false)}
          confirmLoading={modalLoading}
          footer={[
            <Button onClick={() => setOpen(false)}>Huỷ</Button>,
            <Button type="primary" onClick={handleAddLesson}>
              Xác nhận
            </Button>,
          ]}
        >
          <label>
            <b>Tên bài học</b>
            <Input
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
            />
          </label>

          <div style={{ marginTop: 16 }}>
            <b>Loại môn học</b>
            <Select
              value={subjectId}
              onChange={setSubjectId}
              style={{ width: "100%", marginTop: 8 }}
              placeholder="Chọn môn học"
            >
              <Option value="1">Toán</Option>
              <Option value="2">Văn</Option>
              <Option value="3">Anh</Option>
            </Select>
          </div>

          <div style={{ marginTop: 16 }}>
            <b>Thời gian học (phút)</b>
            <Input
              type="number"
              min={1}
              value={time ?? ""}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <b>Trạng thái</b>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: "completed", label: "Hoàn thành" },
                { value: "incomplete", label: "Chưa hoàn thành" },
              ]}
            />
          </div>
        </Modal>
      ) : !isDelete ? (
        <Modal
          title="Cập nhật bài học"
          open={open}
          onCancel={() => setOpen(false)}
          confirmLoading={modalLoading}
          footer={[
            <Button onClick={() => setOpen(false)}>Huỷ</Button>,
            <Button type="primary" onClick={handleEditLesson}>
              Lưu
            </Button>,
          ]}
        >
          <label>
            <b>Tên bài học</b>
            <Input
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
            />
          </label>

          <div style={{ marginTop: 16 }}>
            <b>Loại môn học</b>
            <Select
              value={subjectId}
              onChange={setSubjectId}
              style={{ width: "100%", marginTop: 8 }}
            >
              <Option value="1">Toán</Option>
              <Option value="2">Văn</Option>
              <Option value="3">Anh</Option>
            </Select>
          </div>

          <div style={{ marginTop: 16 }}>
            <b>Thời gian học (phút)</b>
            <Input
              type="number"
              min={1}
              value={time ?? ""}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <b>Trạng thái</b>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: "completed", label: "Hoàn thành" },
                { value: "incomplete", label: "Chưa hoàn thành" },
              ]}
            />
          </div>
        </Modal>
      ) : (
        <Modal
          title={
            <ExclamationCircleOutlined
              style={{ color: "#D92D20", fontSize: 24 }}
            />
          }
          open={open}
          onCancel={() => setOpen(false)}
          confirmLoading={modalLoading}
          footer={[
            <Button onClick={() => setOpen(false)}>Huỷ</Button>,
            <Button type="primary" danger onClick={handleDeleteLesson}>
              Xoá
            </Button>,
          ]}
        >
          <p>Bạn có chắc chắn muốn xoá bài học này không?</p>
        </Modal>
      )}
    </>
  );
};

export default ManagerLessonContent;
