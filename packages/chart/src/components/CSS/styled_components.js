import styled from 'styled-components';
import { Radio } from "antd";
import { Line } from "@ant-design/charts";

export const DateLegend = styled.h3`
    margin-bottom: 1.5em;
    color: grey;
`

export const Legend = styled.h3`
    color: grey;
`
export const LegendStyle = styled.div`
    display: inline-block;
    width: 50%;
`

export const ProfitStyle = styled.h2`
    color: orange;
`

export const RadioGroup = styled(Radio.Group)`
    display: flex;
    text-align: center;
`

export const RadioButton = styled(Radio.Button)`
    flex: 1;
`

export const ChartWrapper = styled(Line)`
    padding: 20px 10px;
`

export const Wrapper = styled.div`
    margin: 10px
`