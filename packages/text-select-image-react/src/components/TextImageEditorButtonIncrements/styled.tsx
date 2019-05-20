import styled from 'styled-components';



export const StyledTextImageEditorButtonIncrement = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;

    input {
        background: ${props => props.theme.backgroundColorHover};
        color: ${props => props.theme.color};
        width: 30px;
        border: none;
        text-align: center;
        outline: none;
        padding: 3px;
        margin-right: 4px;
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


export const StyledTextImageEditorButtonIncrementIcon = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;

    svg {
        fill: ${props => props.theme.color};
        height: 14px;
        width: 14px;
    }
`;


export const StyledTextImageEditorButtonIncrements: any = styled.div`
    background: ${props => props.theme.backgroundColorHover};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    font-size: 6px;
    justify-items: center;
    justify-content: center;
    align-items: center;
    grid-row-gap: 1px;
    height: 19px;
`;


export const StyledTextImageEditorButtonIncrementButton = styled.div`
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.backgroundColorSecondary};

    width: 12px;
    height: 9px;
    cursor: pointer;
    text-align: center;

    :hover {
        background-color: ${props => props.theme.backgroundColorHover};
    }
`;


export const StyledTextImageEditorButtonIncrementsUnit = styled.div`
    font-size: 12px;
`;
