import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 300px;
`;

export const LegendTool = styled.div`
    width: 100%;
    font: Barlow;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:1% auto;
`;

export const LegendItem = styled.button`
    border:none;
    width: 100%;
    font-weight:400;
    color: ${props => props.color ? props.color  : "grey"};
    background: transparent;
    outline:none;
`;


export const Button = styled.div`
    width:100%;
    color:${props => props.color ? props.color  : "red"};
    background: ${props => props.background ? props.background : "white"};
    width: 86px;
    height: 32px;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;

`