import * as React from "react";
import { Row, Col } from "antd";
import {
  CustomCard,
  BalanceTitle,
  BalanceValue,
  PositiveValue,
  NegativeValue,
} from "./styles";
import "antd/dist/antd.css";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { displayCurrency, upOrDown } from "../../utils/displayCurrency";

const balance = {
  cardBackGroundColor: "#FFFFFF",
  cardTitle: "Balance",
  balanceIncrease: 10.45,
  profitIncrease: -2.32,
  balanceValue: 12346,
  positiveColor: "#02C39A",
  negativeColor: "#FCA311",
  secondaryTitle: "Daily Profit",
};

const BalanceCard = () => {
  return (
    <>
      <CustomCard
        style={{
          width: 320,
          height: 138,
          marginLeft: 20,
          marginTop: 12,
          backgroundColor: balance.cardBackGroundColor,
          border: 1,
          borderRadius: 2,
        }}
      >
        <Row>
          <Col span={8}>
            <BalanceTitle>{balance.cardTitle}</BalanceTitle>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <BalanceValue>{displayCurrency(balance.balanceValue)}</BalanceValue>
          </Col>
          <Col span={8}>
            <Row>
              {balance.balanceIncrease >= 0 ? (
                <CaretUpOutlined
                  style={{ fontSize: "16px", color: balance.positiveColor }}
                />
              ) : (
                <CaretDownOutlined
                  style={{ fontSize: "16px", color: balance.negativeColor }}
                />
              )}
              {balance.balanceIncrease >= 0 ? (
                <PositiveValue>
                  {upOrDown(balance.balanceIncrease)}
                </PositiveValue>
              ) : (
                <NegativeValue>
                  {upOrDown(balance.balanceIncrease)}
                </NegativeValue>
              )}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <BalanceTitle>{balance.secondaryTitle}</BalanceTitle>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            {balance.profitIncrease >= 0 ? (
              <PositiveValue>{upOrDown(balance.profitIncrease)}</PositiveValue>
            ) : (
              <NegativeValue>{upOrDown(balance.profitIncrease)}</NegativeValue>
            )}
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

export default BalanceCard;
