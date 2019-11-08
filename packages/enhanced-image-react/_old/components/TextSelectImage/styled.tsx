import styled from 'styled-components';



export const StyledTextSelectImage: any = styled.div`
    box-sizing: border-box;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;

    color: ${props => props.theme.color};
    height: ${(props: any) => {
        if (props.imageHeight <= props.elementHeight) {
            return props.imageHeight + 'px';
        }
        return '100%';
    }};
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
