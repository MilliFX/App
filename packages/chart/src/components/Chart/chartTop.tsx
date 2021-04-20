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


const ChartTop = (props:Daily) => {
    return (
        <div>
            <Row justify="center">
        <Col span={24}>
          <Text>{props.date}</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <Statistic
            title="Balance"
            value={props.balance}
            precision={2}
            prefix="$"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Equity"
            value={props.equity}
            precision={2}
            prefix="$"
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <Statistic
            title="Profit"
            value={props.profit}
            precision={2}
            valueStyle={{
              color:
              props.profit > 0
                  ? palette.profitPositive
                  : palette.profitNegative,
            }}
            suffix="%"
          />
        </Col>
      </Row>
        </div>
    );
};

export default ChartTop;