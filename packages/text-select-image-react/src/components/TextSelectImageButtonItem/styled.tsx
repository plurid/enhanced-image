import styled from 'styled-components';



export const StyledTextSelectImageButtonItem = styled.div`
    display: flex;
    align-items: center;
    padding: 7px 10px;
    cursor: pointer;
    height: 32px;
`;

export const StyledTextSelectImageButtonItemIcon = styled.div`
    height: 14px;
    width: 14px;
    margin-right: 8px;
    display: grid;
    place-content: center;
    text-align: center;

    svg {
        width: 14px;
        height: 14px;
        fill: ${props => props.theme.colorPrimary};
    }
`;
