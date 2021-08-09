import * as React from "react";
import { Row, Col } from "antd";
import {
  CustomCard,
  BalanceTitle,
  BalanceValue,
  BalanceUpOrDown,
} from "./styles";
import "antd/dist/antd.css";
import { CaretUpOutlined } from "@ant-design/icons";

const BalanceCard = () => {
  return (
    <>
      <CustomCard
        style={{
          width: 320,
          height: 144,
          marginLeft: 20,
          marginTop: 18,
          backgroundColor: "#FFFFFF",
          border: 1,
        }}
      >
        <Row>
          <Col span={8}>
            <BalanceTitle>Balance</BalanceTitle>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <BalanceValue>$12346.00</BalanceValue>
          </Col>
          <Col span={8}>
            <Row>
              <CaretUpOutlined style={{ fontSize: "16px", color: "#02C39A" }} />
              <BalanceUpOrDown>+10.45%</BalanceUpOrDown>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <BalanceTitle>Daily Profit</BalanceTitle>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <BalanceUpOrDown>-2.32</BalanceUpOrDown>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

export default BalanceCard;
