import * as React from "react";
import { Row } from "antd";
import transectionData from "./data";
import DayRow from "../../components/SingleDayRow";
import {
  StyleAntCol as Col,
  StyleHeroWrapper,
  StyleHeroTitle,
  StyleHeroDataWrapper,
  StyleHeroDataTitle,
  StyleHeroDataFigure,
} from "./styles";

import { formatCurrency } from "../../utils/formatCurrency";

const Transactions = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <StyleHeroWrapper>
            <StyleHeroTitle>Transections</StyleHeroTitle>
            <StyleHeroDataWrapper>
              <StyleHeroDataTitle>Daily Profit</StyleHeroDataTitle>
              <StyleHeroDataFigure profit={-155.56}>
                {formatCurrency(-155.56)}
              </StyleHeroDataFigure>
            </StyleHeroDataWrapper>
          </StyleHeroWrapper>
          {transectionData.map((date, i) => (
            <DayRow data={date} key={i} />
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Transactions;
