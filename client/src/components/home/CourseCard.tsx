import React from "react";
import { Card } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface CourseCardProps {
    title: string;
    sessions: string[];
}

const CourseCard: React.FC<CourseCardProps> = ({ title, sessions }) => {
    return (
        <div className="course-card" style={{ width:"450px", display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column", paddingLeft: "24px", paddingTop: "20px", paddingBottom: "20px" }}>
            <span style={{ fontSize: "24px", fontWeight: "400", lineHeight: "32px", fontStyle: "Regular" }}>{title}</span>
            {sessions.length > 0 ? (
                <ul style={{ display: "flex", flexDirection: "column" }}>
                    {sessions.map((s, i) => (
                        <li key={i} style={{
                            fontWeight: "400",
                            fontStyle: "Regular",
                            lineHeight: "32px",
                            letterSpacing: "0%",
                            textAlign: "center",
                            color: "#000000",
                            display: "flex",
                            gap: "14px"
                        }}>
                            <CheckCircleOutlined style={{
                                fontSize: "18px",
                            }} /> Session {String(i + 1).padStart(2, "0")}: {s}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty">Chưa có bài học nào</p>
            )
            }
            {sessions.length > 0 && <a className="view-more" style={{ display: "flex", justifyContent: "center", marginTop: "15px", width: "100%" }}>Xem thêm</a>}
        </div >
    );
};

export default CourseCard;
