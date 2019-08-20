import styled from 'styled-components';



export const StyledTextSelectImage: any = styled.div`
    box-sizing: border-box;
    color: ${props => props.theme.color};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
    position: relative;
    height: 100%;
    overflow: ${(props: any) => {
        if (props.toggledEditable && props.imageWidth < 745) {
            return 'visible';
        }

        return 'hidden';
    }};

    img {
        display: block;
        user-select: none;
        pointer-events: all;
        width: 100%;
    }

    a {
        color: ${props => props.theme.color};
        text-decoration: none;
    }
`;


export const StyledImageContainer: any = styled.div`
    position: relative;
    overflow: auto;
    height: 100%;
`;
