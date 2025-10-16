import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

interface CourseCardProps {
    title: string;
    sessions: string[];
}

const CourseCard: React.FC<CourseCardProps> = ({ title, sessions }) => {
    return (
        <div
            className="course-card"
            style={{
                width: "420px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
        >
            <span
                style={{
                    fontSize: "22px",
                    fontWeight: "500",
                    marginBottom: "10px",
                    color: "#000000",
                }}
            >
                {title}
            </span>

            {sessions.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {sessions.map((s, i) => (
                        <li
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                lineHeight: "28px",
                                color: "#000000",
                            }}
                        >
                            <CheckCircleOutlined style={{ color: "#52c41a" }} />
                            <span>
                                Session {String(i + 1).padStart(2, "0")}: {s}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: "#888" }}>Chưa có bài học nào</p>
            )}

            {sessions.length > 0 && (
                <a
                    className="view-more"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "15px",
                        color: "#1677ff",
                    }}
                    href="#"
                >
                    Xem thêm
                </a>
            )}
        </div>
    );
};

export default CourseCard;
