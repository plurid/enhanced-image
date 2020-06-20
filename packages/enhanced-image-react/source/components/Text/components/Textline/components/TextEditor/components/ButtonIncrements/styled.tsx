import styled from 'styled-components';



export const StyledButtonIncrement: any = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;
    user-select: none;

    input {
        background: ${(props: any) => {
            if (props.transparentUI) {
                return props.theme.backgroundColorSecondaryAlpha;
            }
            return props.theme.backgroundColorSecondary;
        }};
        color: ${props => props.theme.colorPrimary};
        height: 18px;
        width: 30px;
        border: none;
        text-align: center;
        outline: none;
        padding: 3px;
        margin-right: 4px;
    }

    input:hover {
        background: ${(props: any) => {
            return props.theme.backgroundColorSecondary;
        }};
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
    }
`;


export const StyledButtonIncrementIcon: any = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;

    svg {
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;


export const StyledButtonIncrements: any = styled.div`
    background: ${(props: any) => {
        if (props.transparentUI) {
            return props.theme.backgroundColorSecondaryAlpha;
        }
        return props.theme.backgroundColorSecondary;
    }};

    display: flex;
    flex-direction: column;
    font-size: 6px;
    justify-items: center;
    justify-content: space-between;
    height: 24px;
    user-select: none;
`;


export const StyledButtonIncrementButton: any = styled.div`
    color: ${props => props.theme.colorPrimary};
    background: ${(props: any) => {
        if (props.transparentUI) {
            return props.theme.backgroundColorSecondaryAlpha;
        }
        return props.theme.backgroundColorSecondary;
    }};

    width: 12px;
    height: 9px;
    cursor: pointer;
    text-align: center;
    display: grid;
    place-content: center;
    user-select: none;

    :hover {
        background-color: ${props => props.theme.backgroundColorPrimary};
    }
`;


export const StyledButtonIncrementsUnit: any = styled.div`
    font-size: 12px;
    user-select: none;
`;
