import styled from 'styled-components';



export const StyledTextImageEditorButtonToggle = styled.div`
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;

    svg {
        fill: ${props => props.theme.color};
        height: 14px;
        width: 14px;
    }
`;
