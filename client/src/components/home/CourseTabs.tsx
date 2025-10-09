import React from "react";
import { Tabs, Row, Col } from "antd";
import CourseCard from "./CourseCard";

interface Course {
    title: string;
    sessions: string[];
}

const courses: Course[] = [
    { title: "HTML cơ bản", sessions: ["Tổng quan về HTML", "The Inline và Block", "Hình ảnh", "Thẻ chuyển trang", "The Semantic"] },
    { title: "CSS cơ bản", sessions: ["Tổng quan về CSS", "Nhúng CSS", "Position", "Flexbox", "Animation"] },
    { title: "JavaScript cơ bản", sessions: ["Tổng quan JS", "Biến", "Câu lệnh điều kiện", "Vòng lặp", "Mảng"] },
    { title: "Lập trình với React.js", sessions: ["Tổng quan", "Props, State, Event", "React hook", "UI Framework", "React Router"] },
    { title: "Lập trình với Java", sessions: ["Tổng quan Java", "Khai báo biến", "Câu lệnh điều kiện", "Vòng lặp", "Mảng"] },

    { title: "Lập trình C", sessions: [] },
];

const CourseTabs: React.FC = () => {
    const tabItems = [
        {
            key: "1",
            label: "Tất cả môn học",
            children: (
                <div className="container_items" style={{ display: 'flex', flexWrap: "wrap", gap: "8px", width: "1400px" }}>
                    {courses.map((course, i) => (
                        <div className="item" style={{ display: "flex", marginTop:"20px" }}>
                            <CourseCard {...course} />
                        </div>
                    ))
                    }
                </div >
            ),
        },
        { key: "2", label: "Đã hoàn thành", children: <div>Chưa có dữ liệu</div> },
        { key: "3", label: "Chưa hoàn thành", children: <div>Chưa có dữ liệu</div> },
    ];

    return <Tabs defaultActiveKey="1" items={tabItems} />;
};

export default CourseTabs;
