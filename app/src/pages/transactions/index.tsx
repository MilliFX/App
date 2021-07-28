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
import { TransectionHandlerResponse } from "@millifx/utils";
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { UUID_FIELD } from "../../utils/constants";

import { formatCurrency } from "../../utils/formatCurrency";

const Transactions = () => {
  const [data, setData] = useState<TransectionHandlerResponse>();

  const fetchTransectionData = async () => {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: "get",
        url: "http://localhost:3000/api/transections",
        headers: {
          "millifx-uuid": localStorage[UUID_FIELD],
        },
      };
      const res = await axios(axiosConfig);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransectionData();
  }, []);

  if (data && data.data !== null && !data.error) {
    return (
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
          {data.data.history.map((date, i) => (
            <DayRow data={date} key={i} />
          ))}
        </Col>
      </Row>
    );
  } else {
    return <div>show error component</div>;
  }
};

export default Transactions;
