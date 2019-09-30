import styled from 'styled-components';



export const StyledTextEditor: any = styled.div`
    background-color: ${props => props.theme.backgroundColorPrimary};
    background: ${props => {
        const { backgroundGradient, backgroundColorPrimary } = props.theme;
        if (backgroundGradient) {
            return backgroundGradient;
        } else {
            return backgroundColorPrimary;
        }
    }};
    color: ${props => props.theme.colorPrimary};

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
    z-index: 9999;
    box-shadow: 0px 2px 4px 0px hsla(220, 2%, 10%, 0.9);
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    > *:first-child {
        margin-left: 17px;
    }

    > *:last-child {
        margin-right: 17px;
    }
`;


export const StyledVerticalDivider = styled.div`
    background-color: ${props => props.theme.colorSecondary};
    width: 1px;
    height: 100%;
    user-select: none;
`;
