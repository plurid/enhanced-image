import styled from 'styled-components';



export const StyledTextImageEditorButtonIncrement = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;

    input {
        background: ${props => props.theme.backgroundColorSecondary};
        color: ${props => props.theme.colorPrimary};
        height: 20px;
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
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;


export const StyledTextImageEditorButtonIncrements: any = styled.div`
    background: ${props => props.theme.backgroundColorSecondary};

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    font-size: 6px;
    justify-items: center;
    justify-content: center;
    align-items: space-between;
    grid-row-gap: 2px;
    height: 20px;
    user-select: none;
`;


export const StyledTextImageEditorButtonIncrementButton = styled.div`
    color: ${props => props.theme.colorPrimary};
    background-color: ${props => props.theme.backgroundColorSecondary};

    width: 12px;
    height: 9px;
    cursor: pointer;
    text-align: center;
    display: grid;
    place-content: center;
    user-select: none;

    :hover {
        background-color: ${props => props.theme.backgroundColorSecondary};
    }
`;


export const StyledTextImageEditorButtonIncrementsUnit = styled.div`
    font-size: 12px;
    user-select: none;
`;