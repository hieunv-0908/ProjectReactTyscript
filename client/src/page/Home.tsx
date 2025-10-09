import React from "react";
import { Layout } from "antd";
import Header from "../components/home/Header"
import CourseTabs from "../components/home/CourseTabs";
import Footer from "../components/home/Footer";
import "../css/home/home.css";

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content className="home-content">
        <CourseTabs />
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
