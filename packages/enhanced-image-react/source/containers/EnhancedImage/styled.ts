import styled from 'styled-components';



export const StyledEnhancedImage = styled.div`
    box-sizing: border-box;
    color: ${props => props.theme.colorPrimary};
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Helvetica, Arial, sans-serif;
    position: relative;
    overflow: auto;

    img {
        display: block;
        user-select: none;
        pointer-events: all;
        width: 100%;
    }
`;
