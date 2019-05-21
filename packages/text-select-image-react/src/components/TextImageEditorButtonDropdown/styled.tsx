import styled from 'styled-components';



export const StyledTextImageEditorButtonDropdown = styled.div`
    position: relative;
`;


export const StyledTextImageEditorButtonDropdownSelected = styled.div`
    input {
        width: 110px;
        border: none;
        background: ${props => props.theme.backgroundColorSecondary};
        color: ${props => props.theme.color};
        text-align: left;
        outline: none;
        padding: 3px 6px;
    }
`;


export const StyledTextImageEditorButtonDropdownList = styled.div`
    position: absolute;
    top: 19px;
    left: 0;
    right: 0;
    z-index: 9999;
    display: grid;
    align-content: flex-start;
    max-height: 100px;
    overflow-y: auto;
    overflow-x: hidden;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul li {
        cursor: pointer;
        padding: 4px 6px;
        font-size: 11px;
        background: ${props => props.theme.backgroundColorSecondary};
    }

    ul li:hover {
        background: ${props => props.theme.backgroundColor};
    }
`;
