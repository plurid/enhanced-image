import styled from 'styled-components';



export const StyledTextImageMore = styled.div`
    position: relative;
    margin: 0px 5px;
    user-select: none;
    display: grid;
    place-content: center;

    font-size: 14px;
    letter-spacing: 0px;
    word-spacing: 0px;
    line-height: 1;
    font-style: normal;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;

    svg {
        height: 16px;
        width: 16px;
    }
`;


export const StyledTextImageMoreButton = styled.div`
    background-color: hsla(220, 2%, 10%, 0.4);
    cursor: pointer;
    display: grid;
    place-content: center;
    border-radius: 25px;
    height: 25px;
    width: 25px;
`;
