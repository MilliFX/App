import * as React from "react";
import { Col, Row } from "antd";
import transectionData from "./data";
import DateRow from "./dateRow";

const Transactions = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <h1>Transections</h1>
          {transectionData.map((date, i) => (
            <DateRow data={date} key={i} />
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Transactions;
