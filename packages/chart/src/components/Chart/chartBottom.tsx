import {  Row, Col, Button } from "antd";
import "antd/dist/antd.css";


const ChartBottom = (props:any) => {

  const {onWeekSelected,onMonthSelected,onThreeMonthSelected}=props
 
  return ( 
  <>
  <Row justify="center">
  <Col span={4}>
    <Button
      type="text"
      onClick={onWeekSelected}
    >
      1W
    </Button>
  </Col>
  <Col span={4}>
    <Button
      type="text"
      onClick={onMonthSelected}
    >
      1M
    </Button>
  </Col>
  <Col span={4}>
    <Button
      type="text"
      onClick={onThreeMonthSelected}
    >
      3M
    </Button>
  </Col>
</Row> 
</>);
}
 
export default ChartBottom;