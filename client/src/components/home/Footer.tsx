import React from "react";
import { FacebookOutlined, TwitterOutlined, YoutubeOutlined, TikTokOutlined } from "@ant-design/icons";

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer-section" style={{ display: "flex", flexDirection: "column", alignItems: "start", paddingTop: "13px" }}>
                <p>Chúng tôi cung cấp giải pháp học tập, giúp học sinh và sinh viên học tập tốt hơn và hiệu quả hơn.</p>
                <div className="social-icons" style={{ paddingTop: "80px" }}>
                    <TwitterOutlined />
                    <FacebookOutlined />
                    <TikTokOutlined />
                    <YoutubeOutlined />
                </div>
            </div>
            <div className="footer-section" style={{ marginRight: "40px" }}>
                <h4>Danh mục</h4>
                <p>Môn học</p>
                <p>Bài học</p>
                <p>Ghi chú</p>
            </div>
            <div className="footer-section">
                <h4>Hỗ trợ khách hàng</h4>
                <p>Tìm kiếm dịch vụ</p>
                <p>Điều khoản sử dụng</p>
                <p>Chính sách và điều khoản</p>
            </div>
        </div>
    );
};

export default Footer;
