import React from 'react';
import { Wrapper } from './ChartTop.style';
import { Daily } from '../../../utils/constants';


function ChartTop({props}:Daily) {

    // console.log(props);

    const formatDate = (input:string)=>{
       
        var date = new Date(input);
        return date.getDate() + ' '+[
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ][date.getMonth()] +' '+ date.getFullYear();
        
    }
    const dateNum = formatDate(props.date);

    return (
        <>
            <Wrapper>
                <p>{dateNum}</p>

                <p>Balance: {props.balance}</p>
                <p>Equity: {props.equity}</p>
                
                <p>Profit: {props.profit}</p>
            </Wrapper>
        </>
    )
}

export default ChartTop
