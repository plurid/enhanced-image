import styled from 'styled-components';



export const StyledEnhancedImageSettingsMenu: any = styled.div`
    box-sizing: border-box;
    opacity: ${(props: any) => {
        if (props.menuOpaque) {
            return 1;
        } else {
            return 0.75;
        }
    }};

    transition: opacity 600ms linear;
    z-index: 9999;

    /* height - 30px - 20px */
    height: ${(props: any) => {
        console.log(props.imageHeight);

        return props.imageHeight - 70 + 'px';
    }};
    overflow: auto;
    border-radius: 10px;
    margin-top: 10px;

    ul {
        background-color: ${props => props.theme.backgroundColor};
        background: ${props => {
            const { backgroundGradient, backgroundColor } = props.theme;
            if (backgroundGradient) {
                return backgroundGradient;
            } else {
                return backgroundColor;
            }
        }};

        box-shadow: 0px 0px 5px 1px hsla(220, 10%, 2%, 0.7);
        min-width: 130px;
        width: 150px;
        display: flex;
        flex-direction: column;
        list-style: none;
        user-select: none;
        border-radius: 10px;
        padding: 0;
        margin: 0;
        font-size: 13px;
        line-height: 1.1;
    }

    ul li {
        line-height: 1.1;
        min-height: 32px;
    }

    ul li:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    ul li:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    ul li:hover {
        background-color: ${props => props.theme.backgroundColorHover};
    }

    hr {
        border: none;
        border-top: 1px solid hsl(220, 2%, 55%);
        margin: 0;
    }
`;
