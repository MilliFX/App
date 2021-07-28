import * as React from "react";
import { Col } from "antd";
import DayRow from "../../components/SingleDayRow";
import {
  StyleAntRow,
  StyleHeroWrapper,
  StyleHeroTitle,
  StyleHeroDataWrapper,
  StyleHeroDataTitle,
  StyleHeroDataFigure,
  DayRowWrapper,
} from "./styles";
import Skeleton from "@millifx/skeleton";
import * as Sentry from "@sentry/react";
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
        url: "/api/transections",
        headers: {
          "millifx-uuid": localStorage[UUID_FIELD],
        },
      };
      const res = await axios(axiosConfig);
      setData(res.data);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  useEffect(() => {
    fetchTransectionData();
  }, []);
  if (data == undefined) {
    return (
      <StyleAntRow>
        <Col span={24}>
          <StyleHeroWrapper>
            <StyleHeroTitle>Transections</StyleHeroTitle>
            <StyleHeroDataWrapper>
              <StyleHeroDataTitle>Daily Profit</StyleHeroDataTitle>
              <Skeleton active={true} loading={true} />
            </StyleHeroDataWrapper>
          </StyleHeroWrapper>
          <DayRowWrapper bgColor="#e5e5e5">
            <Skeleton active={true} loading={true} />
          </DayRowWrapper>
        </Col>
      </StyleAntRow>
    );
  } else if (data && data.data !== null && !data.error) {
    return (
      <StyleAntRow>
        <Col span={24}>
          <StyleHeroWrapper>
            <StyleHeroTitle>Transections</StyleHeroTitle>
            <StyleHeroDataWrapper>
              <StyleHeroDataTitle>Daily Profit</StyleHeroDataTitle>
              <StyleHeroDataFigure
                profit={data.data.history[0].transections[0].profit}
              >
                {formatCurrency(data.data.history[0].transections[0].profit)}
              </StyleHeroDataFigure>
            </StyleHeroDataWrapper>
          </StyleHeroWrapper>
          <DayRowWrapper bgColor="#ffffff">
            {data.data.history.map((date, i) => (
              <DayRow data={date} key={i} />
            ))}
          </DayRowWrapper>
        </Col>
      </StyleAntRow>
    );
  } else {
    return <div>show error component</div>;
  }
};

export default Transactions;
