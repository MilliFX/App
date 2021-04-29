import {  Row, Col, Button } from "antd";
import "antd/dist/antd.css";
import {  palette, buttonTyping } from "../../utils/constants";
import { useState } from "react";


const ChartBottom = (props:any) => {
  const {onWeekSelected,onMonthSelected,onThreeMonthSelected}=props
   const selected={
    color:palette.buttonSelected,
    background:palette.buttonSelectedBgc
   }
   const unselected={
    color:palette.buttonUnselected,
    background:palette.buttonUnselectedBgc
   }
   const [buttonStyle,setButtonStyle]=useState(
    {
      oneWeekButton:selected,
      oneMonthButton:unselected,
      ThreeMonthButton:unselected
    }
   )
  return ( 
  <>
  <Row justify="center">
  <Col span={4}>
    <Button
      style={buttonStyle.oneWeekButton}
      type="text"
      onClick={()=>{onWeekSelected();
        setButtonStyle({
          oneWeekButton:selected,
          oneMonthButton:unselected,
          ThreeMonthButton:unselected
        })
      }}
    >
      {buttonTyping.oneWeek}
    </Button>
  </Col>
  <Col span={4}>
    <Button
      style={buttonStyle.oneMonthButton}
      type="text"
      onClick={()=>{onMonthSelected();
        setButtonStyle({
          oneWeekButton:unselected,
          oneMonthButton:selected,
          ThreeMonthButton:unselected
        })
      }}
    >
      {buttonTyping.oneMonth}
    </Button>
  </Col>
  <Col span={4}>
    <Button
      style={buttonStyle.ThreeMonthButton}
      type="text"
      onClick={()=>{onThreeMonthSelected();
        setButtonStyle({
          oneWeekButton:unselected,
          oneMonthButton:unselected,
          ThreeMonthButton:selected
        })
      }}
    >
      {buttonTyping.threeMonth}
    </Button>
  </Col>
</Row> 
</>);
}
export default ChartBottom;