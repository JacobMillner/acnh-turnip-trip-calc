import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Calculator from "./components/calculator/calculator";

function App() {
  const { Header, Footer, Content } = Layout;
  return (
    <div className="App">
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <div className="title">
            Animal Crossing New Horizon Turnip Trip Calculator
          </div>
        </Header>
        <Content
          className="background"
          style={{
            minHeight: "85vh",
            padding: 10,
          }}
        >
          <Calculator />
        </Content>
        <Footer>©Jacob Millner 2020</Footer>
      </Layout>
    </div>
  );
}

export default App;
