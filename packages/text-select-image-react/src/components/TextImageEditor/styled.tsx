import styled from 'styled-components';



export const StyledTextImageEditor: any = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    background: ${props => {
        const { backgroundGradient, backgroundColor } = props.theme;
        if (backgroundGradient) {
            return backgroundGradient;
        } else {
            return backgroundColor;
        }
    }};
    color: ${props => props.theme.color};

    position: absolute;
    top: -34px;
    cursor: default;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    border-radius: 17px;
    height: 34px;
    margin-bottom: 300px;
    letter-spacing: 0;
    word-spacing: 0;
    font-weight: normal;
    font-style: normal;
    margin: 0;
    z-index: 9990;
    box-shadow: 0px 0px 5px 1px hsla(220, 2%, 10%, 0.9);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    > *:first-child {
        margin-left: 17px;
    }

    > *:last-child {
        margin-right: 17px;
    }
`;


export const StyledTextImageEditorVerticalDivider = styled.div`
    background-color: ${props => props.theme.colorSecondary};
    width: 1px;
    height: 100%;
    user-select: none;
`;
