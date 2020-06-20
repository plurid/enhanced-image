import styled from 'styled-components';



export const StyledTextEditor: any = styled.div`
    background-color: ${(props: any) => {
        if (props.transparentUI) {
            return props.theme.backgroundColorPrimaryAlpha;
        }

        return props.theme.backgroundColorPrimary;
    }};
    color: ${props => props.theme.colorPrimary};
    width: ${({
        imageBoxDimensions,
        fullWidth,
    }: any) => {
        if (fullWidth) {
            return (imageBoxDimensions.width - 20) + 'px';
        }

        return 'auto';
    }};
    overflow: ${({
        fullWidth,
    }: any) => {
        if (fullWidth) {
            return 'scroll';
        }

        return 'auto';
    }};

    position: absolute;
    top: -34px;
    cursor: default;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    border-radius: 17px;
    height: 34px;
    letter-spacing: 0;
    word-spacing: 0;
    font-weight: normal;
    font-style: normal;
    margin: 0;
    z-index: 9999;
    user-select: none;
    box-shadow: 0px 2px 4px 0px hsla(220, 2%, 10%, 0.9);
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        background: transparent;
    }
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

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


export const StyledOutside = styled.div`
    position: absolute;
    top: 0;
`;
