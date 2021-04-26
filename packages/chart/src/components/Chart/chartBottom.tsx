import {  Row, Col, Button } from "antd";
import "antd/dist/antd.css";

const ChartBottom = (props:any) => {

  const {weekData,monthData,threeMonthData}=props.handleClick
 
  return ( 
  <>
  <Row justify="center">
  <Col span={4}>
    <Button
      type="text"
      onClick={weekData}
    >
      1W
    </Button>
  </Col>
  <Col span={4}>
    <Button
      type="text"
      onClick={monthData}
    >
      1M
    </Button>
  </Col>
  <Col span={4}>
    <Button
      type="text"
      onClick={threeMonthData}
    >
      3M
    </Button>
  </Col>
</Row> 
</>);
}
 
export default ChartBottom;