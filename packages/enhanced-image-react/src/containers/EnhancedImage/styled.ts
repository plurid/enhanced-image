import styled from 'styled-components';



export const StyledEnhancedImage = styled.div`
    box-sizing: border-box;
    color: ${props => props.theme.colorPrimary};
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Helvetica, Arial, sans-serif;
    position: relative;

    img {
        display: block;
        user-select: none;
        pointer-events: all;
        width: 100%;
    }
`;


export const StyledImageContainer: any = styled.div`
    position: relative;
    overflow: auto;
    height: 100%;
`;
