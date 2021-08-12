import * as React from "react";
import { Row, Col } from "antd";
import {
  CustomCard,
  BalanceTitle,
  BalanceValue,
  PositiveValue,
  NegativeValue,
} from "./styles";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { displayCurrency, upOrDown } from "../../utils/displayCurrency";

const config = {
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
          backgroundColor: config.cardBackGroundColor,
          border: 1,
          borderRadius: 2,
        }}
      >
        <Row>
          <Col span={8}>
            <BalanceTitle>{config.cardTitle}</BalanceTitle>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <BalanceValue>{displayCurrency(config.balanceValue)}</BalanceValue>
          </Col>
          <Col span={8}>
            <Row>
              {config.balanceIncrease >= 0 ? (
                <CaretUpOutlined
                  style={{ fontSize: "16px", color: config.positiveColor }}
                />
              ) : (
                <CaretDownOutlined
                  style={{ fontSize: "16px", color: config.negativeColor }}
                />
              )}
              {config.balanceIncrease >= 0 ? (
                <PositiveValue>
                  {upOrDown(config.balanceIncrease)}
                </PositiveValue>
              ) : (
                <NegativeValue>
                  {upOrDown(config.balanceIncrease)}
                </NegativeValue>
              )}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <BalanceTitle>{config.secondaryTitle}</BalanceTitle>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            {config.profitIncrease >= 0 ? (
              <PositiveValue>{upOrDown(config.profitIncrease)}</PositiveValue>
            ) : (
              <NegativeValue>{upOrDown(config.profitIncrease)}</NegativeValue>
            )}
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

export default BalanceCard;
