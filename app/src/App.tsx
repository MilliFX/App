import React from "react";
import ErrorBoundary from "@millifx/error-boundary";
import { Account } from "@millifx/utils";
import { Breadcrumb, Layout, Menu } from "antd";
import { InvitationForm } from "./components/InvitationForm";
const { Header, Footer, Sider, Content } = Layout;

const sampleAccount: Account = {
  id: 5875672,
  name: "MilliFX Master Account",
  gain: 545.1390111241,
  drawdown: 0.06,
  demo: false,
  change: 537.105380649,
};

const App = () => (
  <ErrorBoundary version={process.env.REACT_APP_COMMIT}>
    <AppWithRouter />
  </ErrorBoundary>
);

const AppWithRouter = () => {
  const { name, gain } = sampleAccount;

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <h2>{name}</h2>
          <p>Gain: {gain}</p>
          <InvitationForm />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
