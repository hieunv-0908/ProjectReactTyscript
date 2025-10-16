import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../components/home/Header"
import CourseTabs from "../components/home/CourseTabs";
import Footer from "../components/home/Footer";
import "../css/home/home.css";

const { Content } = Layout;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <Header onSearchChange={setSearchTerm} />
      <Content className="home-content">
        <CourseTabs searchTerm={searchTerm} />
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
