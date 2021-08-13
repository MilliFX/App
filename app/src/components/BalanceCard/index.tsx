import * as React from "react";
import { Row, Col } from "antd";
import {
  CustomCard,
  BalanceTitle,
  BalanceValue,
  PostiveOrNegative,
} from "./styles";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { displayCurrency, upOrDown } from "../../utils/displayCurrency";

const config = {
  cardBackGroundColor: "#FFFFFF",
  cardTitle: "Balance",
  positiveColor: "#02C39A",
  negativeColor: "#FCA311",
  secondaryTitle: "Daily Profit",
};

const data = {
  balanceIncrease: 10.45,
  profitIncrease: -2.32,
  balanceValue: 12346,
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
            <BalanceValue>{displayCurrency(data.balanceValue)}</BalanceValue>
          </Col>
          <Col span={8}>
            <Row>
              {data.balanceIncrease >= 0 ? (
                <CaretUpOutlined
                  style={{ fontSize: "16px", color: config.positiveColor }}
                />
              ) : (
                <CaretDownOutlined
                  style={{ fontSize: "16px", color: config.negativeColor }}
                />
              )}
              {
                <PostiveOrNegative value={data.balanceIncrease}>
                  {upOrDown(data.balanceIncrease)}
                </PostiveOrNegative>
              }
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
            {
              <PostiveOrNegative value={data.profitIncrease}>
                {upOrDown(data.profitIncrease)}
              </PostiveOrNegative>
            }
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

export default BalanceCard;
