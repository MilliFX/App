import { Statistic, Row, Col, Typography } from "antd";
import "antd/dist/antd.css";
const { Text } = Typography;
import { Daily } from "../../utils/constants";

const palette = {
  balance: "#EB5757",
  equity: "#2F80ED",
  profitPositive: "#F2994A",
  profitNegative: "#6FCF97",
};

interface chartTop {
  data: Daily;
}

const ChartTop = (props: chartTop) => {
  const { date, balance, profit, equity } = props.data;
  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <Text>{date}</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <Statistic title="Balance" value={balance} precision={2} prefix="$" />
        </Col>
        <Col span={12}>
          <Statistic title="Equity" value={equity} precision={2} prefix="$" />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <Statistic
            title="Profit"
            value={profit}
            precision={2}
            valueStyle={{
              color:
                profit > 0 ? palette.profitPositive : palette.profitNegative,
            }}
            suffix="%"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChartTop;
