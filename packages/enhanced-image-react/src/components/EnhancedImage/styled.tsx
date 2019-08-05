import styled from 'styled-components';



export const StyledEnhancedImage: any = styled.div`
    box-sizing: border-box;
    color: ${props => props.theme.colorPrimary};
    position: relative;
    font-family: 'Ubuntu', 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

    img {
        user-select: none;
        pointer-events: all;
        width: 100%;
    }

    a {
        color: ${props => props.theme.colorPrimary};
        text-decoration: none;
    }
`;
