import styled from 'styled-components';



export const StyledTextSelectImage = styled.div`
    box-sizing: border-box;
    color: ${props => props.theme.color};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
    position: relative;
    overflow: hidden;

    img {
        user-select: none;
        pointer-events: all;
        width: 100%;
    }

    a {
        color: ${props => props.theme.color};
        text-decoration: none;
    }
`;
