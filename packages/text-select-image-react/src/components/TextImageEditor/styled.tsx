import styled from 'styled-components';



export const StyledTextImageEditor = styled.div`
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
    top: 0;
    cursor: default;
    font-size: 14px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 17px;
    height: 34px;
    /* width: 764px; */
    letter-spacing: 0;
    word-spacing: 0;
    font-weight: normal;
    font-style: normal;
    margin: 0;
    padding-left: 17px;
    z-index: 999;
    padding-right: 17px;
    box-shadow: 0px 0px 5px 1px hsla(220, 2%, 10%, 0.9);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;


export const StyledTextImageEditorVerticalDivider = styled.div`
    background-color: ${props => props.theme.colorSecondary};
    width: 1px;
    height: 100%;
`;
