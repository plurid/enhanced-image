import styled from 'styled-components';



export const StyledTextImageEditorButtonInput = styled.div`
    position: relative;
    height: 100%;
    width: 32px;
    display: grid;

    svg {
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;


export const StyledTextImageEditorButtonInputContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${props => props.theme.backgroundColorSecondary};
    top: 34px;
    left: 0;

    input {
        width: 110px;
        border: none;
        background: ${props => props.theme.backgroundColorSecondary};
        color: ${props => props.theme.colorPrimary};
        text-align: left;
        outline: none;
        padding: 3px 6px;
        height: 26px;
    }
`;


export const StyledTextImageEditorButtonInputGotoLink = styled.div`
    height: 14px;
    width: 14px;
    padding-right: 20px;
    cursor: pointer;
    user-select: none;

    svg {
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;
