import styled from 'styled-components';

export const Wrapper = styled.div`
    width:100%;
    height:100%;
`;
export const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    font-size: 3em;
    font-family: 'Original Surfer', cursive;
    font-style: italic;
    font-weight: bolder;
    color: rgb(191, 164, 164);
    text-shadow: rgb(215, 211, 199) 1px 0 10px;
    @media (max-width:500px){
        display: flex;
        justify-content: center;
        font-size: 2em;
        font-family: 'Original Surfer', cursive;
        font-style: italic;
        font-weight: bolder;
        color: rgb(191, 164, 164);
        text-shadow: rgb(215, 211, 199) 1px 0 10px;;
        margin-bottom: 2vh;
    }
`;
export const DateWrapper = styled.div`
    width: 100%;
    font-family: 'Original Surfer', cursive;
    font-size: 3em;
    display: flex;
    justify-content: center;
    @media (max-width:500px){
        width: 100%;
        font-family: 'Original Surfer', cursive;
        font-size: 1.3em;
        display: flex;
        justify-content: right;
    }
`;
export const DataWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
    @media (max-width:500px){
        width:100%;
        display:flex;
        justify-content: right;
        flex-wrap: wrap;
    }
`;
export const DataDetailWrapper = styled.div`
    width:30%;
    @media (max-width:500px){
        width:50%;
    }
`;
export const DataTitle = styled.div`
    font-size: 2em; 
    text-align: center;
    color: teal;
    @media (max-width:500px){
        font-size: 1em;
        text-align: left;
    }
`;
export const DataContent = styled.div`
    font-size: 1.5em;
    text-align: center;
    @media (max-width:500px){
        width:50%;
        font-size: 2em;
        text-align: left;
    }
`;
export const TableWrapper = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
`;
export const TableChart = styled.div`
    width:60%;
    @media (max-width:500px){
        width:90%;
    }
`;