import styled from 'styled-components';



export const StyledEnhancedImage = styled.div`
    box-sizing: border-box;
    color: ${props => props.theme.colorPrimary};
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Helvetica, Arial, sans-serif;
    position: relative;
    overflow: hidden;
    height: auto;
    width: auto;

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    ::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }

    img {
        display: block;
        user-select: none;
        pointer-events: all;
        width: 100%;
    }
`;
